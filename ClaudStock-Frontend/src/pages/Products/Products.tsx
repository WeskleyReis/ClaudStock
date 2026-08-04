import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import type { PaginatedResponse, Product } from "../../types/products";
import { getProducts } from "../../api/products";
import { Barcode, CirclePlus, Search } from "lucide-react";
import { ProductTable } from "./ProductTable";

export function Products() {
  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(null)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts(
        page,
        search,
        category,
      )

      setProducts(data)
    }

    loadProducts()
  }, [page, search, category])

  return (
    <main className="flex min-h-screen bg-gray-100 dark:bg-neutral-900">
      <NavBar />
      <section
        className="
          w-full p-12 
          flex flex-col items-end gap-6
        "
      >
        <div
          className="
            w-full p-6 bg-white
            rounded-xl border border-neutral-300 shadow-md
            flex flex-col gap-4
          "
        >
          <div
            className="
              flex gap-6
            "
          >
            <label
              className="
                px-6 h-16 rounded-xl
                border-2 border-neutral-400
                flex flex-1 gap-6 items-center
              "
            >
              <Search />
              <input
                type="text"
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full bg-transparent outline-none
                "
              />
            </label>
            <button
              className="
                px-5 h-16 rounded-xl
                border-2 border-neutral-400
              "
            >
              <Barcode />
            </button>
            <button
              className="
                px-6 h-16 bg-neutral-800 text-white
                flex gap-6 items-center
                rounded-xl border-2 border-neutral-400
              "
            >
              <CirclePlus />
              Novo Produto
            </button>
          </div>
          <div
            className="
              p-3 w-fit rounded-xl border-2 border-mauve-400
              flex gap-2 text-neutral-600
            "
          >
            <p>Tipos:</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="Perfume">Perfume</option>
              <option value="Maquiagem">Maquiagem</option>
            </select>
          </div>
        </div>

        <ProductTable
          products={products?.results ?? []}
        />
      </section>
    </main>
  )
}