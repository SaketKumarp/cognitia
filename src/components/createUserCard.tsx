"use client";

import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hook/userProfile";
import { useGetUserProfile } from "@/hook/useUser";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import Image from "next/image";

export default function CreateUserCard() {
  const router = useRouter();
  const { user } = useUser();
  const { mutate, loading } = useCreateUser();

  const authId = user?.id ?? null;

  // FETCH USER PROFILE
  const { data: profile, loading: profileLoading } = useGetUserProfile(authId);

  // AUTO REDIRECT IF PROFILE EXISTS
  useEffect(() => {
    if (!profileLoading && profile) {
      router.push("/swipe");
    }
  }, [profile, profileLoading, router]);

  // CREATE PROFILE
  const handleCreate = () => {
    if (!user) return;

    mutate(
      {
        authId: user.id,
        name: user.fullName || "No Name",
        username: user.username || user.id,

        age: undefined,
        gender: undefined,

        skills: [],
        interests: [],
        experienceLevel: "Beginner",

        github: user.externalAccounts?.[0]?.username ?? "",
        portfolio: "",
        linkedin: "",

        photos: user.imageUrl ? [user.imageUrl] : [],

        city: "",
        country: "",

        createdAt: Date.now(),
      },
      {
        onSuccess: (id) => {
          toast.success("Profile Created!");
          router.push("/swipe");
        },
        onError: () => toast.error("Failed to create user"),
      }
    );
  };

  // SHOW NOTHING WHILE CHECKING PROFILE
  if (profileLoading) {
    return <div className="text-white/60 text-sm">Checking profile...</div>;
  }

  // IF PROFILE EXISTS → Show a nice card allowing user to go to swipe
  if (profile) {
    return (
      <div className="w-[350px] bg-neutral-800 rounded-xl shadow-lg p-6 text-white flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Welcome Back 👋</h2>

        <div className="flex items-center gap-3">
          {/* <Image
            fill
            src={profile.photos?.[0] ?? "/placeholder/1.svg"}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border"
          /> */}
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-neutral-400 text-sm">@{profile.username}</p>
          </div>
        </div>

        <p className="text-neutral-300 text-sm">
          Skills:{" "}
          {profile.skills.length > 0
            ? profile.skills.join(", ")
            : "No skills added yet"}
        </p>

        <Button
          onClick={() => router.push("/swipe")}
          className="bg-blue-600 hover:bg-blue-700 w-full"
        >
          Continue to Swipe →
        </Button>
      </div>
    );
  }

  // IF NO PROFILE → Show Create Card
  return (
    <div className="w-[350px] bg-neutral-800 rounded-xl shadow p-6 text-white flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Create Profile</h2>

      <p className="text-neutral-300">
        No profile found. Create one to continue.
      </p>

      <Button
        onClick={handleCreate}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading ? "Creating..." : "Create Your Profile"}
      </Button>
    </div>
  );
}
