"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";

export const useGetCurrentUser = () => {
  const { userId } = useAuth();

  const convexUser = useQuery(
    api.user.getCurrentUser,
    userId ? { authId: userId } : "skip"
  );

  return { user: convexUser };
};
