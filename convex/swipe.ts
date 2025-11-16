import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const swipe = mutation({
  args: {
    fromUser: v.id("users"),
    toUser: v.id("users"),
    direction: v.union(v.literal("left"), v.literal("right")),
  },

  handler: async (ctx, { fromUser, toUser, direction }) => {
    if (fromUser === toUser) {
      throw new Error("Can't swipe yourself");
    }

    // save swipe
    await ctx.db.insert("swipes", {
      fromUser,
      toUser,
      direction,
      createdAt: Date.now(),
    });

    if (direction === "left") return { matched: false };

    // check reverse swipe
    const reverse = await ctx.db
      .query("swipes")
      .withIndex("by_both", (q) =>
        q.eq("fromUser", toUser).eq("toUser", fromUser)
      )
      .filter((q) => q.eq(q.field("direction"), "right"))
      .unique();

    if (reverse) {
      // insert match if not exists
      const existing = await ctx.db
        .query("matches")
        .withIndex("by_pair", (q) =>
          q.eq("user1", fromUser).eq("user2", toUser)
        )
        .unique();

      if (!existing) {
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
