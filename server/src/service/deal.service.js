import { deals } from "../models/deals.model";

export const createDeal = async({ business_id, title,  description, price,  quantity,  image_url, expires_at })=>{
    try{
       const [newDeal] = await db
       .insert(deals)
       .values({
         business_id,
         title,
         description, 
         price,
         quantity, 
         image_url,
         expires_at
       })
       .returning({
        business_id :deals.business_id,
         title: deals.title,
         description: deals.description,
         price: deals.price,
         quantity: deals.quantity,
         image_url: deals.image_url,
         expires_at: deals.expires_at,
         createdAt: deals.created_at
       })
       return newDeal;

    }catch(error){
        console.error('failed to create deal', error)
        throw error;
    }
}