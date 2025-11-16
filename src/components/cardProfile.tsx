"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Github, Globe, Linkedin } from "lucide-react";
import { useMemo } from "react";

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
  "/placeholder/11.svg",
  "/placeholder/12.svg",
  "/placeholder/13.svg",
  "/placeholder/14.svg",
  "/placeholder/15.svg",
  "/placeholder/16.svg",
  "/placeholder/17.svg",
  "/placeholder/18.svg",
  "/placeholder/19.svg",
  "/placeholder/20.svg",
  "/placeholder/21.svg",
  "/placeholder/22.svg",
  "/placeholder/23.svg",
  "/placeholder/24.svg",
];

interface ProfileCardProps {
  profile: any;
  onClose: () => void;
}

export default function ProfileCard({ profile, onClose }: ProfileCardProps) {
  const randomImage = useMemo(() => {
    return images[Math.floor(Math.random() * images.length)];
  }, [profile]);

  const user = profile;

  return (
    <Card className="w-full max-w-2xl rounded-3xl shadow-2xl p-10 bg-white relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-gray-600 hover:text-black"
      >
        <X size={26} />
      </button>

      {/* Header Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-40 h-40 -mt-28 rounded-full overflow-hidden shadow-xl border-4 border-white">
          <Image
            src={randomImage}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-3xl font-bold mt-6">{user?.name}</h2>

        <p className="text-gray-600 text-sm mt-1">@{user?.username}</p>

        <p className="text-gray-500 text-sm mt-2">
          {user?.city}, {user?.country}
        </p>

        {user?.bio && (
          <p className="text-center text-gray-700 mt-4 max-w-xl">{user.bio}</p>
        )}
      </div>

      {/* Personal Details */}
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Age:</span> {user?.age || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {user?.gender || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {user?.experienceLevel || "N/A"}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user?.skills?.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {user?.interests?.map((interest: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Links</h3>

          <div className="flex gap-4">
            {user?.github && (
              <a
                href={user.github}
                className="flex items-center gap-2 text-gray-700 hover:text-black"
              >
                <Github size={18} /> GitHub
              </a>
            )}

            {user?.portfolio && (
              <a
                href={user.portfolio}
                className="flex items-center gap-2 text-gray-700 hover:text-black"
              >
                <Globe size={18} /> Portfolio
              </a>
            )}

            {user?.linkedin && (
              <a
                href={user.linkedin}
                className="flex items-center gap-2 text-gray-700 hover:text-black"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* User Photos */}
        {user?.photos?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Photos</h3>
            <div className="grid grid-cols-3 gap-3">
              {user.photos.map((url: string, i: number) => (
                <div
                  key={i}
                  className="relative w-full h-24 rounded-lg overflow-hidden"
                >
                  <Image
                    src={url}
                    alt="user photo"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <Button className="px-6 text-lg rounded-xl">Connect</Button>
          <Button variant="secondary" className="px-6 text-lg rounded-xl">
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
