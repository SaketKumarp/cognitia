// convex/swipes.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// SWIPE LEFT/RIGHT
export const swipe = mutation({
  args: {
    fromUser: v.id("users"),
    toUser: v.id("users"),
    direction: v.union(v.literal("left"), v.literal("right")),
  },
  handler: async (ctx, { fromUser, toUser, direction }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("unauthorized");
    // Record swipe
    await ctx.db.insert("swipes", {
      fromUser,
      toUser,
      direction,
      createdAt: Date.now(),
    });

    // Only right-swipes can create matches
    if (direction === "left") return { matched: false };

    // Check if TO USER already swiped right on FROM USER
    const reverseSwipe = await ctx.db
      .query("swipes")
      .withIndex("by_both", (q) =>
        q.eq("fromUser", toUser).eq("toUser", fromUser)
      )
      .filter((q) => q.eq(q.field("direction"), "right"))
      .unique();

    if (reverseSwipe) {
      // MATCH EXISTS? Prevent duplicates
      const existingMatch = await ctx.db
        .query("matches")
        .withIndex("by_pair", (q) =>
          q.eq("user1", fromUser).eq("user2", toUser)
        )
        .unique();

      if (!existingMatch) {
        await ctx.db.insert("matches", {
          user1: fromUser,
          user2: toUser,
          createdAt: Date.now(),
        });
      }

      return { matched: true };
    }

    return { matched: false };
  },
});
