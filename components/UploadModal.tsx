"use client"
import React, { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import uniqid from "uniqid"
import { useRouter } from "next/navigation"

import useUploadModal from "@/hooks/useUploadModal"
import { useUser } from "@/hooks/useUser"
import useFetchAlbums from "@/hooks/useFetchAlbums"
import useFetchAuthors from "@/hooks/useFetchAuthors"

import Modal from "./Modal"
import Input from "./Input"
import Button from "./Button"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import SelectCreate, { Option } from "./SelectCreate"


const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      song: null,
      image: null,
    }
  });

  const album = watch('album');
  const author = watch('author');
  const albums = useFetchAlbums();
  const authors = useFetchAuthors();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const findOrCreate = async (table: 'albums' | 'authors', label: string) => {
    const { data: existing } = await supabaseClient
      .from(table)
      .select('*')
      .ilike('title', label)
      .maybeSingle();

    if (existing) return existing.id;

    const { data, error } = await supabaseClient
      .from(table)
      .insert({ user_id: user?.id, title: label })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data.id;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const songFiles: File[] = values.song ? Array.from(values.song) : [];
      const imageFile: File | null = values.image?.[0] || null;

      if (!songFiles.length || !user || !values.album || !values.author) {
        toast.error("Please select songs, an album, and an author.");
        return;
      }

      if (songFiles.length > 300) {
        toast.error("You can only upload up to 300 songs at once.");
        return;
      }

      const albumId = await findOrCreate('albums', values.album.label);
      const authorId = await findOrCreate('authors', values.author.label);

      let defaultImagePath = "default-cover.png";

      if (imageFile) {
        const uniqueID = uniqid();
        const { data: imageData, error: imageError } = await supabaseClient.storage
          .from('images')
          .upload(`image-default-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (imageError) {
          toast.error("Failed to upload image, using default.");
        } else {
          defaultImagePath = imageData.path; 
        }
      }

      for (let i = 0; i < songFiles.length; i++) {
        const songFile = songFiles[i];
        const title = songFile.name.replace(/\.[^/.]+$/, ""); // Strip extension
        const uniqueID = uniqid();

        const { data: songData, error: songError } = await supabaseClient.storage
          .from('songs')
          .upload(`song-${title}-${uniqueID}`, songFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (songError) {
          toast.error(`Failed to upload song: ${title}`);
          continue;
        }

        const { error: insertError } = await supabaseClient.from('songs').insert({
          user_id: user.id,
          title,
          author: values.author.label,
          image_path: defaultImagePath,
          song_path: songData.path,
          album_id: albumId,
          author_id: authorId,
        });

        if (insertError) {
          toast.error(`Failed to save song: ${title}`);
          continue;
        }

        toast.success(`Uploaded: ${title}`);
      }

      reset();
      uploadModal.onClose();
      router.refresh();

    } catch (err: any) {
      toast.error(err.message || "Upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add Songs"
      description="Upload MP3 files"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input id="title" disabled={isLoading} {...register('title')} placeholder="Optional title prefix" />

        <SelectCreate
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          value={author}
          onChange={(newValue: Option | null) => setValue('author', newValue)}
          placeholder="Create / Select Author"
          listOptions={authors.authors as []}
        />

        <SelectCreate
          id="album"
          disabled={isLoading}
          {...register('album', { required: true })}
          value={album}
          onChange={(newValue: Option | null) => setValue('album', newValue)}
          placeholder="Create / Select Album"
          listOptions={albums.albums as []}
        />

        <div>
          <div className="pb-1">Select songs</div>
          <Input id="song" disabled={isLoading} accept=".mp3" {...register('song', { required: true })} type="file" multiple />
        </div>

        <div>
          <div className="pb-1">Select image (Optional)</div>
          <Input id="image" disabled={isLoading} accept="image/*" {...register('image')} type="file" />
        </div>

        <Button disabled={isLoading} type="submit">Add Songs</Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
