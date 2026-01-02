import { createOrder } from "../services/order.service";
import { createOrderSchema } from "../validations/order.validations";
import { formatValidationError } from "../utils/format";

export const create_order = async (req, res) => {
  try {
    const validationResult = createOrderSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: formatValidationError(validationResult.error),
      });
    }

    const {
      dealId,
      quantity,
      paymentMethod,
      pickupTime,
      specialInstructions,
    } = validationResult.data;

    
    const userId = req.user.id;

    
    const deal = await getDealById(dealId);

    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    
    const businessId = deal.businessId;
    const totalPrice = deal.price * quantity;

    const order = await createOrder({
      userId,
      dealId,
      businessId,
      quantity,
      totalPrice,
      paymentMethod,
      pickupTime,
      specialInstructions,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("Create order failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

