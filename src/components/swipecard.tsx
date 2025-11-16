"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X } from "lucide-react";

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

interface SwipeCardProps {
  image?: string;
  name: string;
  age: number;
  skills: string[];
  onSwipe: (direction: "left" | "right") => void;
  forceSwipe?: "left" | "right" | null;
}

export default function SwipeCard({
  image,
  name,
  age,
  skills,
  onSwipe,
  forceSwipe,
}: SwipeCardProps) {
  const x = useMotionValue(0);

  // FIXED → A clean random image
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const rotate = useTransform(x, [-250, 250], [-18, 18]);
  const scale = useTransform(x, [-250, 0, 250], [0.9, 1, 0.9]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 140) onSwipe("right");
    else if (info.offset.x < -140) onSwipe("left");
  };

  return (
    <motion.div
      drag="x"
      style={{ x, rotate, scale }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDragEnd={handleDragEnd}
      className="
        absolute w-[360px] h-[540px]
        rounded-[32px] overflow-hidden
        backdrop-blur-xl
        shadow-[0_20px_80px_-15px_rgba(0,0,0,0.7)]
        ring-1 ring-white/10
        select-none
      "
      initial={{ opacity: 0, scale: 0.85 }}
      animate={
        forceSwipe === "right"
          ? { x: 500, opacity: 0, rotate: 25 }
          : forceSwipe === "left"
            ? { x: -500, opacity: 0, rotate: -25 }
            : { x: 0, opacity: 1, rotate: 0 }
      }
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card className="w-full h-full bg-black/30 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden relative">
        <CardContent className="p-0 h-full relative">
          {/* ❤️ PREMIUM BACKGROUND IMAGE */}
          <div className="absolute inset-0">
            <Image
              src={randomImage}
              alt={name}
              fill
              priority
              className="object-cover object-center saturate-125"
            />
          </div>

          {/* ✨ Gradient + Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25),transparent)]" />

          {/* ✨ Subtle glossy top bar */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* ⚡ CARD FOOTER */}
          <div className="absolute bottom-0 p-6 w-full z-20">
            <h2 className="text-3xl font-extrabold text-white drop-shadow-lg flex items-center gap-3">
              {name}
              <span className="text-white/80 font-medium">{age}</span>
            </h2>

            {/* SKILLS */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="
                    px-3 py-1 text-xs font-medium
                    bg-white/15 
                    backdrop-blur-md
                    rounded-full text-white 
                    border border-white/10
                    shadow-[0_2px_6px_rgba(0,0,0,0.25)]
                  "
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            className="absolute top-10 left-6 text-red-400"
            style={{ opacity: useTransform(x, [-200, 0], [1, 0]) }}
          >
            <X size={70} className="opacity-70 drop-shadow-xl" />
          </motion.div>

          {/* 💚 RIGHT SWIPE INDICATOR */}
          <motion.div
            className="absolute top-10 right-6 text-green-400"
            style={{ opacity: useTransform(x, [0, 200], [0, 1]) }}
          >
            <Heart size={70} className="opacity-70 drop-shadow-xl" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
