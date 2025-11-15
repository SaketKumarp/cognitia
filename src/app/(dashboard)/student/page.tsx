"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useQuery } from "convex/react";
api;
import { useSwipeProject } from "@/hook/useSwipe";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { api } from "../../../../convex/_generated/api";

const StudentPage = () => {
  // 1. Load projects from Convex
  const projects = useQuery(api.project.getAllProjects);

  // 2. Swipe mutation from your hook
  const { mutate: swipe, loading } = useSwipeProject();

  // 3. Current visible card
  const [currentIndex, setCurrentIndex] = useState(0);

  // 4. Controls for animation
  const controls = useAnimation();

  if (!projects) return <div>Loading projects...</div>;
  if (projects.length === 0) return <div>No projects available.</div>;

  const currentProject = projects[currentIndex];

  // Swipe logic + DB save
  const handleSwipe = async (liked: boolean) => {
    if (!currentProject) return;

    await swipe(
      {
        userId: "YOUR_CONVEX_USER_ID_HERE" as Id<"users">,
        projectId: currentProject._id as Id<"projects">,
        liked,
      },
      {
        onSuccess: () => console.log("Swipe saved!"),
      }
    );

    // Move to next project
    setCurrentIndex((prev) => prev + 1);
  };

  // Framer-motion swipe gestures
  const handleDragEnd = async (_: any, info: any) => {
    if (info.offset.x > 100) {
      // Swipe Right → Like
      await handleSwipe(true);
    } else if (info.offset.x < -100) {
      // Swipe Left → Pass
      await handleSwipe(false);
    } else {
      // Snap back
      controls.start({ x: 0 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold mb-6">Find Your Co-Founder 🔥</h1>

      {currentProject ? (
        <motion.div
          drag="x"
          onDragEnd={handleDragEnd}
          animate={controls}
          className="w-[350px] p-5 bg-white shadow-xl rounded-2xl border"
          whileDrag={{ scale: 1.05 }}
        >
          <h2 className="text-xl font-semibold">{currentProject.title}</h2>
          <p className="mt-2 text-gray-700">{currentProject.description}</p>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">
              Required Skills:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentProject.requiredSkills?.map(
                (skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-3 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No more projects 🎉
        </div>
      )}

      {/* Like / Pass Buttons */}
      <div className="flex gap-6 mt-6">
        <Button
          variant="destructive"
          disabled={loading}
          onClick={() => handleSwipe(false)}
        >
          Pass 👎
        </Button>

        <Button
          variant="default"
          disabled={loading}
          onClick={() => handleSwipe(true)}
        >
          Like ❤️
        </Button>
      </div>
    </div>
  );
};

export default StudentPage;
