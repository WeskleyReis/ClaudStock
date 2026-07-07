import { NavItem } from "../NavItem/NavItem"
import { House, Package, Settings } from "lucide-react"

export function NavBar() {
  return (
    <nav 
      className="
        bg-neutral-800 text-white
        w-80 py-12
        flex flex-col gap-12 items-center
      "
    >
      <p className="text-3xl font-bold">ClaudStock</p>
      <div className="w-full flex flex-col gap-6">
        <NavItem
          to="/dashboard"
          icon={House}
          title="Página Inicial"
        />
        <NavItem
          to="/products"
          icon={Package}
          title="Protudos"
        />
        <NavItem
          to="/configuration"
          icon={Settings}
          title="Configurações"
        />
      </div>
    </nav>
  )
}