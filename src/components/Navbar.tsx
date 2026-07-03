"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Series", href: "/series" },
  { label: "Movies", href: "/movies" },
  { label: "Anime", href: "/category/anime" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              NontonHeula
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}
