import { useEffect, useState } from "react"

type Theme = "light" | "dark"

export function useTheme() {
  const [ theme, setTheme ] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "dark"
  })

  useEffect(() => {
    const html = document.documentElement

    if (theme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}