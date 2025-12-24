import {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  updateDealStatus,
} from "../services/deals.service.js";
import {
  createDealSchema,
  updateDealSchema,
  statusSchema,
} from "../validations/deals.validation.js";
import { formatValidationError } from "../utils/format.js";

export const create_deal = async (req, res, next) => {
  try {
    const validationResult = createDealSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: formatValidationError(validationResult.error),
      });
    }

    const {
      title,
      description,
      originalPrice,
      dealPrice,
      quantityTotal,
      expiresAt,
      pickupLocation,
      imageUrl,
    } = validationResult.data;
    
    const business_id = req.business.business_id;
    
    const newDeal = await createDeal({
      business_id,
      title,
      description,
      originalPrice,
      dealPrice,
      quantityTotal,
      expiresAt,
      pickupLocation,
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Deal created successfully",
      data: newDeal,
    });
  } catch (error) {
    console.error("Error creating deal:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create deal",
    });
  }
};

export const get_all_deals = async (req, res, next) => {
  try {
    const { businessId, status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const filters = {
      businessId: businessId ? parseInt(businessId) : undefined,
      status,
      limit: parseInt(limit),
      offset,
    };
    
    const deals = await getAllDeals(filters);
    
    return res.status(200).json({
      success: true,
      data: deals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        count: deals.length,
      },
    });
  } catch (error) {
    console.error("Error getting deals:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get deals",
    });
  }
};

export const get_deal_by_id = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deal = await getDealById(parseInt(id));
    
    return res.status(200).json({
      success: true,
      data: deal,
    });
  } catch (error) {
    console.error("Error getting deal:", error);
    if (error.message === "Deal not found") {
      return res.status(404).json({
        success: false,
        message: "Deal not found",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get deal",
    });
  }
};

export const update_deal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const businessId = req.business.business_id;
    
    const validationResult = updateDealSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: formatValidationError(validationResult.error),
      });
    }
    
    const updateData = validationResult.data;
    
    // Prevent updating certain fields directly
    delete updateData.id;
    delete updateData.businessId;
    delete updateData.createdAt;
    
    const updatedDeal = await updateDeal(parseInt(id), businessId, updateData);
    
    return res.status(200).json({
      success: true,
      message: "Deal updated successfully",
      data: updatedDeal,
    });
  } catch (error) {
    console.error("Error updating deal:", error);
    if (error.message === "Deal not found or unauthorized") {
      return res.status(404).json({
        success: false,
        message: "Deal not found or you don't have permission to update it",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update deal",
    });
  }
};

export const delete_deal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const businessId = req.business.business_id;
    
    const deletedDeal = await deleteDeal(parseInt(id), businessId);
    
    return res.status(200).json({
      success: true,
      message: "Deal deleted successfully",
      data: deletedDeal,
    });
  } catch (error) {
    console.error("Error deleting deal:", error);
    if (error.message === "Deal not found or unauthorized") {
      return res.status(404).json({
        success: false,
        message: "Deal not found or you don't have permission to delete it",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete deal",
    });
  }
};

export const update_deal_status = async (req, res, next) => {
  try {
    const { id } = req.params;
    const businessId = req.business.business_id;
    
    const validationResult = statusSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: formatValidationError(validationResult.error),
      });
    }
    
    const { status } = validationResult.data;
    
    const updatedDeal = await updateDealStatus(parseInt(id), businessId, status);
    
    return res.status(200).json({
      success: true,
      message: "Deal status updated successfully",
      data: updatedDeal,
    });
  } catch (error) {
    console.error("Error updating deal status:", error);
    if (error.message === "Deal not found or unauthorized") {
      return res.status(404).json({
        success: false,
        message: "Deal not found or you don't have permission to update it",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update deal status",
    });
  }
};