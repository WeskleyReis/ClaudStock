import {CloudUpload, Upload, Download, Info, Palette, Sun, Moon, RotateCw, Check } from "lucide-react"
import icon from "../../assets/icons/Icon.png"
import { NavBar } from "../../components/NavBar/NavBar"
import { useTheme } from "../../hooks/useTheme"
import React, { useRef } from "react"
import { exportCSV, importCSV } from "../../api/backups"


export function Configuration() {
  const { theme, setTheme } = useTheme()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleImport = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      await importCSV(file)

      e.target.value = ""

      alert ("Produtos importados com sucesso!")
    } catch {
      alert ("Erro ao importar aquivo.")
    }
  }

  const handleExport = async () => {
    try {
      const blob = await exportCSV()

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")

      a.href = url
      a.download = "produtos-claudstock.csv"

      a.click()

      window.URL.revokeObjectURL(url)
    } catch {
      alert("Erro ao exportar arquivo.")
    }
  }

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
            w-full 
            flex flex-col gap-6
          "
        >
          <div 
            className="
              p-6 bg-white dark:text-white dark:bg-neutral-800
              border border-neutral-400
              rounded-xl shadow-md
              flex flex-col gap-6
            "
          >
            <div className="flex items-center gap-6">
              <CloudUpload size={24} />
              <p className="text-3xl font-bold">
                Backup
              </p>
            </div>
            <p className="text-base">Faça Backup dos seus dados ou impora um arquivo de backup</p>
            <div className="w-full flex gap-12">
              <input
                ref={inputFileRef}
                type="file"
                accept=".csv"
                hidden
                onChange={handleImport}
              />
              <button 
                onClick={() => inputFileRef.current?.click()}
                className="
                  px-6 py-4 border-2 border-neutral-400 rounded-xl
                  flex-1 flex gap-6 items-center
                  cursor-pointer
                "
              >
                <Upload />
                <div className="flex flex-col items-start">
                  <p className="text-xl font-bold">Importar CSV</p>
                  <p className="text-base">Importe produtos de um arquivo</p>
                </div>
              </button>
              <button 
                onClick={handleExport}
                className="
                  px-6 py-4 border-2 border-neutral-400 rounded-xl
                  flex-1 flex gap-6 items-center
                  cursor-pointer
                "
              >
                <Download />
                <div className="flex flex-col items-start">
                  <p className="text-xl font-bold">Exportar CSV</p>
                  <p className="text-base">Exporte todos os produtos</p>
                </div>
              </button>
            </div>
            <div 
              className="
                p-4 bg-blue-500/15 border-2 border-blue-500/35 rounded-xl
                flex items-center gap-2
              "
            >
              <Info size={20} className="text-blue-500" />
              <p className="text-sm">
                <span className="font-bold">DICA: </span>
                Reconmedamos fazer backups regulares dos seus dados.
              </p>
            </div>
          </div>
          <div 
            className="
              p-6 bg-white dark:text-white dark:bg-neutral-800
              border border-neutral-400
              rounded-xl shadow-md
              flex flex-col gap-6
            "
          >
            <div className="flex items-center gap-6">
              <Palette size={24} />
              <p className="text-3xl font-bold">
                Aparencia
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-bold">Tema</p>
              <p className="text-base">Escolha o tema da interface do sistema</p>
            </div>
            <div className="w-full flex gap-12">
              <button
                onClick={() => setTheme("light")}
                className="
                  p-6 border-2 border-neutral-400 rounded-xl
                  dark:text-black dark:bg-white
                  flex-1 flex gap-6 items-center justify-between
                  cursor-pointer
                "
              >
                <div className="flex gap-4">
                  <Sun />
                  <p className="text-base font-bold">Claro</p>
                </div>
                <div 
                  className={
                    `
                      w-6 h-6 border rounded-full
                      ${theme === "light" ? "bg-black" : ""}
                    `
                  }
                />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className="
                  p-6 bg-neutral-800 text-white
                  border-2 border-neutral-400 rounded-xl
                  flex-1 flex gap-6 items-center justify-between
                  cursor-pointer
                "
              >
                <div className="flex gap-4">
                  <Moon />
                  <p className="text-base font-bold">Escuro</p>
                </div>
                <div 
                  className={
                    `
                      w-6 h-6 border rounded-full
                      ${theme === "dark" ? "bg-white" : ""}
                    `
                  }
                />
              </button>
            </div>
          </div>
          <div 
            className="
              p-6 bg-white dark:text-white dark:bg-neutral-800
              border border-neutral-400
              rounded-xl shadow-md
              flex flex-col gap-6
            "
          >
            <div className="flex items-center gap-6">
              <Info size={24} />
              <p className="text-3xl font-bold">
                Sobre o sistema
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img 
                src={icon} 
                alt="ClaudStock Icon"
                className="h-16"
              />
              <div>
                <p className="text-xl font-bold">ClaudStock</p>
                <p className="text-base">Sistema de gestão de estoques de cosméticos.</p>
              </div>
            </div>
            <div className="flex gap-24">
              <div className="flex flex-col gap-2">
                <p className="text-base font-bold">Versão</p>
                <p className="text-base">1.0.0</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-bold">Desenvolvido por</p>
                <p className="text-base">Weskley Reis</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-bold">Copyright</p>
                <p className="text-base">&copy; 2026 Todos os direitos reservados.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <button 
            onClick={() => setTheme("light")}
            className="
              px-8 py-4 text-2xl font-bold dark:text-white
              border-2 border-neutral-400 rounded-xl
              flex gap-4 items-center
              cursor-pointer
            "
          >
            <RotateCw />
            Restaurar Padrões
          </button>
          <button 
            className="
              px-8 py-4 text-2xl font-bold
              text-white bg-neutral-800 dark:text-black dark:bg-gray-100
              border-2 border-neutral-400 rounded-xl
              flex gap-4 items-center
              cursor-pointer
            "
          >
            <Check />
            Salvar Alterações
          </button>
        </div>
      </section>
    </main>
  )
}