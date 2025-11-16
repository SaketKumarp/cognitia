"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProfileCardProps {
  profile: any;
  onClose: () => void;
}

export default function ProfileCard({ profile, onClose }: ProfileCardProps) {
  const user = profile;

 

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl p-6 bg-white relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-black"
      >
        <X size={22} />
      </button>

      <div className="flex flex-col items-center">
        {/* Profile image */}
        <div className="relative w-32 h-32 -mt-20 rounded-full overflow-hidden shadow-lg border-4 border-white">
          <Image
            src={user?.imageUrl || "/placeholder/1.svg"}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-semibold mt-4">{user?.name}</h2>

        {/* Location */}
        <p className="text-sm text-gray-500">{user?.location}</p>

        {/* Bio */}
        <p className="text-sm mt-3 text-center text-gray-700">{user?.bio}</p>

        <p className="text-sm text-gray-500 mt-1">
          {user?.education || user?.work}
        </p>

        {/* Stats */}
        <CardContent className="w-full mt-6 grid grid-cols-3 text-center">
          <div>
            <p className="text-xl font-bold">{user?.friends || 0}</p>
            <p className="text-xs text-gray-500">Friends</p>
          </div>
          <div>
            <p className="text-xl font-bold">{user?.projects || 0}</p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div>
            <p className="text-xl font-bold">{user?.collabs || 0}</p>
            <p className="text-xs text-gray-500">Collabs</p>
          </div>
        </CardContent>

        <div className="flex gap-4 mt-4">
          <Button className="rounded-xl px-6">Connect</Button>
          <Button variant="secondary" className="rounded-xl px-6">
            Message
          </Button>
        </div>

        <p className="text-sm text-gray-600 mt-6 text-center">
          {user?.description ||
            "Passionate about collaborating with developers, designers, and creators."}
        </p>
      </div>
    </Card>
  );
}
