"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Flame, MessageCircle, Menu, Send } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { MatchCard } from "./match-card";

/* ---------------- PERSON TYPE ---------------- */
export interface Person {
  id: string;
  name: string;
  age: number;
  bio: string;
  img: string;
}

/* ---------------- MOCK DATA ---------------- */
const mockUsers: Person[] = [
  { id: "1", name: "Stacy", age: 19, bio: "Travel + coffee", img: "/mine.svg" },
  { id: "2", name: "Aarohi", age: 21, bio: "Fashion + Yoga", img: "/mine.svg" },
  {
    id: "3",
    name: "Nadia",
    age: 24,
    bio: "Tech + Photography",
    img: "/mine.svg",
  },
];

export default function Sidebar({
  onSelect,
}: {
  onSelect?: (u: Person, msgs: any[]) => void;
}) {
  const [open, setOpen] = useState(true);

  const [activeChat, setActiveChat] = useState<Person | null>(null);

  // message history, grouped by user
  const [chatHistory, setChatHistory] = useState<Record<string, any[]>>({});

  const [input, setInput] = useState("");

  /* ---------------- OPEN CHAT ---------------- */
  const openChat = (user: Person) => {
    setActiveChat(user);

    if (!chatHistory[user.id]) {
      setChatHistory((prev) => ({
        ...prev,
        [user.id]: [
          { from: "them", text: "Hey! 👋" },
          { from: "them", text: "How's your day?" },
        ],
      }));
    }

    if (onSelect) {
      onSelect(user, chatHistory[user.id] || []);
    }
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (!activeChat || input.trim() === "") return;

    const message = { from: "me", text: input.trim() };

    setChatHistory((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), message],
    }));

    setInput("");
  };

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="h-screen bg-[#0b0b0c] text-white border-r border-gray-800 w-[310px]"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {open && <UserButton />}

        <CollapsibleTrigger className="p-2 bg-[#1d1d1d] rounded-lg hover:bg-[#2b2b2b] transition">
          <Menu size={22} />
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        {/* MATCHES LIST */}
        {!activeChat && (
          <>
            <div className="p-4 font-semibold text-lg">Matches</div>

            <div className="flex flex-col gap-3 px-4 pb-10">
              {mockUsers.map((u) => (
                <MatchCard key={u.id} user={u} onClick={() => openChat(u)} />
              ))}
            </div>
          </>
        )}

        {/* CHAT UI */}
        {activeChat && (
          <div className="flex flex-col h-full">
            {/* CHAT HEADER */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-800">
              <Image
                src={activeChat.img}
                width={38}
                height={38}
                alt={activeChat.name}
                className="rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium">{activeChat.name}</p>
                <p className="text-xs text-gray-400">Online now</p>
              </div>

              {/* Back button */}
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setActiveChat(null)}
              >
                Back
              </button>
            </div>

            {/* CHAT MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatHistory[activeChat.id]?.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                    msg.from === "me"
                      ? "bg-pink-600/80 self-end ml-auto"
                      : "bg-[#18181b]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* MESSAGE INPUT */}
            <div className="p-3 border-t border-gray-800 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-[#1a1a1d] text-white rounded-xl px-3 py-2 text-sm outline-none border border-gray-700"
              />

              <button
                onClick={sendMessage}
                className="p-2 bg-yellow-600 rounded-xl hover:bg-pink-700 transition"
              >
                <Send size={18} />
              </button>
            </div>
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
