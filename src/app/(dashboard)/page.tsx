// Updated Signup Page with fixes
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// Clerk
import { useSignUp, useUser } from "@clerk/nextjs";
import { useCreateUser } from "@/hook/userProfile";
import { useGetUserProfile } from "@/hook/useUser";

export default function Signup() {
  const router = useRouter();
  const { isLoaded } = useSignUp();
  const { user } = useUser();
  const { mutate: createUser, loading } = useCreateUser();
  const { data, loading: profileLoading } = useGetUserProfile(user?.id ?? null);
  // Automatically redirect if profile already exists
  useEffect(() => {
    if (!profileLoading && data) {
      router.replace("/swipe");
    }
  }, [data, profileLoading, router]);

  const [form, setForm] = useState({
    name: "",
    bio: "",
    age: "",
    gender: "",
    skills: "",
    interests: "",
    experienceLevel: "",
    github: "",
    portfolio: "",
    linkedin: "",
    city: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded || !user) return;

    try {
      const skillsArray = form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const interestsArray = form.interests
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      createUser(
        {
          authId: user.id,
          name: form.name,
          username: user.fullName ?? "",
          bio: form.bio,
          age: Number(form.age),
          gender: form.gender,
          skills: skillsArray,
          interests: interestsArray,
          experienceLevel: form.experienceLevel,
          github: form.github,
          portfolio: form.portfolio,
          linkedin: form.linkedin,
          city: form.city,
          country: form.country,
          photos: [],
          createdAt: Date.now(),
        },
        {
          onSuccess: () => {
            toast.success("Account created!", { description: "Welcome!" });
            router.replace("/swipe");
          },
          onError: () => {
            toast.error("User creation failed!");
          },
        }
      );
    } catch {
      toast.error("Registration failed!");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <Card className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl border bg-white/40 backdrop-blur-xl overflow-hidden flex flex-col md:flex-row">
        {/* LEFT PANEL */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-gradient-to-br from-[#8CC5F6]/70 to-[#6AB4E8]/70 backdrop-blur-2xl text-white shadow-inner">
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
            Welcome!
          </h2>
          <p className="text-white/90 text-lg leading-relaxed max-w-sm">
            Create your account and start your journey.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <CardContent className="w-full md:w-1/2 p-10 space-y-6 bg-white/50 backdrop-blur-xl">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-semibold">
              Create Account
            </CardTitle>
            <CardDescription>
              Already have an account?
              <Link href="/sign-in" className="text-blue-600 ml-1">
                Login
              </Link>
            </CardDescription>
          </CardHeader>

          <form onSubmit={onSubmit} className="space-y-4">
            {Object.keys(form).map((key) => (
              <Input
                key={key}
                name={key}
                placeholder={key.replace(/([A-Z])/g, " $1").toUpperCase()}
                value={form[key]}
                onChange={handleChange}
                type={key === "age" ? "number" : "text"}
              />
            ))}

            <Button
              variant="secondary"
              type="submit"
              className="w-full font-bold hover:bg-slate-200/75"
              size="lg"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Your Profile"}
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <div className="h-px w-full bg-muted" />
            <span className="text-sm text-muted-foreground">OR</span>
            <div className="h-px w-full bg-muted" />
          </div>

          <div className="space-y-3">
            <Button variant="secondary" className="w-full" size="lg">
              <FcGoogle className="mr-2" /> Sign in with Google
            </Button>

            <Button variant="secondary" className="w-full" size="lg">
              <FaGithub className="mr-2" /> Sign in with Github
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
