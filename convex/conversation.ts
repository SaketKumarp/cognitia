import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create conversation between two users
export const createConversation = mutation({
  args: {
    userA: v.id("users"),
    userB: v.id("users"),
  },
  handler: async (ctx, { userA, userB }) => {
    const existing = await ctx.db.query("conversations").collect();

    const match = existing.find(
      (c) =>
        c.participantIds.includes(userA) && c.participantIds.includes(userB)
    );

    if (match) return match._id;

    return await ctx.db.insert("conversations", {
      participantIds: [userA, userB],
      createdAt: Date.now(),
      lastMessageAt: Date.now(),
    });
  },
});

// Get all conversations for a user
export const getMyConversations = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("conversations")
      .collect()
      .then((list) => list.filter((c) => c.participantIds.includes(userId)));
  },
});
