// create order
import { db } from "../config/database.js";
import { orders } from "../models/order.model";

export const createOrder = async(orderData)=>{
    try{
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
            pickupTime: orderData.pickupTime
        })
        .returning({
            orderId: orders.orderId,
            totalPrice: orders.totalPrice,
            pickupTime: orders.pickupTime,
            specialInstructions: orders.specialInstructions,
            status: orders.status
        })

        console.log("order created succesfully")
        return newOrder;
        
    }catch(error){
        console.error("failed to create an order");
        throw error;
        
    }

}


  