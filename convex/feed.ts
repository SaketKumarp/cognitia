// convex/feed.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getFeed = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("unauthorized");
    const allUsers = await ctx.db.query("users").collect();

    // Users already swiped on
    const swipes = await ctx.db
      .query("swipes")
      .withIndex("by_fromUser", (q) => q.eq("fromUser", userId))
      .collect();

    const swipedIds = new Set(swipes.map((s) => s.toUser));

    // Filter feed
    return allUsers.filter((u) => u._id !== userId && !swipedIds.has(u._id));
  },
});
