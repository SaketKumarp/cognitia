import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // -----------------------------
  // USERS
  // -----------------------------
  users: defineTable({
    authId: v.string(), // Clerk or Auth provider ID
    name: v.string(),
    username: v.string(),
    bio: v.optional(v.string()),

    age: v.optional(v.number()),
    gender: v.optional(v.string()),

    // Dev-specific section
    skills: v.array(v.string()), // ["React", "AI", "Next.js"]
    interests: v.array(v.string()), // ["Hackathons", "Open Source"]
    experienceLevel: v.optional(v.string()), // "Beginner" | "Intermediate" | "Advanced"

    // External links
    github: v.optional(v.string()),
    portfolio: v.optional(v.string()),
    linkedin: v.optional(v.string()),

    photos: v.array(v.string()), // storage IDs

    // Location (optional)
    city: v.optional(v.string()),
    country: v.optional(v.string()),

    createdAt: v.number(),
  })
    .index("by_authId", ["authId"])
    .index("by_username", ["username"]),

  // -----------------------------
  // SWIPES
  // -----------------------------
  swipes: defineTable({
    fromUser: v.id("users"),
    toUser: v.id("users"),
    direction: v.union(v.literal("left"), v.literal("right")),
    createdAt: v.number(),
  })
    .index("by_fromUser", ["fromUser"])
    .index("by_toUser", ["toUser"])
    .index("by_both", ["fromUser", "toUser"]),

  // -----------------------------
  // MATCHES
  // -----------------------------
  matches: defineTable({
    user1: v.id("users"),
    user2: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_user1", ["user1"])
    .index("by_user2", ["user2"])
    .index("by_pair", ["user1", "user2"]),

  // -----------------------------
  // OPTIONAL: CHAT MESSAGES
  // -----------------------------
  messages: defineTable({
    matchId: v.id("matches"),
    sender: v.id("users"),
    text: v.string(),
    createdAt: v.number(),
  }).index("by_match", ["matchId"]),

  // -----------------------------
  // OPTIONAL: PROFILE VIEWS
  // -----------------------------
  profileViews: defineTable({
    viewer: v.id("users"),
    viewed: v.id("users"),
    createdAt: v.number(),
  }).index("by_viewed", ["viewed"]),

  // -----------------------------
  // OPTIONAL: SAVED USERS (super-like or bookmark)
  // -----------------------------
  saved: defineTable({
    user: v.id("users"),
    savedUser: v.id("users"),
    createdAt: v.number(),
  }).index("by_user", ["user"]),

  // -----------------------------
  // STORAGE (photos, resume, etc.)
  // -----------------------------
  files: defineTable({
    user: v.id("users"),
    storageId: v.string(),
    type: v.string(), // "photo", "resume"
    createdAt: v.number(),
  }).index("by_user", ["user"]),
});
