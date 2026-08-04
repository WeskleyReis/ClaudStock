import { Pencil, Trash } from "lucide-react";
import type { Product } from "../../types/products";

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <div
      className="
        overflow-hidden w-full
        bg-white rounded-xl border border-neutral-300 shadow-md
      "
    >
      <table className="w-full">
        <thead className="bg-neutral-100">
          <tr className="text-sm font-semibold text-neutral-700">
            <th className="px-6 py-4 text-left">Imagem</th>
            <th className="px-6 py-4 text-left">Produto</th>
            <th className="px-6 py-4 text-left">Categoria</th>
            <th className="px-6 py-4 text-center">Quantidade</th>
            <th className="px-6 py-4 text-right">Preço</th>
            <th className="px-6 py-4 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-neutral-500"
              >
                Nenhum produto encontrado.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="
                  border-t border-neutral-200
                  hover:bg-neutral-50
                  transition-colors
                "
              >
                <td className="px-6 py-4">
                  <div className="w-14 h-14 rounded-lg bg-neutral-100" />
                </td>

                <td className="px-6 py-4">{product.name}</td>

                <td className="px-6 py-4">{product.category}</td>

                <td className="px-6 py-4 text-center">
                  {product.quantity}
                </td>

                <td className="px-6 py-4 text-right">
                  {Number(product.price).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    }
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-4 justify-center">
                    <button
                      className="
                        w-12 h-12
                        border-2 border-neutral-300 rounded-xl
                        flex items-center justify-center
                        hover:bg-neutral-100
                        transition-colors
                        cursor-pointer
                      "
                    >
                      <Pencil className="text-blue-500" size={20} />
                    </button>
                    <button
                      className="
                        w-12 h-12
                        border-2 border-neutral-300 rounded-xl
                        flex items-center justify-center
                        hover:bg-red-50
                        transition-colors
                        cursor-pointer
                      "
                    >
                      <Trash className="text-red-500" size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}