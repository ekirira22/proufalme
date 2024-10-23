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

  //import upload Modal hook
  const onChange = (open: boolean) => { 
    if (!open) {
      //Reset the form
      reset();
      uploadModal.onClose();
    }
  }

  //import fetchAlbums and fetchAuthors hooks
  const albums  = useFetchAlbums();
  const authors = useFetchAuthors();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    //Upload to supabase buckets
    try {
      setIsLoading(true)
      //Extract image and song file
      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      // Check if anything is missing
      // console.log(imageFile, songFile, user, values.album, albums, authors)

      if (!imageFile || !songFile || !user || !values.album) {
        setIsLoading(false)
        toast.error("Missing fields")
        return
      }

      const uniqueID = uniqid();

      //Upload Song to storage
      const { data:songData, error:songError } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, { cacheControl: '3600', upsert: false })

      if (songError) {
        setIsLoading(false)
        return toast.error('Failed song upload')
      }

      //Upload Image to storage
      const { data:imageData, error:imageError } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, { cacheControl: '3600', upsert: false })

      if (imageError) {
        setIsLoading(false)
        return toast.error('Failed image upload')
      }

      //Check if album exists in supabase, if not, create it with values.album.value as the album.id in supabase
      const { data:albumData, error:albumError } = await supabaseClient
        .from('albums')
        .select('id')
        .eq('id', values.album.id)
        .single();

      let newAlbum;

      if (!albumData) {
        const { data:newAlbumData, error:newAlbumError } = await supabaseClient
          .from('albums')
          .insert({ user_id: user.id, title: values.album.label })
          .select()
          .single();

        if (newAlbumError) {
          setIsLoading(false)
          return toast.error(newAlbumError.message)
        }
        newAlbum = newAlbumData;
      }

      //Check if author exists in supabase, if not, create it with values.author.value as the author.id in supabase
      const { data:authorData, error:authorError } = await supabaseClient
        .from('authors')
        .select('id')
        .eq('id', values.author.id)
        .single();

      let newAuthor;

      if (!authorData) {
        const { data:newAuthorData, error:newAuthorError } = await supabaseClient
          .from('authors')
          .insert({ user_id: user.id, title: values.author.label })
          .select()
          .single();

        if (newAuthorError) {
          setIsLoading(false)
          return toast.error(newAuthorError.message)
        }
        newAuthor = newAuthorData;
      }

      //Now we have to register this in the sql database
      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({ 
          user_id: user.id, 
          title: values.title, 
          author: values.author.label,
          image_path: imageData.path,
          song_path: songData.path,
          album_id: albumData?.id || newAlbum?.id,
          author_id: authorData?.id || newAuthor?.id,
        })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }

      //If everything went correctly
      router.refresh();
      setIsLoading(false);
      toast.success('Song added!');
      reset();
      uploadModal.onClose();

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      window.location.reload();
      setIsLoading(false);
    }
  }

  return (
    <Modal
        title="Add a Song"
        description="Upload an MP3 file"
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
              Select a song file
            </div>
            <Input id="song" disabled={isLoading} accept=".mp3" {...register('song', { required: true })} type="file" />
          </div>

          <div>
            <div className="pb-1">
              Select an image
            </div>
            <Input id="image" disabled={isLoading} accept="image/*" {...register('image', { required: true })} type="file" />
          </div>

          <Button disabled={isLoading} type="submit"> Add Song </Button>

        </form>
    </Modal>
  )
}

export default UploadModal  