export interface DashboardData {
  total_products: number
  total_category: number
  stock_quantity: number
  stock_value: number

  low_stock: {
    id: number
    name: string
    quantity: number
  }[]

  categories: {
    name: string
    products: number
  }[]
}