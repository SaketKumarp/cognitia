// convex/users.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// CREATE USER (first time login)
export const createUser = mutation({
  args: {
    authId: v.string(),
    name: v.string(),
    username: v.string(),
    bio: v.optional(v.string()),

    age: v.optional(v.number()),
    gender: v.optional(v.string()),

    skills: v.array(v.string()),
    interests: v.array(v.string()),
    experienceLevel: v.optional(v.string()),

    github: v.optional(v.string()),
    portfolio: v.optional(v.string()),
    linkedin: v.optional(v.string()),

    photos: v.array(v.string()),

    city: v.optional(v.string()),
    country: v.optional(v.string()),

    createdAt: v.number(),
  },

  handler: async (ctx, args) => {
    // Prevent duplicate accounts
    const existing = await ctx.db
      .query("users")
      .withIndex("by_authId", (q) => q.eq("authId", args.authId))
      .unique();

    if (existing) {
      throw new Error("User already exists");
    }

    // INSERT EXACT VALUES FROM FRONTEND
    const id = await ctx.db.insert("users", args);

    return id;
  },
});

// UPDATE USER PROFILE
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    data: v.object({
      bio: v.optional(v.string()),
      skills: v.optional(v.array(v.string())),
      interests: v.optional(v.array(v.string())),
      github: v.optional(v.string()),
      linkedin: v.optional(v.string()),
      portfolio: v.optional(v.string()),
      photos: v.optional(v.array(v.string())),
    }),
  },
  handler: async (ctx, { userId, data }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("unauthorized");
    await ctx.db.patch(userId, data);
    return { success: true };
  },
});

// GET PROFILE

export const getUserProfile = query({
  args: { authId: v.string() },
  handler: async (ctx, { authId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_authId", (q) => q.eq("authId", authId))
      .first();
  },
});

// GET ALL USERS
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
