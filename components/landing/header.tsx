"use client"


import Navbar from "./navbar";
import MobileNavbar from "./mobile-navbar";

export default function Header() {
  return (
    <header className="section-container flex justify-between py-6 items-center border-2">
      <h1 className=" whitespace-nowrap font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">Landing Page</h1>
      <Navbar />
      <MobileNavbar />
    </header>
  );
}
