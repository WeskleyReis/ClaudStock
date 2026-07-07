import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login"
import { Dashboard } from "../pages/Dashboard";
import { Products } from "../pages/Products";
import { Configuration } from "../pages/Configuration";
import { PrivateRoute } from "../auth/PrivateRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/configuration" element={<Configuration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}