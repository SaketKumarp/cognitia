"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Settings, Search, Orbit } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        fixed top-4 left-1/2 -translate-x-1/2 
        w-[90%] max-w-4xl 
        z-50 
        rounded-2xl 
        bg-[#0F172A]/40 backdrop-blur-2xl
        border border-white/10 
        shadow-xl 
        flex items-center justify-between 
        px-6 py-3
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Orbit className="text-[#3AB4F2]" size={26} />
        <h1 className="text-white text-xl font-semibold tracking-wide">
          Innovators Hub
        </h1>
      </div>

      {/* SEARCH BAR */}
      <div className="flex-1 flex justify-center px-6">
        <div
          className="
            relative w-full max-w-md
            bg-white/10 backdrop-blur-lg
            border border-white/10
            rounded-full 
            px-4 py-2 
            flex items-center gap-3
            text-white
            shadow-inner
          "
        >
          <Search size={18} className="text-white/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search innovators, skills, domains..."
            className="
              bg-transparent outline-none border-none
              text-white placeholder-white/60
              w-full text-sm
            "
          />
        </div>
      </div>

      {/* RIGHT MENU */}
      <div className="flex items-center gap-6 text-white">
        {/* Notification Button */}
        <div className="relative cursor-pointer group">
          <Bell className="hover:text-[#A855F7] transition" size={22} />
          {/* Dot showing unread */}
          <span
            className="
            absolute -top-1 -right-1 
            w-2 h-2 
            rounded-full 
            bg-[#3AB4F2] 
            group-hover:bg-[#A855F7]
          "
          ></span>
        </div>

        {/* Settings */}
        <Settings
          className="cursor-pointer hover:text-green-400 transition"
          size={22}
        />

        {/* User */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </motion.div>
  );
}
