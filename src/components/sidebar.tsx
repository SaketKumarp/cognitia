"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Flame, MessageCircle, Menu } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { MatchCard } from "./match-card";

// ---- PERSON TYPE ----
export interface Person {
  id: string;
  name: string;
  age: number;
  bio: string;
  img: string;
}

// ---- MOCK DATA ----
const mockUsers: Person[] = [
  {
    id: "1",
    name: "Stacy",
    age: 19,
    bio: "Loves travel, coffee, sunsets 🌅",
    img: "/mine.svg",
  },
  {
    id: "2",
    name: "Aarohi",
    age: 21,
    bio: "Fashion • Yoga • Music",
    img: "/mine.svg",
  },
  {
    id: "3",
    name: "Nadia",
    age: 24,
    bio: "Tech + Photography 📸",
    img: "/mine.svg",
  },
];

export default function Sidebar({
  onSelect,
}: {
  onSelect: (u: Person, msgs: any[]) => void;
}) {
  const [open, setOpen] = useState(true);

  // 🔥 Store user → chat messages
  const [chatHistory, setChatHistory] = useState<Record<string, any[]>>({});

  // 🔥 Currently selected chat in sidebar
  const [activeChat, setActiveChat] = useState<Person | null>(null);

  // Add message to chat history
  const addMessage = (userId: string, message: any) => {
    setChatHistory((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), message],
    }));
  };

  const openChat = (user: Person) => {
    setActiveChat(user);

    // If chat doesn't exist → create with starter messages
    if (!chatHistory[user.id]) {
      setChatHistory((prev) => ({
        ...prev,
        [user.id]: [
          { from: "them", text: "Hey! 👋" },
          { from: "them", text: "How's your day going?" },
        ],
      }));
    }

    // Send selected user + chat history upward
    onSelect(user, chatHistory[user.id] || []);
  };

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="h-screen bg-[#0b0b0c] text-white border-r border-gray-800"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {open && <UserButton />}

        <CollapsibleTrigger className="p-2 bg-[#1d1d1d] rounded-lg hover:bg-[#2b2b2b] transition">
          <Menu size={22} />
        </CollapsibleTrigger>
      </div>

      {/* SIDEBAR CONTENT */}
      <CollapsibleContent>
        {/* PEOPLE LIST */}
        <div className="p-4 font-semibold text-lg">People</div>

        <div className="flex flex-col gap-3 px-4">
          {mockUsers.map((u) => (
            <MatchCard key={u.id} user={u} onClick={() => openChat(u)} />
          ))}
        </div>

        {/* CHAT PREVIEW SECTION */}
        {activeChat && (
          <div className="mt-6 border-t border-gray-800">
            <div className="p-4 text-sm text-gray-300 font-semibold">Chats</div>

            <ChatPreviewCard
              user={activeChat}
              lastMessage={
                chatHistory[activeChat.id]?.slice(-1)[0]?.text ||
                "Tap to continue chat"
              }
              onClick={() => openChat(activeChat)}
            />
          </div>
        )}
      </CollapsibleContent>

      {/* COLLAPSED ICONS */}
      {!open && (
        <div className="flex flex-col items-center gap-6 py-6">
          <Flame size={22} className="text-pink-500" />
          <MessageCircle size={22} className="text-blue-400" />
        </div>
      )}
    </Collapsible>
  );
}

/* ---------------- CHAT PREVIEW CARD ---------------- */
function ChatPreviewCard({
  user,
  lastMessage,
  onClick,
}: {
  user: Person;
  lastMessage: string;
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="bg-[#141417] p-3 flex items-center gap-3 rounded-xl cursor-pointer hover:bg-[#1c1c1f] transition mx-4 mt-2"
    >
      <Image src="/mine.svg" width={40} height={40} alt={user.name} />

      <div className="flex-1">
        <p className="font-medium text-sm">{user.name}</p>
        <p className="text-xs text-gray-400 truncate">{lastMessage}</p>
      </div>

      <MessageCircle size={18} className="text-blue-400" />
    </Card>
  );
}
