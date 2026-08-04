export interface Product {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  barcode: string
  photo: string | null
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ProductForm {
  name: string
  category: string
  price: number
  quantity: number
  barcode: string
  photo?: File | null
}