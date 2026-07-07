import type { LucideIcon } from "lucide-react"
import { NavLink } from "react-router-dom"

interface NavItemProps {
  to: string
  icon: LucideIcon
  title: string
}

export function NavItem({
  to,
  icon: Icon,
  title
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
      `
        w-full py-4 px-6 cursor-pointer
        ${ isActive ? "bg-neutral-900": ""}
      `
      }
    >
      <div className="flex gap-6 items-center">
        <Icon size={24} />
        <div className="bg-white w-px h-12" />
        <p className="text-base font-bold">{title}</p>
      </div>
    </NavLink>
  )
}