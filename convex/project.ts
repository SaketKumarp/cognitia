import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Create project
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
    return await ctx.db.insert("projects", {
      ...args,
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
