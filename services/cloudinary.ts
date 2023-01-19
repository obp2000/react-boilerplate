const cloudinary = require("cloudinary").v2
import type { UploadApiErrorResponse, UploadApiResponse } from "cloudinary"

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
