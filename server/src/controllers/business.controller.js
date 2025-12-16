import { createBusiness } from '../service/business.service.js'
import { registerBusinessSchema } from '../utils/validators.js'
import { formatValidationError } from '../utils/errorHandler.js'


export const registerBusiness = async (req, res, next) => {
  try {
 
    const validationResult = registerBusinessSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { business_name, location, opening_hours } = validationResult.data;
    const user_id = req.user.id;


    const business = await createBusiness({ user_id, business_name, location, opening_hours });

    res.status(201).json({
      message: 'Business registered',
      business: {
        user_id: business.user_id,
        business_name: business.business_name,
        location: business.location,
        opening_hours: business.opening_hours,
        createdAt: business.createdAt,
      },
    });
  } catch (e) {

    if (e.message === 'business already exist') {
      return res.status(409).json({ error: 'Business already exists' });
    }

    next(e);
  }
};



export const fetchBusinessById = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const business = await getBusinessByOwner(user_id);

    res.status(200).json({
      message: 'Business retrieved successfully',
      business,
    });
  } catch (e) {
    console.error(`Error fetching business for user_id ${req.user.id}: ${e.message}`);

    if (e.message === 'Business not found') {
      return res.status(404).json({ error: 'Business not found' });
    }

    next(e);
  }
};
