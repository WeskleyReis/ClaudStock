import type { LucideIcon } from "lucide-react"

interface SummaryCardProps {
  title: string
  value: number
  currency?: boolean
  icon: LucideIcon
  iconColor: string
}

export function SummaryCard({
  title,
  value,
  currency = false,
  icon: Icon,
  iconColor,
}: SummaryCardProps) {
  return (
    <div
      className="
        px-8 py-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-400 rounded-xl shadow-md
        flex flex-col gap-4 items-center
      "
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg p-2 shrink-0 bg-black">
          <Icon size={24} className={iconColor} />
        </div>
        <p className="text-2xl font-bold dark:text-white">{title}</p>
      </div>
      <p className="text-5xl font-bold dark:text-white">
        {currency
          ? Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          : value
        }
        </p>
    </div>
  )
}