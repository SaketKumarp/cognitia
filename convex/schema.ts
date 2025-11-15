import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    name: v.string(),
    institute: v.optional(v.string()),
    branch: v.optional(v.string()),
    year: v.optional(v.number()),
    skills: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    verified: v.optional(v.boolean()),
    createdAt: v.number(),
  }).index("by_clerkId", ["clerkUserId"]),

  projects: defineTable({
    title: v.string(),
    imageurl: v.string(),
    description: v.string(),
    tags: v.optional(v.array(v.string())),
    requiredSkills: v.optional(v.array(v.string())),
    authorUserId: v.id("users"), // FIXED
    institute: v.optional(v.string()),
    teamSizeNeeded: v.optional(v.number()),
    createdAt: v.number(),
    status: v.optional(v.string()),
  }).index("by_author", ["authorUserId"]),

  matches: defineTable({
    userId: v.id("users"), // FIXED
    projectId: v.id("projects"),
    direction: v.string(),
    liked: v.boolean(),
    matched: v.optional(v.boolean()),
    createdAt: v.number(),
  }).index("by_user_project", ["userId", "projectId"]),

  conversations: defineTable({
    participantIds: v.array(v.id("users")), // FIXED
    lastMessageAt: v.optional(v.number()),
    createdAt: v.number(),
  }),

  messages: defineTable({
    conversationId: v.id("conversations"),
    fromUserId: v.id("users"), // FIXED
    toUserId: v.id("users"), // FIXED
    text: v.string(),
    createdAt: v.number(),
  }).index("by_conversation", ["conversationId"]),

  endorsements: defineTable({
    fromUserId: v.id("users"), // FIXED
    toUserId: v.id("users"), // FIXED
    skill: v.string(),
    createdAt: v.number(),
  }),

  competitions: defineTable({
    title: v.string(),
    description: v.string(),
    tags: v.optional(v.array(v.string())),
    createdBy: v.id("users"), // FIXED
    createdAt: v.number(),
  }),

  applications: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"), // FIXED
    role: v.optional(v.string()),
    status: v.optional(v.string()),
    createdAt: v.number(),
  }),

  notifications: defineTable({
    userId: v.id("users"), // FIXED
    type: v.string(),
    title: v.string(),
    body: v.optional(v.string()),
    read: v.optional(v.boolean()),
    createdAt: v.number(),
  }),
});
