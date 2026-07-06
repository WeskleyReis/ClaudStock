import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";
import { refreshToken } from "./refresh";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  
  async (error: AxiosError) => {

    const originalRequest = error.config as CustomAxiosRequestConfig
    const isLoginRequest = originalRequest.url === "/token/"

    if (
      error.response?.status === 401 &&
      !isLoginRequest &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true

      try {
        const { data: {access} } = await refreshToken()

        localStorage.setItem("access", access)

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${access}`

        return api(originalRequest)

      } catch {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        window.location.replace("/")
      }

    }
    
    return Promise.reject(error)
  }
)

export default api