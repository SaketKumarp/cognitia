import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**************************************************************
 * 1) GET USER BY USER-ID (Convex user._id)
 **************************************************************/
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db.get(userId);
  },
});

/**************************************************************
 * 2) UPDATE USER PROFILE
 **************************************************************/
export const updateUser = mutation({
  args: {
    userId: v.id("users"), // Convex document ID
    name: v.string(),
    institute: v.optional(v.string()),
    branch: v.optional(v.string()),
    year: v.optional(v.number()),
    skills: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const { userId, ...rest } = args;

    const existing = await ctx.db.get(userId);
    if (!existing) throw new Error("User not found");

    await ctx.db.patch(userId, rest);
    return userId;
  },
});

/**************************************************************
 * 3) SEARCH USERS (name, skills, interests)
 **************************************************************/
export const searchUsers = query({
  args: { query: v.string() },
  handler: async (ctx, { query }) => {
    const q = query.toLowerCase();

    const all = await ctx.db.query("users").collect();

    return all.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.skills?.some((s) => s.toLowerCase().includes(q)) ||
        u.interests?.some((i) => i.toLowerCase().includes(q))
    );
  },
});
