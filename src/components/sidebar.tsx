"use client";
// Sidebar layout similar to Tinder
// Components: Sidebar, MatchesList, MessagesList

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Flame } from "lucide-react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

// MAIN SIDEBAR

export interface MatchUser {
  name: string;
  age: number;
  img: string;
}

export interface MessageUser {
  name: string;
  last: string;
  img: string;
}
//
export function Sidebar() {
  return (
    <div className="w-72 h-screen bg-[#0b0b0c] text-white flex flex-col p-4 border-r border-gray-800">
      {/* User Profile Section */}

      <UserButton />

      {/* Matches + Messages Components */}
      <MatchesList />
    </div>
  );
}

// MATCHES LIST
export function MatchesList() {
  return (
    <div className="flex flex-col gap-4 mt-2 overflow-y-auto h-full pr-2">
      <MatchCard name="Salima" age={22} img="/mine.svg" />
      <MatchCard name="Aarohi" age={21} img="/mine.svg" />
      <MatchCard name="Nadia" age={24} img="/mine.svg" />
    </div>
  );
}

// SINGLE MATCH CARD
export function MatchCard({ name, age, img }: MatchUser) {
  return (
    <Card className="bg-[#141417] p-3 flex items-center gap-3 rounded-xl cursor-pointer hover:bg-[#1c1c1f] transition">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <Image src={img} alt={name} width={48} height={48} />
      </div>
      <div className="text-white">
        <h4 className="font-medium text-sm">
          {name}, {age}
        </h4>
        <p className="text-xs text-gray-400">Recently active</p>
      </div>
      <Flame className="text-pink-500 ml-auto" size={20} />
    </Card>
  );
}

// MESSAGES LIST (Separate View)
export function MessagesList() {
  return (
    <div className="flex flex-col gap-4 mt-2 overflow-y-auto h-full pr-2">
      <MessageCard name="Salima" last="Hey, how are you?" img="/myimage.svg" />
      <MessageCard name="Aarohi" last="Let’s collaborate!" img="/myimage.svg" />
    </div>
  );
}

// SINGLE MESSAGE CARD
export function MessageCard({ name, last, img }: MessageUser) {
  return (
    <Card className="bg-[#141417] p-3 flex items-center gap-3 rounded-xl cursor-pointer hover:bg-[#1c1c1f] transition">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <Image src={img} alt={name} width={48} height={48} />
      </div>
      <div className="text-white">
        <h4 className="font-medium text-sm">{name}</h4>
        <p className="text-xs text-gray-400">{last}</p>
      </div>
      <MessageCircle className="text-blue-400 ml-auto" size={20} />
    </Card>
  );
}
