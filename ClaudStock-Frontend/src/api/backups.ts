import { api } from "./axios";

export async function exportCSV() {
  const response = await api.get("/products/export/", {
    responseType: "blob",
  })

  return response.data
}

export async function importCSV(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  return api.post("/products/import/", formData)
}