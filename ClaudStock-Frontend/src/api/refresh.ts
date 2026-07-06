import axios from "axios";

interface RefreshResponse {
  access: string
}

export async function refreshToken() {
  const refresh = localStorage.getItem("refresh")

  if (!refresh) {
    throw new Error("Refresh token não encontrado")
  }

  return axios.post<RefreshResponse>(
    "http://127.0.0.1:8000/api/v1/token/refresh/",
    {
      refresh,
    }
  )
}