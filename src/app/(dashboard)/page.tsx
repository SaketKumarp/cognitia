"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useCreateUser } from "@/hook/userProfile";
import { registerSchema } from "@/components/schema";

// Clerk
import { useSignUp } from "@clerk/nextjs";

export default function Signup() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      skills: [],
      interests: [],
      photos: [],
    },
  });

  const { mutate: createUser, loading } = useCreateUser();

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (!isLoaded) return;

    try {
      // 1️⃣ Create Clerk user
      const result = await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      // Requires verification (Clerk sends email)
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      toast("Verification email sent!", { description: "Check your inbox." });

      // 2️⃣ After verification → create Convex user
      const clerkUserId = result.id; // <-- This is your Convex authId

      const generatedUsername = values.name.toLowerCase().replace(/\s+/g, "");

      const payload = {
        authId: clerkUserId,
        name: values.name,
        username: generatedUsername,
        bio: "",
        age: values.age,
        gender: values.gender,
        skills: values.skills,
        interests: values.interests,
        experienceLevel: values.experienceLevel,
        github: values.github,
        portfolio: values.portfolio,
        linkedin: values.linkedin,
        photos: values.photos,
        city: values.city,
        country: values.country,
        createdAt: Date.now(),
      };

      createUser(payload, {
        onSuccess: () => {
          toast("Account created!", { description: "Welcome!" });
          router.replace("/");
        },
        onError: () => {
          toast("Registration failed in Convex!");
        },
      });
    } catch (err: any) {
      toast("Registration failed!", { description: err.message });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl border bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Left Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white w-full md:w-1/2 p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-3">Welcome!</h2>
        <p className="text-white/90">
          Create your account and start your journey
        </p>
      </div>

      {/* Right Section */}
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

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Name" {...form.register("name")} required />
          <Input
            placeholder="Email"
            type="email"
            {...form.register("email")}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            {...form.register("password")}
            required
          />

          <Button
            type="submit"
            className="w-full font-bold"
            size="lg"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
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
