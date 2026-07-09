interface SummaryCardProps {
  title: string
  value: number | string
  currency?: boolean
}

export function SummaryCard({
  title,
  value,
  currency,
}: SummaryCardProps) {
  return (
    <div
      className="
        p-6 bg-white border border-neutral-400 rounded-xl shadow-md
        flex flex-col gap-4 items-center
      "
    >
      <p className="text-2xl font-bold">{title}</p>
      <p className="text-5xl">
        {currency
          ? value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
          : value
        }
        </p>
    </div>
  )
}