"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button className=" cursor-pointer " onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  )
}