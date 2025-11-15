"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useGetUserProfile = (authId: string | null) => {
  const data = useQuery(api.user.getUserProfile, authId ? { authId } : "skip");

  return {
    data,
    loading: data === undefined,
  };
};
