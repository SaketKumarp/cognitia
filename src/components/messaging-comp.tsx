"use client";

import { useState } from "react";
import { Person } from "./sidebar";
import Image from "next/image";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export default function MessagingComponent({ user }: { user: Person }) {
  const [messages, setMessages] = useState([
    { from: "them", text: "Hey! 👋" },
    { from: "them", text: "How's your day going?" },
  ]);

  const [input, setInput] = useState("");
  const [open, setOpen] = useState(true);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "me", text: input }]);
    setInput("");
  };

  return (
    <div className="w-full h-full bg-[#0d0d0d] text-white flex flex-col">
      <Collapsible open={open} onOpenChange={setOpen} className="w-full">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <Image
              src="/mine.svg"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
              alt="User Avatar"
            />
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-xs text-gray-400">Online now</p>
            </div>
          </div>

          <CollapsibleTrigger className="text-sm px-3 py-1 bg-[#1f1f1f] rounded-lg hover:bg-[#2a2a2a] transition">
            {open ? "Hide" : "Show"}
          </CollapsibleTrigger>
        </div>

        {/* COLLAPSIBLE CHAT CONTENT */}
        <CollapsibleContent className="overflow-hidden">
          <div className="flex flex-col h-[calc(100vh-140px)]">
            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[70%] p-2 rounded-lg ${
                    m.from === "me"
                      ? "bg-pink-600 ml-auto"
                      : "bg-[#1c1c1c] mr-auto"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* INPUT BAR */}
            <div className="flex gap-2 p-4 border-t border-gray-700">
              <input
                className="flex-1 bg-[#1b1b1b] px-3 py-2 rounded-lg outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />

              <button
                onClick={sendMessage}
                className="px-4 bg-pink-600 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
