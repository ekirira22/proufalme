"use client"
import { FieldValues, useForm } from "react-hook-form"

import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"

const UploadModal = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    }
  })

  //import upload Modal hook
  const uploadModal = useUploadModal();
  const onChange = (open: boolean) => {
    if (!open) {
      //Reset the form
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit = () => {
    //Upload to supabase buckets
  }

  return (
    <Modal
        title="Add a Song"
        description="Upload an MP3 file"
        isOpen={uploadModal.isOpen}
        onChange={onChange}
    >
        <form>
          
        </form>
    </Modal>
  )
}

export default UploadModal  