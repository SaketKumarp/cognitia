import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const swipeProject = mutation({
  args: {
    userId: v.id("users"),
    projectId: v.id("projects"),
    liked: v.boolean(),
  },

  handler: async (ctx, args) => {
    const { userId, projectId, liked } = args;

    // CHECK IF EXISTS
    const existing = await ctx.db
      .query("matches")
      .withIndex(
        "by_user_project",
        (q) => q.eq("userId", userId).eq("projectId", projectId) // 🔥 CORRECT
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { liked });
      return existing._id;
    }

    // CREATE NEW SWIPE
    const id = await ctx.db.insert("matches", {
      userId,
      projectId,
      liked,
      direction: "user->project",
      matched: false,
      createdAt: Date.now(),
    });

    // REVERSE MATCH CHECK — MUST USE CORRECT FIELD
    const reverse = await ctx.db
      .query("matches")
      .withIndex(
        "by_user_project",
        (q) => q.eq("userId", userId) // 🔥 CORRECT: userId field holds only users
      )
      .collect();

    if (reverse.some((r) => r.liked === true)) {
      await ctx.db.patch(id, { matched: true });
    }

    return id;
  },
});
