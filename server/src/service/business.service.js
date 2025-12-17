import { business } from "../models/business.model.js";
import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';

export const createBusiness = async({ user_id, business_name, location, opening_hours})=>{

    try{
       const existingBusiness = await db
      .select()
      .from(business)
      .where(eq(business.user_id, user_id))
      .limit(1);

    if (existingBusiness.length > 0)
      throw new Error('business already exist');

      const [newBusiness] = await db
      .insert(business)
      .values({ 
        user_id, 
        business_name, 
        location, 
        opening_hours,  
      })
      .returning({
        user_id: business.user_id,
        business_name: business.business_name,
        location: business.location,
        opening_hours: business.opening_hours,
        createdAt: business.created_at,   
      });

    return newBusiness;

    }catch(err){
        console.error('error creating business', err)
        throw err

    }
}

export const getBusinessByOwner = async user_id =>{
     try {
    const [bus] = await db
      .select()
      .from(business)
      .where(eq(business.user_id, user_id))
      .limit(1);

    if (!bus) {
      throw new Error('Business not found');
    }

    return bus;
  } catch (e) {
    console.error(`Error getting business by id ${user_id}:`, e);
    throw e;
  }

}
