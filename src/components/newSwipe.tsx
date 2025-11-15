"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X } from "lucide-react";

interface SwipeCardProps {
  image: string;
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
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 120) onSwipe("right");
    else if (info.offset.x < -120) onSwipe("left");
  };

  return (
    <motion.div
      drag="x"
      style={{ x, rotate }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.25}
      onDragEnd={handleDragEnd}
      className="absolute w-[350px] h-[500px] rounded-2xl shadow-2xl will-change-transform"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        forceSwipe === "right"
          ? { x: 500, opacity: 0, rotate: 25 }
          : forceSwipe === "left"
            ? { x: -500, opacity: 0, rotate: -25 }
            : { x: 0, opacity: 1, rotate: 0 }
      }
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <Card className="w-full h-full rounded-2xl overflow-hidden bg-neutral-900 text-white">
        <CardContent className="p-0 h-full relative flex flex-col justify-end">
          <Image
            src={image}
            alt="profile"
            fill
            className="absolute object-cover"
          />

          {/* GRADIENT + TEXT */}
          <div className="relative p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-xl font-semibold">
              {name}, {age}
            </h2>

            <div className="flex gap-2 mt-2 flex-wrap">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/20 text-sm rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* ICON OVERLAYS */}
          <motion.div
            className="absolute top-5 left-5 text-red-400"
            style={{ opacity: useTransform(x, [-200, 0], [1, 0]) }}
          >
            <X size={60} />
          </motion.div>

          <motion.div
            className="absolute top-5 right-5 text-green-400"
            style={{ opacity: useTransform(x, [0, 200], [0, 1]) }}
          >
            <Heart size={60} />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
