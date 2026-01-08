import { db } from "../config/database.js";
import { deals } from "../models/deals.model.js";
import { and, eq, lte } from "drizzle-orm";


export async function expireDeals() {
  try {
    const now = new Date();

    const result = await db
      .update(deals)
      .set({
        status: "expired",
        updatedAt: now,
      })
      .where(
        and(
          lte(deals.expiresAt, now),
          eq(deals.status, "active")
        )
      )
      .returning({ id: deals.id });

    if (result.length > 0) {
      console.log(`Expired ${result.length} deal(s) at`, now);
    }
  } catch (error) {
    console.error("Deal expiration failed:", error);
  }
}


export const autoDeleteExpiredDeals = async () => {
  try {
    const now = new Date();

    const result = await db
      .delete(deals)
      .where(
        and(
          lte(deals.expiresAt, now),
          eq(deals.status, "expired")
        )
      )
      .returning({ id: deals.id });

    if (result.length > 0) {
      console.log(`Deleted ${result.length} expired deal(s) at`, now);
    }
  } catch (error) {
    console.error("Expired deal deletion failed:", error);
  }
}

