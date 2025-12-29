"use client"
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Navbar from "./navbar";
import MobileNavbar from "./mobile-navbar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 滚动超过 20px 就触发
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<header className={cn(
    "sticky top-0 z-50   transition-all duration-300 w-full",
    // 基础样式（未滚动）
    "py-6 bg-transparent border-b border-transparent",
    // 滚动后的样式
    isScrolled && "py-4 bg-white/80 backdrop-blur-md shadow-sm  border-b-slate-200/50 dark:bg-black/80"
)}>
  <section className="section-max-width-wrapper flex justify-between items-center" >
      <h1 className=" whitespace-nowrap font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">Landing Page</h1>
      <Navbar />
      <MobileNavbar /></section >
    </header>
  );
}
