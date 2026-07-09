import { api } from "./axios";
import type { DashboardData } from "../types/dashboard";

export async function getDashboard() {
  const response = await api.get<DashboardData>("/products/dashboard/")
  return response.data
}