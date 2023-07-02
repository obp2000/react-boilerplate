import { CldUploadWidget, CldImage } from "next-cloudinary"
// import Image from "next/image"
import { useCallback } from "react"
import { PhotoCamera } from '@mui/icons-material'
import { IconButton, CardMedia } from "@mui/material"
import type { UseFormSetValue, UseFormWatch } from "react-hook-form"
import type { SerializedProductObject } from "@/interfaces/products"

declare global {
  var cloudinary: any
}

const uploadPreset = "unsigned_preset"

type Props = {
  watch: UseFormWatch<SerializedProductObject>
  label: string
  setValue: UseFormSetValue<SerializedProductObject>
}

export default function ImageUpload({
  watch,
  label,
  setValue,
}: Props) {
  const [image] = watch(['image'])
  const handleUpload = useCallback(({
    info: {
      secure_url
    }
  }: {
    info: {
      secure_url: string
    }
  }) => {
    setValue('image', secure_url, { shouldDirty: true })
  }, [setValue])
  return <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset={uploadPreset}
    options={{
      maxFiles: 1
    }}
  >
    {({ open }) => <>
      {image
        ? <CldImage
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={image}
          alt={label}
          priority
        />
        : <CardMedia
          component="img"
          image='/blank.png'
          alt={label}
        />
      }
      <IconButton
        color="primary"
        aria-label={label}
        component="label"
        onClick={() => open?.()}>
        <PhotoCamera />
      </IconButton>
    </>}
  </CldUploadWidget>
}
