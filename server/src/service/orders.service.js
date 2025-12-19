import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { orders } from "../models/orders.model.js";
import { deals } from "../models/deals.model.js";

export const getOrdersForBusiness = async business_id => {
  try {
    const results = await db
      .select({
        order_id: orders.id,
        order_status: orders.status,
        payment_method: orders.payment_method,
        order_created_at: orders.created_at,
        deal_id: deals.id,
        deal_title: deals.title,
        deal_price: deals.price,
      })
      .from(orders)
      .innerJoin(deals, eq(orders.deal_id, deals.id))
      .where(eq(deals.business_id, business_id));

    return results;
  } catch (error) {
    console.error("failed to fetch orders for business", error);
    throw error;
  }
};
