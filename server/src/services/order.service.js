// create order
import { db } from "../config/database.js";
import { orders, ORDER_STATUS } from "../models/order.model.js";
import { eq } from "drizzle-orm";
import { users } from "../models/user.model.js";
import { canTransition } from "../utils/orderTransitions.js";

export const createOrder = async(orderData)=>{
    try{
        const pickupTime = orderData.pickupTime && !isNaN(new Date(orderData.pickupTime)
        .getTime())
        ? new Date(orderData.pickupTime)
        : null;


        const [newOrder] = await db
        .insert(orders)
        .values({
            userId: orderData.userId,
            dealId: orderData.dealId,
            businessId: orderData.businessId,
            quantity: orderData.quantity,
            totalPrice: orderData.totalPrice,
            status : "pending",
            specialInstructions: orderData.specialInstructions,
            paymentMethod: orderData.paymentMethod,
            pickupTime: pickupTime

        })
        .returning({
            orderId: orders.id,
            totalPrice: orders.totalPrice,
            pickupTime: orders.pickupTime,
            status: orders.status
        })

        console.log("order created succesfully")
        return newOrder;
        
    }catch(error){
        console.error("failed to create an order");
        throw error;
        
    }

}

export const getOrderbyBusiness = async (businessId) => {
  try {
    const ordersList = await db
      .select({
        userId: orders.userId,
        userName: users.name,
        dealId: orders.dealId,
        quantity: orders.quantity,
        totalPrice: orders.totalPrice,
        status: orders.status,
        pickupTime: orders.pickupTime,
        specialInstructions: orders.specialInstructions,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.businessId, businessId));

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

export async function collectOrder(orderId, userId) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId));

  if (!order) throw new Error("Order not found");
  if (order.userId !== userId) throw new Error("Unauthorized");

  return updateOrderStatus(orderId, ORDER_STATUS.COLLECTED);
}


   