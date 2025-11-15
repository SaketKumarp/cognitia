"use client";
import CreateUserCard from "@/components/createUserCard";
import { UserButton } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-neutral-900 to-neutral-950 text-white">
      {/* NAV */}
      <nav className="w-full px-6 py-4 flex justify-between items-center border-b border-neutral-800/50 backdrop-blur-md bg-neutral-900/60">
        <span className="text-xl font-bold tracking-tight text-white">
          Innovation Connect
        </span>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>

          <UserButton />
        </div>
      </nav>

      {/* CENTER */}
      <div className="flex flex-1 justify-center items-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl"
        >
          <Card className="bg-neutral-800/70 backdrop-blur-xl border-neutral-700 shadow-xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-neutral-200">
                Create Your Developer Profile
              </CardTitle>
            </CardHeader>

            <CardContent>
              <CreateUserCard />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
