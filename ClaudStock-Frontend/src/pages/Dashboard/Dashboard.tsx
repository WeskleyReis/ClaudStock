import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import { SummaryCard } from "../../components/SummaryCard/SummaryCard";
import { getDashboard } from "../../api/dashboard";
import type { DashboardData } from "../../types/dashboard";
import { Folders, Package, ShoppingCart, Wallet, TriangleAlert, ChartPie } from "lucide-react";

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
    <main className="flex min-h-screen bg-gray-100 dark:bg-neutral-900">
      <NavBar />
      <section
        className="
          w-full p-12 
          flex flex-col gap-12
        "
      >
        <div className="flex flex-col gap-9">
          <p className="text-4xl font-bold dark:text-white">
            Dashboard
          </p>
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold text-black/75 dark:text-white/75">
              Bem-vindo(a), {dashboard?.username}!
            </p>
            <p className="text-base text-black/50 dark:text-white/50">
              Aqui está o resumo atualizado do seu estoque.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="w-full flex justify-evenly">
            <SummaryCard
              icon={Folders}
              iconColor="text-blue-500"
              title="Total de Produtos"
              value={dashboard?.total_products ?? 0}
            />
            <SummaryCard
              icon={Package}
              iconColor="text-red-500"
              title="Categorias"
              value={dashboard?.total_category ?? 0}
            />
            <SummaryCard
              icon={ShoppingCart}
              iconColor="text-yellow-500"
              title="Produtos em Estoque"
              value={dashboard?.stock_quantity ?? 0}
            />
            <SummaryCard
              icon={Wallet}
              iconColor="text-green-500"
              title="Valor em Estoque"
              value={dashboard?.stock_value ?? 0}
              currency
            />
          </div>
          <div className="w-full flex items-start gap-12">
            <div 
              className="
                p-6 w-full
                bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-400 rounded-xl shadow-md
                flex flex-col gap-12
              "
            >
              <div className="flex gap-6 items-center">
                <TriangleAlert size={48} className="text-amber-300" />
                <div className="flex flex-col gap-2">
                  <p className="text-4xl font-bold dark:text-white">
                    Produtos com estoque baixo
                  </p>
                  <p className="text-2xl dark:text-white">
                    Produtos que precisam de reposição
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                {dashboard?.low_stock.map((product) => (
                  <div
                    key={product.id}
                    className="
                      py-2 flex justify-between items-center
                      border-b-2 last:border-none border-neutral-400
                    "
                  >
                    <p className="text-base font-bold dark:text-white">{product.name}</p>
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-xl">
                      <p className="w-5 h-5 text-center text-base dark:text-white">{product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="
                p-6 w-full
                bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-400 rounded-xl shadow-md
                flex flex-col gap-12
              "
            >
              <div className="flex gap-6 items-center">
                <ChartPie size={48} className="text-blue-400" />
                <div className="flex flex-col gap-2">
                  <p className="text-4xl font-bold dark:text-white">
                    Resumo por categoria
                  </p>
                  <p className="text-2xl dark:text-white">
                    Distribuição dos produtos por categoria
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {dashboard?.categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center gap-4"
                  >
                    <p className="w-26 text-base font-bold dark:text-white">{category.name}</p>
                    <div className="flex-1">
                      <div className="w-full h-6 rounded">
                        <div
                          className="h-full bg-neutral-800 dark:bg-neutral-500 rounded"
                          style={{
                            width: `${(category.products / maxProducts) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-xl">
                      <p className="w-5 h-5 text-base text-center dark:text-white">{category.products}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}