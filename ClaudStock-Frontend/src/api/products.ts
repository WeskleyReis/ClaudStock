import type { PaginatedResponse, Product } from "../types/products"
import api from "./axios"

export async function getProducts(
  page = 1,
  search = "",
  category = "",
): Promise<PaginatedResponse<Product>> {
  const response = await api.get("/products/", {
    params: {
      page,
      search,
      category__name: category,
    },
  })

  return response.data
}

