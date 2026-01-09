// create order
import { db } from "../config/database.js";
import { orders, ORDER_STATUS } from "../models/order.model.js";
import { eq } from "drizzle-orm";
import { users } from "../models/user.model.js";
import { canTransition } from "../utils/orderTransitions.js";
import { decreaseDealQuantity } from "./deals.service.js";
import { deals } from "../models/deals.model.js";


export const createOrder = async (orderData) => {
  
  const deal = await decreaseDealQuantity(
    orderData.dealId,
    orderData.quantity
  );

  
  const totalPrice = Number(deal.dealPrice) * orderData.quantity;

  const pickupTime =
    orderData.pickupTime &&
    !isNaN(new Date(orderData.pickupTime).getTime())
      ? new Date(orderData.pickupTime)
      : null;

  const [order] = await db
    .insert(orders)
    .values({
      userId: orderData.userId,
      dealId: deal.id,
      businessId: deal.businessId,
      quantity: orderData.quantity,
      totalPrice,
      status: "pending",
      paymentMethod: orderData.paymentMethod,
      specialInstructions: orderData.specialInstructions,
      pickupTime,
    })
    .returning();

  return order;
};



export const getOrderbyBusiness = async (businessId) => {
  try {
    const ordersList = await db
      .select({
        orderId:orders.id,
        userId: orders.userId,
        userName: users.name,
        dealId: orders.dealId,
        dealName: deals.title, 
        quantity: orders.quantity,
        totalPrice: orders.totalPrice,
        status: orders.status,
        pickupTime: orders.pickupTime,
        specialInstructions: orders.specialInstructions,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .leftJoin(deals, eq(orders.dealId, deals.id))
      .where(eq(orders.businessId, businessId));

    return ordersList; 
  } catch (error) {
    throw error;
  }
};
export const getOrderbyUser = async (userId) => {
  try {
    const ordersList = await db
      .select({
        orderId:orders.id,
        userId: orders.userId,
        userName: users.name,
        dealId: orders.dealId,
        dealName: deals.title, 
        quantity: orders.quantity,
        totalPrice: orders.totalPrice,
        status: orders.status,
        pickupTime: orders.pickupTime,
        specialInstructions: orders.specialInstructions,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .leftJoin(deals, eq(orders.dealId, deals.id))
      .where(eq(orders.userId, userId));

    return ordersList; 
  } catch (error) {
    throw error;
  }
};

//order cycles

export async function updateOrderStatus(orderId, nextStatus) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));

  if (!order) throw new Error("Order not found");

  if (!canTransition(order.status, nextStatus)) {
    throw new Error(
      `Invalid transition from ${order.status} to ${nextStatus}`
    );
  }

  const [updatedOrder] = await db
    .update(orders)
    .set({
      status: nextStatus,
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId))
    .returning();

  return updatedOrder;
}


// business actions
export async function confirmOrder(orderId, businessId) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));

  if (!order) throw new Error("Order not found");
  if (order.businessId !== businessId) throw new Error("Unauthorized");

  return updateOrderStatus(orderId, ORDER_STATUS.CONFIRMED);
}

export async function markOrderReady(orderId, businessId) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));

  if (!order) throw new Error("Order not found");
  if (order.businessId !== businessId) throw new Error("Unauthorized");

  return updateOrderStatus(orderId, ORDER_STATUS.READY);
}

// user actions

export async function cancelOrderByUser(orderId, userId) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));

  if (!order) throw new Error("Order not found");
  if (order.userId !== userId) throw new Error("Unauthorized");

  return updateOrderStatus(orderId, ORDER_STATUS.CANCELLED);
}

export async function markOrderCollected(orderId, businessId) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));

  if (!order) throw new Error("Order not found");
  if (order.businessId !== businessId) {
    throw new Error("Unauthorized");
  }

  return updateOrderStatus(orderId, ORDER_STATUS.COLLECTED);
}


   