"use client";

import { useState } from "react";
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
import { useCreateUser } from "@/hook/userProfile";

// Clerk
import { useSignUp, useUser } from "@clerk/nextjs";

export default function Signup() {
  const router = useRouter();
  const { isLoaded } = useSignUp();
  const { user } = useUser();
  const { mutate: createUser, loading } = useCreateUser();

  // ⭐ Plain React state (working version)
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

  // ⭐ Handles all changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ⭐ Submit Handler
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoaded || !user) return;

    try {
      console.log("SUBMIT VALUES:", form);

      // 👉 convert strings → arrays
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
            toast.error("Convex user creation failed!");
          },
        }
      );
    } catch (err) {
      toast.error("Registration failed!");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl border bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Left */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-full md:w-1/2 p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-3">Welcome!</h2>
        <p className="text-white/90">
          Create your account and start your journey
        </p>
      </div>

      {/* Right */}
      <CardContent className="w-full md:w-1/2 p-10 space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Already have an account?
            <Link href="/sign-in" className="text-blue-600 ml-1">
              Login
            </Link>
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
          />
          <Input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />
          <Input
            name="gender"
            placeholder="Gender"
            value={form.gender}
            onChange={handleChange}
          />

          {/* SKILLS */}
          <Input
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
          />

          {/* INTERESTS */}
          <Input
            name="interests"
            placeholder="Interests (comma separated)"
            value={form.interests}
            onChange={handleChange}
          />

          <Input
            name="experienceLevel"
            placeholder="Experience Level"
            value={form.experienceLevel}
            onChange={handleChange}
          />
          <Input
            name="github"
            placeholder="Github"
            value={form.github}
            onChange={handleChange}
          />
          <Input
            name="portfolio"
            placeholder="Portfolio"
            value={form.portfolio}
            onChange={handleChange}
          />
          <Input
            name="linkedin"
            placeholder="LinkedIn"
            value={form.linkedin}
            onChange={handleChange}
          />

          <Input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          <Input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />

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
  );
}
