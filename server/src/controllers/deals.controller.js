import { createDeal } from "../service/deal.service";
import { makeDealSchema } from "../utils/validators.js"
export const makeDeal = async(req, res, next)=>{
    try{
         const validationResult = makeDealSchema.safeParse(req.body);
        
            if (!validationResult.success) {
              return res.status(400).json({
                error: 'Validation failed',
                details: formatValidationError(validationResult.error),
              });
            }
        
            const { title,  description, price,  quantity,  image_url, expires_at } = validationResult.data;
            const user_id = req.user.id;

            

            const business = await getBusinessByOwner(user_id);

                if (!business) {
                return res.status(403).json({
                    error: 'You must register a business before creating deals',
                });
                }

                const deal = await createDeal({
                business_id: business.id,
                title,
                description,
                price,
                quantity,
                image_url,
                expires_at: new Date(expires_at)
                });

                res.status(201).json({
                message: 'Deal created',
                deal: {
                    business_id: deal.business_id,
                    title: deal.title,
                    description: deal.description,
                    price: deal.price,
                    quantity: deal.quantity,
                    image_url: deal.image_url,
                    expires_at: deal.expires_at,
                    createdAt: deal.created_at,
                },
                });
    
        }catch(error){
        console.error("there is a problem creating order in controller")
        next(error)
    }
}