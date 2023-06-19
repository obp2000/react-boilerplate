import { CldUploadWidget, CldImage } from "next-cloudinary"
// import Image from "next/image"
import { useCallback } from "react"
import { PhotoCamera } from '@mui/icons-material'
import { IconButton, CardMedia } from "@mui/material"
import type { Translation } from "@/app/i18n/dictionaries"
import type { UseFormSetValue, UseFormWatch } from "react-hook-form"
import type { SerializedProductObject } from "@/interfaces/products"

declare global {
  var cloudinary: any
}

const uploadPreset = "unsigned_preset"

type Props = {
  watch: UseFormWatch<SerializedProductObject>
  labels: Translation['product']
  setValue: UseFormSetValue<SerializedProductObject>
}

export default function ImageUpload({
  watch,
  labels,
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
          height="200"
          width="200"
          src={image}
          alt={labels.image}
        />
        : <CardMedia
          component="img"
          height="200"
          width="200"
          image='/blank.png'
          alt={labels.image}
        />
      }
      <IconButton
        color="primary"
        aria-label={labels.image}
        component="label"
        onClick={() => open?.()}>
        <PhotoCamera />
      </IconButton>
    </>}
  </CldUploadWidget>
}
