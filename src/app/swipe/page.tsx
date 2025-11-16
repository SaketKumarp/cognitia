"use client";

import { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Heart, Plus, Upload } from "lucide-react";

import ProfileCard from "@/components/cardProfile";
import { useGetAllUsers } from "@/hook/usegetAllUsers";
import SwipeCard from "@/components/swipecard";

import { useAuth } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar";
import { randomImage } from "@/func";

import { toast } from "sonner";
import { useSwipeUser } from "@/hook/use-swipe-user";
import { useRouter } from "next/navigation";

export default function SwipePage() {
  const { userId } = useAuth();
  const { data: users, loading } = useGetAllUsers();
  const { mutate: swipeUser } = useSwipeUser(); // <--- use swipe hook

  const [index, setIndex] = useState(0);
  const [forceSwipe, setForceSwipe] = useState<"left" | "right" | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  // remove myself from the list

  const router = useRouter();
  const filteredUsers = useMemo(() => {
    if (!users || !userId) return [];
    return users.filter((u: any) => u.authId !== userId);
  }, [users, userId]);

  if (loading || filteredUsers.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-neutral-900">
        Loading users...
      </div>
    );
  }

  const handleUpload = () => {
    router.replace("/swipe/upload");
  };

  const nextCard = () => {
    if (filteredUsers.length === 0) return;
    setIndex((i) => (i + 1) % filteredUsers.length);
    setForceSwipe(null);
  };

  // When swipe happens from SwipeCard component
  const handleSwipe = (dir?: "left" | "right") => {
    const currentUser = filteredUsers[index];
    if (!currentUser) return;

    if (dir === "left" || dir === "right") {
      swipeUser(
        {
          toUser: currentUser._id, // convex ID ❤️
          direction: dir,
        },
        {
          onSuccess: (res) => {
            if (res.matched) {
              console.log("🔥 YOU GOT A MATCH!");
            }
          },
          onError: () => {
            toast.error("an error occured!");
          },
        }
      );
    }

    nextCard();
  };

  // When buttons pressed
  const handleButtonSwipe = (dir: "left" | "right") => {
    const currentUser = filteredUsers[index];
    if (!currentUser) return;

    // trigger animation
    setForceSwipe(dir);

    // send swipe to backend
    swipeUser(
      { toUser: currentUser._id, direction: dir },
      {
        onSuccess: () => {
          toast.success("match found");
        },
      }
    );

    // show next card
    setTimeout(nextCard, 350);
  };

  const user = filteredUsers[index];

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
              image={randomImage}
              name={user.name}
              age={user.age || 18}
              skills={user.skills || []}
              onSwipe={handleSwipe} // <-- swipe triggered
              forceSwipe={forceSwipe} // <-- force animation
            />
          </motion.div>

          {/* buttons */}
          <motion.div className="mt-8 flex gap-6 p-4 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20">
            {/* left */}
            <Button
              size="icon"
              className="rounded-full bg-red-600/90 text-white h-16 w-16"
              onClick={() => handleButtonSwipe("left")}
            >
              <X size={34} />
            </Button>

            {/* profile */}
            <Button
              size="icon"
              className="rounded-full bg-blue-600/90 text-white h-16 w-16"
              onClick={() => setShowProfile(true)}
            >
              <Plus size={34} />
            </Button>

            {/* right */}
            <Button
              size="icon"
              className="rounded-full bg-green-600/90 text-white h-16 w-16"
              onClick={() => handleButtonSwipe("right")}
            >
              <Heart size={34} />
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-yellow-600/90 text-white h-16 w-16"
              onClick={handleUpload}
            >
              <Upload size={34} />
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
