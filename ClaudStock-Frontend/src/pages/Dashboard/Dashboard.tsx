import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import { SummaryCard } from "../../components/SummaryCard/SummaryCard";
import { getDashboard } from "../../api/dashboard";
import type { DashboardData } from "../../types/dashboard";

export function Dashboard() {
  const [ dashboard, setDashboard ] = useState<DashboardData | null>(null)
  const maxProducts = Math.max(...(dashboard?.categories.map((category) => category.products) ?? [1]))

  useEffect(() => {
    async function loadDashboard() {
      const data = await getDashboard()
      setDashboard(data)
    }

    loadDashboard()
  }, [])

  return (
    <main className="flex min-h-screen bg-gray-100">
      <NavBar />
      <section
        className="
          w-full p-12 
          flex flex-col justify-center items-center gap-12
        "
      >
        <div className="w-full grid grid-cols-4 gap-12">
          <SummaryCard
            title="Total de Produtos"
            value={dashboard?.total_products ?? 0}
          />
          <SummaryCard
            title="Categorias"
            value={dashboard?.total_category ?? 0}
          />
          <SummaryCard
            title="Produtos em Estoque"
            value={dashboard?.stock_quantity ?? 0}
          />
          <SummaryCard
            title="Valor em Estoque"
            value={dashboard?.stock_value ?? 0}
            currency
          />
        </div>
        <div className="w-full flex items-start gap-12">
          <div 
            className="
              p-6 w-full
              bg-white border border-neutral-400 rounded-xl shadow-md
              flex flex-col gap-12
            "
          >
            <p className="text-4xl font-bold text-center">Produtos com estoque baixo</p>
            <div className="flex flex-col gap-4">
              {dashboard?.low_stock.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between"
                >
                  <p className="text-2xl">{product.name}</p>
                  <p className="text-2xl">{product.quantity}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="
              p-6 w-full
              bg-white border border-neutral-400 rounded-xl shadow-md
              flex flex-col gap-12
            "
          >
            <p className="text-4xl font-bold text-center">Resumo por categoria</p>
            <div className="flex flex-col gap-4">
              {dashboard?.categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center gap-6"
                >
                  <p className="w-36 text-2xl">{category.name}</p>
                  <div className="flex-1">
                    <div className="w-full h-8 rounded">
                      <div
                        className="h-full bg-neutral-800 rounded"
                        style={{
                          width: `${(category.products / maxProducts) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-2xl">{category.products}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}