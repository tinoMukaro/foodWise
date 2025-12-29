import { db } from "../config/database.js";
import { deals } from "../models/deals.model.js";
import { business } from "../models/business.model.js";
import { eq, and, desc } from "drizzle-orm";

export const createDeal = async (dealData) => {
  try {
    const [newDeal] = await db
      .insert(deals)
      .values({
        businessId: dealData.business_id,
        title: dealData.title,
        description: dealData.description,
        originalPrice: dealData.originalPrice,
        dealPrice: dealData.dealPrice,
        quantityTotal: dealData.quantityTotal,
        quantityLeft: dealData.quantityTotal,
        expiresAt: dealData.expiresAt,
        pickupLocation: dealData.pickupLocation,
        imageUrl: dealData.imageUrl,
        status: "active",
      })
      .returning({
        id: deals.id,
        businessId: deals.businessId,
        title: deals.title,
        description: deals.description,
        originalPrice: deals.originalPrice,
        dealPrice: deals.dealPrice,
        quantityTotal: deals.quantityTotal,
        quantityLeft: deals.quantityLeft,
        expiresAt: deals.expiresAt,
        pickupLocation: deals.pickupLocation,
        imageUrl: deals.imageUrl,
        status: deals.status,
        createdAt: deals.createdAt,
      });

    console.log("Deal successfully created");
    return newDeal;
  } catch (error) {
    console.error("Failed to create deal:", error);
    throw error;
  }
};


export const getDealsByBusiness = async (businessId) => {
  try {
    const businessDeals = await db
      .select({
        id: deals.id,
        businessId: deals.businessId,
        title: deals.title,
        description: deals.description,
        originalPrice: deals.originalPrice,
        dealPrice: deals.dealPrice,
        quantityTotal: deals.quantityTotal,
        quantityLeft: deals.quantityLeft,
        expiresAt: deals.expiresAt,
        pickupLocation: deals.pickupLocation,
        imageUrl: deals.imageUrl,
        status: deals.status,
        createdAt: deals.createdAt,
      })
      .from(deals)
      .where(eq(deals.businessId, businessId))
      .orderBy(desc(deals.createdAt));

    return businessDeals;
  } catch (error) {
    console.error("Failed to fetch business deals:", error);
    throw error;
  }
};


export const getDealById = async (id) => {
  try {
    const [deal] = await db
      .select()
      .from(deals)
      .where(eq(deals.id, id));
    
    if (!deal) {
      throw new Error("Deal not found");
    }
    
    return deal;
  } catch (error) {
    console.error(`Failed to get deal ${id}:`, error);
    throw error;
  }
};

export const updateDeal = async (id, businessId, updateData) => {
  try {
    // First verify the deal belongs to the business
    const [existingDeal] = await db
      .select()
      .from(deals)
      .where(
        and(
          eq(deals.id, id),
          eq(deals.businessId, businessId)
        )
      );
    
    if (!existingDeal) {
      throw new Error("Deal not found or unauthorized");
    }
    
    const [updatedDeal] = await db
      .update(deals)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(deals.id, id))
      .returning({
        id: deals.id,
        businessId: deals.businessId,
        title: deals.title,
        description: deals.description,
        originalPrice: deals.originalPrice,
        dealPrice: deals.dealPrice,
        quantityTotal: deals.quantityTotal,
        quantityLeft: deals.quantityLeft,
        expiresAt: deals.expiresAt,
        pickupLocation: deals.pickupLocation,
        imageUrl: deals.imageUrl,
        status: deals.status,
        updatedAt: deals.updatedAt,
      });
    
    console.log(`Deal ${id} successfully updated`);
    return updatedDeal;
  } catch (error) {
    console.error(`Failed to update deal ${id}:`, error);
    throw error;
  }
};

export const deleteDeal = async (id, businessId) => {
  try {
    // First verify the deal belongs to the business
    const [existingDeal] = await db
      .select()
      .from(deals)
      .where(
        and(
          eq(deals.id, id),
          eq(deals.businessId, businessId)
        )
      );
    
    if (!existingDeal) {
      throw new Error("Deal not found or unauthorized");
    }
    
    // Soft delete by updating status
    const [deletedDeal] = await db
      .update(deals)
      .set({
        status: "deleted",
        updatedAt: new Date(),
      })
      .where(eq(deals.id, id))
      .returning({
        id: deals.id,
        status: deals.status,
      });
    
    console.log(`Deal ${id} successfully deleted`);
    return deletedDeal;
    
    // OR for hard delete:
    // const [deletedDeal] = await db
    //   .delete(deals)
    //   .where(eq(deals.id, id))
    //   .returning({ id: deals.id });
    
  } catch (error) {
    console.error(`Failed to delete deal ${id}:`, error);
    throw error;
  }
};

export const updateDealStatus = async (id, businessId, status) => {
  try {
    const [updatedDeal] = await db
      .update(deals)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(deals.id, id),
          eq(deals.businessId, businessId)
        )
      )
      .returning({
        id: deals.id,
        status: deals.status,
      });
    
    if (!updatedDeal) {
      throw new Error("Deal not found or unauthorized");
    }
    
    return updatedDeal;
  } catch (error) {
    console.error(`Failed to update status for deal ${id}:`, error);
    throw error;
  }
};

export const getAllActiveDeals = async () => {
  try {
    const activeDeals = await db
      .select({
        id: deals.id,
        businessId: deals.businessId,
        businessName: business.name,
        title: deals.title,
        description: deals.description,
        originalPrice: deals.originalPrice,
        dealPrice: deals.dealPrice,
        quantityTotal: deals.quantityTotal,
        quantityLeft: deals.quantityLeft,
        expiresAt: deals.expiresAt,
        pickupLocation: deals.pickupLocation,
        imageUrl: deals.imageUrl,
        status: deals.status,
        createdAt: deals.createdAt,
      })
      .from(deals)
      .leftJoin(business, eq(deals.businessId, business.id))
      .where(eq(deals.status, 'active'))
      .orderBy(desc(deals.createdAt));

    return activeDeals;
  } catch (error) {
    console.error("Failed to fetch active deals:", error);
    throw error;
  }
};