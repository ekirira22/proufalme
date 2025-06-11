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
  })

  const album = watch('album');
  const author = watch('author');
  const albums  = useFetchAlbums();
  const authors = useFetchAuthors();

  //import upload Modal hook
  const onChange = (open: boolean) => { 
    if (!open) {
      //Reset the form
      reset();
      uploadModal.onClose();
    }
  }  

  
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
  
      const songFiles: File[] = Array.from(values.song);
      const imageFiles: File[] = Array.from(values.image);

      if (!songFiles?.length || !imageFiles?.length || !user || !values.album || !values.author) {
        toast.error("All fields are required.");
        return;
      }
  
      if (songFiles.length !== imageFiles.length) {
        toast.error("Each song must have a corresponding image.");
        return;
      }

      const albumId = await findOrCreate('albums', values.album.label);
      const authorId = await findOrCreate('authors', values.author.label);
  
      // Loop through files and upload
      for (let i = 0; i < songFiles.length; i++) {
        const songFile = songFiles[i];
        const imageFile = imageFiles[i];  
        const uniqueID = uniqid();

        const title = values.title
          ? `${values.title} ${i + 1}`
          : songFile.name.replace(/\.[^/.]+$/, "");

        const { data: songData, error: songError } = await supabaseClient.storage
          .from('songs')
          .upload(`song-${title}-${uniqueID}`, songFile, {
            cacheControl: '3600',
            upsert: false,
          });
  
        if (songError) {
          toast.error(`Song ${i + 1} failed`);
          continue;
        }
  
        const { data: imageData, error: imageError } = await supabaseClient.storage
          .from('images')
          .upload(`image-${title}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });
  

        if (imageError) {
          toast.error(`Image ${i + 1} failed`);
          continue;
        }
  
        const { error: insertError } = await supabaseClient.from('songs').insert({
          user_id: user.id,
          title,
          author: values.author.label,
          image_path: imageData.path,
          song_path: songData.path,
          album_id: albumId,
          author_id: authorId,
        });
  
        if (insertError) {
          toast.error(`Failed to save song ${title}`);
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
        description="Upload MP3 file"
        isOpen={uploadModal.isOpen}
        onChange={onChange}
    >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input id="title" disabled={isLoading} {...register('title', { required: true })} placeholder="Song Title" />

        <SelectCreate 
            id="author" 
            disabled={isLoading} 
            {...register('author', { required: true })}
            value={author}
            onChange={(newValue:Option | null) => {
              setValue('author', newValue);
            }}
            placeholder="Create / Select Author"
            listOptions={authors.authors as []}
          />

          <SelectCreate 
            id="album" 
            disabled={isLoading} 
            {...register('album', { required: true })}
            value={album}
            onChange={(newValue:Option | null) => {
              setValue('album', newValue);
            }}
            placeholder="Create / Select Album"
            listOptions={albums.albums as []}
          />
                    
          <div>
            <div className="pb-1">
              Select songs
            </div>
            <Input id="song" disabled={isLoading} accept=".mp3" {...register('song', { required: true })} type="file" multiple />
          </div>

          <div>
            <div className="pb-1">
              Select images
            </div>
            <Input id="image" disabled={isLoading} accept="image/*" {...register('image', { required: true })} type="file" multiple />
          </div>

          <Button disabled={isLoading} type="submit"> Add Songs </Button>

        </form>
    </Modal>
  )
}

export default UploadModal  