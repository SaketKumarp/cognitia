"use client";

import { useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useAuth } from "@clerk/clerk-react";

type SwipeDirection = "left" | "right";

interface SwipeArgs {
  fromUser: Id<"users">; // <-- FRONTEND sends this now
  toUser: Id<"users">;
  direction: SwipeDirection;
}

interface Options {
  onSuccess?: (res: { matched: boolean }) => void;
  onError?: (err: unknown) => void;
}

export const useSwipeUser = () => {
  const [loading, setLoading] = useState(false);
  const swipeMutation = useMutation(api.swipe.swipe);
  const { userId } = useAuth();
  console.log(userId);
  const mutate = useCallback(
    async (values: SwipeArgs, options?: Options) => {
      try {
        setLoading(true);
        const response = await swipeMutation(values);
        options?.onSuccess?.(response);
        return response;
      } catch (err) {
        console.error("Swipe error:", err);
        options?.onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [swipeMutation]
  );

  return { mutate, loading };
};
