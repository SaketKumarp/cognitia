"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useGetAllUsers = () => {
  const data = useQuery(api.user.getAllUsers);

  return {
    data,
    loading: data === undefined,
  };
};
