// hooks/useFeed.ts
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useFeed(userId: string | undefined) {
  const feed = useQuery(api.feed.getFeed, userId ? { userId } : "skip");

  const swipe = useMutation(api.swipe.swipe);

  const swipeRight = (toUser: string) =>
    swipe({ fromUser: userId!, toUser, direction: "right" });

  const swipeLeft = (toUser: string) =>
    swipe({ fromUser: userId!, toUser, direction: "left" });

  return {
    feed,
    swipeRight,
    swipeLeft,
    loading: !feed,
  };
}
