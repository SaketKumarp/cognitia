import Image from "next/image";
import { Star } from "lucide-react";
import { Person } from "./sidebar";
import { Card } from "./ui/card";

export const MatchCard = ({
  user,
  onClick,
}: {
  user: Person;
  onClick: () => void;
}) => {
  return (
    <Card
      onClick={onClick}
      className="
        relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl cursor-pointer
        bg-[#141417]/70 backdrop-blur-xl border border-white/10
        transition-all duration-300 hover:-translate-y-1 hover:bg-[#1b1b1f]/80
        shadow-lg hover:shadow-2xl hover:shadow-pink-500/10
      "
    >
      {/* Glow Ring Around Avatar */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 blur-md opacity-40"></div>

        <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20">
          <Image
            src="/placeholder/1.svg"
            alt={user.name}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
      </div>

      {/* Name + Bio */}
      <div className="flex flex-col">
        <h4 className="font-semibold text-base tracking-wide">
          {user.name}, {user.age}
        </h4>
        <p className="text-xs text-gray-400 line-clamp-1">{user.bio}</p>
      </div>

      {/* Gold premium star */}
      <Star
        size={22}
        className="text-yellow-400 ml-auto drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]"
      />
    </Card>
  );
};
