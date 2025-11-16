"use client";

import { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Heart, Plus } from "lucide-react";

import ProfileCard from "@/components/cardProfile";

import { useGetAllUsers } from "@/hook/usegetAllUsers";
import SwipeCard from "@/components/swipecard";

import { useAuth } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar";

export default function SwipePage() {
  const { userId } = useAuth();
  const { data: users, loading } = useGetAllUsers();

  const [index, setIndex] = useState(0);
  const [forceSwipe, setForceSwipe] = useState<"left" | "right" | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const images = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => {
        const n = Math.floor(Math.random() * 10) + 1;
        return `/placeholder/${n}.jpg`;
      }),
    []
  );

  if (loading || !users) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-neutral-900">
        Loading users...
      </div>
    );
  }

  const nextCard = () => {
    if (users.length === 0) return;
    setIndex((i) => (i + 1) % users.length);
    setForceSwipe(null);
  };

  const handleSwipe = () => nextCard();

  const handleButtonSwipe = (dir: "left" | "right") => {
    setForceSwipe(dir);
    setTimeout(nextCard, 350);
  };

  const user = users[index];
  const fallbackImage = images[index];

  return (
    <>
      {/* background */}
      <div className="h-screen w-screen flex relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/haha.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ scale: 1.05, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Sidebar */}
        <div className="relative z-40">
          <Sidebar />
        </div>

        {/* swipe area */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-30">
          <motion.div className="relative w-[360px] h-[530px]">
            <SwipeCard
              key={user._id}
              image={fallbackImage}
              name={user.name}
              age={user.age || 18}
              skills={user.skills || []}
              onSwipe={handleSwipe}
              forceSwipe={forceSwipe}
            />
          </motion.div>

          {/* buttons */}
          <motion.div className="mt-8 flex gap-6 p-4 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20">
            <Button
              size="icon"
              className="rounded-full bg-red-600/90 text-white h-16 w-16"
              onClick={() => handleButtonSwipe("left")}
            >
              <X size={34} />
            </Button>

            <Button
              size="icon"
              className="rounded-full bg-blue-600/90 text-white h-16 w-16"
              onClick={() => setShowProfile(true)}
            >
              <Plus size={34} />
            </Button>

            <Button
              size="icon"
              className="rounded-full bg-green-600/90 text-white h-16 w-16"
              onClick={() => handleButtonSwipe("right")}
            >
              <Heart size={34} />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Profile modal */}
      {typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {showProfile && (
              <motion.div
                key="modal"
                className="fixed bottom-0 left-0 right-0 flex justify-center pb-10 z-50"
                initial={{ y: 500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 500, opacity: 0 }}
              >
                <ProfileCard
                  profile={user}
                  onClose={() => setShowProfile(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
