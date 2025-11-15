import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Create project

const images = [
  "/placeholder/1.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
  "/placeholder/10.svg",
];

export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    tags: v.optional(v.array(v.string())),
    requiredSkills: v.optional(v.array(v.string())),
    authorUserId: v.id("users"),
    institute: v.optional(v.string()),
    teamSizeNeeded: v.optional(v.number()),
  },

  handler: async (ctx, args) => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    return await ctx.db.insert("projects", {
      ...args,
      imageurl: randomImage,
      status: "open",
      createdAt: Date.now(),
    });
  },
});

// Get all projects
export const getAllProjects = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

// Get project by ID
export const getProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    return await ctx.db.get(projectId);
  },
});

// Search projects
export const searchProjects = query({
  args: { query: v.string() },
  handler: async (ctx, { query }) => {
    const q = query.toLowerCase();
    const all = await ctx.db.query("projects").collect();

    return all.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  },
});
