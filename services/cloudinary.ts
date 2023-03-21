const cloudinary = require("cloudinary").v2
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary"
import type { File } from "formidable"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export function uploadImage(imageUploaded: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUploaded,
      { width: 400, height: 300, crop: "fill" },
      (err: UploadApiErrorResponse, res: UploadApiResponse) => {
        if (err) reject(err)
        resolve(res)
      }
    )
  })
}

export async function upload(image: File | File[]) {
  const { version, public_id, format } =
    await uploadImage((image as File).filepath as string) as
    { version: number, public_id: string, format: string }
  return `${version}/${public_id}.${format}`
}
