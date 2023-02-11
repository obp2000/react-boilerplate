import type { NextApiRequest } from "next"
import { getExtension } from "mime"
import { join } from "path"
import * as dateFn from "date-fns"
import formidable from "formidable"
import { mkdir, stat } from "fs/promises"
import type { Fields, Files } from 'formidable'

export const FormidableError = formidable.errors.FormidableError

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: Fields, files: Files }> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
    )

    try {
      await stat(uploadDir)
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true })
      } else {
        console.error(e)
        reject(e)
        return
      }
    }

    const form = formidable({
      maxFiles: 2,
      maxFileSize: 1024 * 1024, // 1mb
      uploadDir,
      filename: (_name, _ext, { name = "unknown", mimetype = "" }) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const filename =
          `${name}-${uniqueSuffix}.${getExtension(String(mimetype)) || "unknown"}`
        return filename
      },
      filter: ({ name, mimetype }) => {
        return (
          name === "image" && (mimetype?.includes("image") || false)
        )
      },
    })

    form.parse(req, function (err, fields, files) {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}
