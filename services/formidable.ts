import { IncomingForm, type Fields, type Files } from "formidable"
import type { IncomingMessage } from "http"

export async function getData(formData: IncomingMessage) {
  const data: { fields: Fields, files: Files } =
    await new Promise(function (resolve, reject) {
      const form = new IncomingForm({ keepExtensions: true })
      form.parse(formData, function (err, fields, files) {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })
  return data
}
