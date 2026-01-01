"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Navbar from "./navbar";
import ToolBar from "./toolbar";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 py-6  transition-all duration-300 w-full",
        isScrolled && " bg-white/80 backdrop-blur-md shadow-sm"
      )}
    >
      <section className="section-max-width-wrapper flex  items-center  justify-between">
        <div className="flex">
          <h1 className=" whitespace-nowrap font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
            Midaland
          </h1>
          <Navbar />
        </div>
        <ToolBar  />
      </section>
    </header>
  );
}
