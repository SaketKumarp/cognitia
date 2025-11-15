import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ProfileCard({ onClose }: { onClose: () => void }) {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl p-6 bg-white relative">
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-black"
      >
        <X size={22} />
      </button>

      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 -mt-20 rounded-full overflow-hidden shadow-lg border-4 border-white">
          <Image
            src="/placeholder/8.svg"
            alt="User Profile"
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-2xl font-semibold mt-4">Saket Pandey</h2>
        <p className="text-sm text-gray-500">Varanasi, India</p>

        <p className="text-sm mt-3 text-center text-gray-700">
          Full-Stack Developer · React · Next.js · Node.js · DSA Learner
        </p>
        <p className="text-sm text-gray-500 mt-1">NIT Trichy (MCA Aspirant)</p>

        <CardContent className="w-full mt-6 grid grid-cols-3 text-center">
          <div>
            <p className="text-xl font-bold">22</p>
            <p className="text-xs text-gray-500">Friends</p>
          </div>
          <div>
            <p className="text-xl font-bold">10</p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div>
            <p className="text-xl font-bold">89</p>
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
          Passionate about building impactful apps and collaborating with
          developers, designers, and creators.
        </p>
      </div>
    </Card>
  );
}
