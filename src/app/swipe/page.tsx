"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Heart, Star } from "lucide-react";
import SwipeCard from "@/components/newSwipe";
import ProfileCard from "@/components/cardProfile";
import { Sidebar } from "@/components/sidebar";

const images = [
  "/placeholder/1.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
  "/placeholder/10.svg",
];

/**
 * ProfilePortal
 * Renders children into document.body to avoid being affected by transformed ancestors.
 */
function ProfilePortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return ReactDOM.createPortal(children, document.body);
}

export default function SwipePage() {
  const [index, setIndex] = useState(0);
  const [forceSwipe, setForceSwipe] = useState<"left" | "right" | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const nextCard = () => {
    setIndex((i) => (i + 1) % images.length);
    setForceSwipe(null);
  };

  const handleSwipe = () => nextCard();

  const handleButtonSwipe = (direction: "left" | "right") => {
    setForceSwipe(direction);
    setTimeout(() => handleSwipe(direction), 300);
  };

  return (
    <>
      <div className="h-screen w-screen bg-neutral-900 flex flex-row overflow-hidden">
        {/* LEFT SIDEBAR */}
        <Sidebar />

        {/* RIGHT: SWIPE UI AREA */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* CARD CONTAINER WITH SHRINK EFFECT */}
          <motion.div
            animate={
              showProfile
                ? { scale: 0.85, y: -40, opacity: 0.6 }
                : { scale: 1, y: 0, opacity: 1 }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-[350px] h-[500px]"
          >
            <SwipeCard
              key={index}
              image={images[index]}
              name={`Student ${index + 1}`}
              age={20 + index}
              skills={["AI", "Hackathons", "Web Dev"]}
              onSwipe={handleSwipe}
              forceSwipe={forceSwipe}
            />
          </motion.div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <Button
              size="icon"
              className="rounded-full bg-red-600 text-white h-14 w-14"
              onClick={() => handleButtonSwipe("left")}
            >
              <X size={32} />
            </Button>

            <Button
              size="icon"
              className="rounded-full bg-blue-600 text-white h-14 w-14"
              onClick={() => setShowProfile(true)}
            >
              <Star size={32} />
            </Button>

            <Button
              size="icon"
              className="rounded-full bg-green-600 text-white h-14 w-14"
              onClick={() => handleButtonSwipe("right")}
            >
              <Heart size={32} />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile modal rendered into document.body via portal so it's always viewport-fixed */}
      <ProfilePortal>
        <AnimatePresence>
          {showProfile && (
            <motion.div
              key="profile-modal"
              initial={{ y: 500, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 500, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 flex justify-center pb-8 z-50"
            >
              {/* Pass onClose prop so ProfileCard can close itself */}
              <ProfileCard onClose={() => setShowProfile(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </ProfilePortal>
    </>
  );
}
