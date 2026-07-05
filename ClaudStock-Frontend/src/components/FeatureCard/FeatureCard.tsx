import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard ({
  icon: Icon,
  title,
  description
}: FeatureCardProps) {
  return (
    <div className="flex gap-4 items-center">
      <div
        className="
          p-4 rounded-xl backdrop-blur-xl
        bg-white/15 border border-white/30
          shadow-[0_8px_24px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.18)]
        "
      >
        <Icon size={24} className="text-black shrink-0" />
      </div>
      <div>
        <p className="text-base font-bold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
}