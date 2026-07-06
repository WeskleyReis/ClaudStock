import { Navigate, Outlet } from "react-router-dom"

export function PrivateRoute() {
  const token = localStorage.getItem("access")

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}