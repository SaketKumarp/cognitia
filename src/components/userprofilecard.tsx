"use client";

import Image from "next/image";
import { Heart, X, Star, ArrowUpRight } from "lucide-react";
import { Person } from "./sidebar";

export default function UserProfileCard({ user }: { user: Person }) {
  return (
    <div className="relative w-[380px] h-[600px] rounded-3xl overflow-hidden shadow-xl bg-[#111]">
      {/* IMAGE */}
      <Image src={user.img} alt={user.name} fill className="object-cover" />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* USER INFO */}
      <div className="absolute bottom-6 left-6 text-white">
        <h2 className="text-3xl font-bold">
          {user.name}, {user.age}
        </h2>
        <p className="text-sm text-gray-300">{user.bio}</p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="absolute bottom-4 w-full flex justify-center gap-4">
        <ActionButton icon={<X size={28} />} />
        <ActionButton icon={<Star size={28} />} />
        <ActionButton icon={<Heart size={28} />} />
        <ActionButton icon={<ArrowUpRight size={28} />} />
      </div>
    </div>
  );
}

function ActionButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
      {icon}
    </button>
  );
}
