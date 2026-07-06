import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/Dashboard";
import { PrivateRoute } from "../auth/PrivateRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}