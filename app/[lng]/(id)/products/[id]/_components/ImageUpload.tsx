import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { PhotoCamera } from '@mui/icons-material'
import { IconButton } from "@mui/material"

import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form"
import type { SerializedProductObject } from "@/interfaces/products"

declare global {
  var cloudinary: any
}

const uploadPreset = "unsigned_preset"

type Props = {
  watch: UseFormWatch<SerializedProductObject>
  label: string
  setValue: UseFormSetValue<SerializedProductObject>
  register: UseFormRegister<SerializedProductObject>
  init: string
}

export default function ImageUpload({
  watch,
  label,
  setValue,
  register,
  init,
}: Props) {
  const [image] = watch(['image'])
  const handleUpload = useCallback(({ info }: {
    info: {
      secure_url: string
    }
  }) => {
    setValue('image', info.secure_url, { shouldDirty: true })
  }, [setValue])
  return <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset={uploadPreset}
    options={{ maxFiles: 1 }}
  >
    {({ open }) => {
      return <>
        <input hidden {...register('image')} defaultValue={init} />
        <Image
          src={image || '/blank.png'}
          fill
          priority
          alt={label}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <IconButton
          color="primary"
          aria-label={label}
          component="label"
          onClick={() => open()}>
          <PhotoCamera />
        </IconButton>
      </>
    }}
  </CldUploadWidget>
}
