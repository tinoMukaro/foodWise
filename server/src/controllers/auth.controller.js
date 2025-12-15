import { formatValidationError } from '../utils/errorHandler.js'
import { signUpSchema, signInSchema } from '../utils/validators.js'
import { createUser, authenticateUser } from '../service/auth.service.js'
import { jwttoken } from '../utils/jwt.js'
import { cookie } from '../utils/cookies.js'

export const signUp = async(req,res,next)=>{
    try{
        const validationResult = signUpSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { name, email, password,phone, role } = validationResult.data;

    const user = await createUser({ name, email, password,phone, role });

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
      phone: user.phone
    });

    cookie.set(res, 'token', token);

    
    res.status(201).json({
      message: 'User registered',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      },
    });


    }catch(e){
        if(e.message === 'user with this email already exists'){
            return res.status(409).json({error: 'email already exist' });
        }
        next(e)
    }
}

export const signIn = async (req, res, next) => {
  try {
    const validationResult = signInSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { email, password } = validationResult.data;

    const user = await authenticateUser({ email, password });

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    cookie.set(res, 'token', token);

    
    res.status(200).json({
      message: 'User signed in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    console.error("sign in error", e)

    if (e.message === 'User not found' || e.message === 'Invalid password') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    next(e);
  }
};

export const signOut = async (req, res, next) => {
  try {
    cookie.clear(res, 'token');

    res.status(200).json({
      message: 'User signed out successfully',
    });
  } catch (e) {
    next(e);
  }
};
