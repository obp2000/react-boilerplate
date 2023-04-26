import { CldUploadWidget, CldImage } from "next-cloudinary"
// import Image from "next/image"
import { useCallback } from "react"
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import IconButton from "@mui/material/IconButton"
import CardMedia from "@mui/material/CardMedia"

declare global {
  var cloudinary: any
}

const uploadPreset = "unsigned_preset"

type Props = {
  onChange: (value: string) => void
  value: string
  label: string
}

export default function ImageUpload({ onChange, value, label }: Props) {
  const handleUpload = useCallback((result: { info: { secure_url: string } }) => {
    onChange(result.info.secure_url)
  }, [onChange])
  return <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset={uploadPreset}
    options={{
      maxFiles: 1
    }}
  >
    {({ open }) => <>
      {value
        ? <CldImage
          height="200"
          width="200"
          src={value}
          alt={label}
        />
        : <CardMedia
          component="img"
          height="200"
          width="200"
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
