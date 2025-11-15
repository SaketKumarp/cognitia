// convex/matches.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getMatches = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("unauthorized");
    const matches = await ctx.db
      .query("matches")
      .withIndex("by_user1", (q) => q.eq("user1", args.userId))
      .collect();

    const reverseMatches = await ctx.db
      .query("matches")
      .withIndex("by_user2", (q) => q.eq("user2", args.userId))
      .collect();

    const combined = [...matches, ...reverseMatches];

    // Attach matched user details
    return Promise.all(
      combined.map(async (m) => {
        const otherUser = m.user1 === args.userId ? m.user2 : m.user1;
        const userData = await ctx.db.get(otherUser);
        return { match: m, user: userData };
      })
    );
  },
});
