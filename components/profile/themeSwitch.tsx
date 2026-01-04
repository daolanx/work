"use client"
import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder or nothing to avoid the mismatch
    // This must match exactly what the server would output
    return <button className="cursor-pointer"><div className="h-5 w-5" /></button>
  }

  return (
    <button className=" cursor-pointer " onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  )
}