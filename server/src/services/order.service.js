// create order
import { db } from "../config/database.js";
import { orders } from "../models/order.model.js";
import { eq } from "drizzle-orm";

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
        dealId: orders.dealId,
        quantity: orders.quantity,
        totalPrice: orders.totalPrice,
        status: orders.status,
        pickupTime: orders.pickupTime,
        specialInstructions: orders.specialInstructions,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(eq(orders.businessId, businessId));

    return ordersList; 
  } catch (error) {
    throw error;
  }
};



   