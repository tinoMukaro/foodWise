import { createOrder, getOrderbyBusiness, getOrderbyUser } from "../services/order.service.js";
import { createOrderSchema } from "../validations/order.validations.js";
import { formatValidationError } from "../utils/format.js";
import { getDealById } from '../services/deals.service.js'
import {confirmOrder,markOrderReady,cancelOrderByUser,markOrderCollected } from "../services/order.service.js";

export const create_order = async (req, res) => {
  try {
    const validationResult = createOrderSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: formatValidationError(validationResult.error),
      });
    }

    const userId = req.user.id;

    const order = await createOrder({
      userId,
      ...validationResult.data,
    });

    return res.status(201).json(order);
  } catch (error) {
    if (error.message.includes("quantity")) {
      return res.status(400).json({ error: error.message });
    }

    console.error("Create order failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getOrder_Business = async(req,res)=>{
  try{
    const businessId = req.business.business_id;

    const orders = await getOrderbyBusiness(businessId);
    
        return res.status(200).json({
          success: true,
          data: orders,
        });
      } catch (error) {
        console.error("Error fetching Orders:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch Orders",
        });
    }
};


export const getOrder_User = async(req,res)=>{
  try{
    const userId = req.user.id;

    const orders = await getOrderbyUser(userId);
    
        return res.status(200).json({
          success: true,
          data: orders,
        });
      } catch (error) {
        console.error("Error fetching Orders:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch Orders",
        });
    }
};

//order cycles


//busines
export async function confirmOrderController(req, res) {
  try {
    const { orderId } = req.params;
     const businessId = req.business.business_id;

    const order = await confirmOrder(Number(orderId), businessId);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function markReadyController(req, res) {
  try {
    const { orderId } = req.params;
     const businessId = req.business.business_id;

    const order = await markOrderReady(Number(orderId), businessId);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export async function collectOrderController(req, res) {
  try {
    const { orderId } = req.params;
    const businessId = req.business.business_id;
    

    const order = await markOrderCollected(
      Number(orderId),
      businessId
    );

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
//user
export async function cancelOrderController(req, res) {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await cancelOrderByUser(Number(orderId), userId);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


