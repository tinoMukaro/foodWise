
import { signupSchema, signInSchema } from '../validations/businessAuth.validation.js';
import { formatValidationError } from '../utils/format.js';
import { createBusiness, authenticateBusiness } from '../services/businessAuth.js';
import { jwttoken } from '../utils/jwt.js';
import { cookies } from '../utils/cookies.js';

export const signup = async (req, res, next) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationError(validationResult.error),
      });
    }

    const { name, type, email, password, phone, phone2, location, openingHours, description } = validationResult.data;

    const Business = await createBusiness({ name, type, email, password, phone, phone2, location, openingHours, description });

    const token = jwttoken.sign({
      id: Business.id,
      name: Business.name,
      email: Business.email,
      role: 'business',
    });

    cookies.set(res, 'token', token);

    console.log(`Business registered successfully: ${email}`);
    res.status(201).json({
      message: 'Business registered',
      Business: {
        id: Business.id,
        name: Business.name,
        email: Business.email,
        role: 'business',
      },
    });
  } catch (e) {
    console.error('Signup error', e);

    if (e.message === 'Business with this email already exists') {
      return res.status(409).json({ error: 'Email already exist' });
    }

    next(e);
  }
};

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

    const Business = await authenticateBusiness({ email, password });

    const token = jwttoken.sign({
      id: Business.id,
      name: Business.name,
      email: Business.email,
      role: 'business',
    });

    cookies.set(res, 'token', token);

    console.log(`Business signed in successfully: ${email}`);
    res.status(200).json({
      message: 'Business signed in successfully',
      Business: {
        id: Business.id,
        name: Business.name,
        email: Business.email,
        role: 'business',
      },
    });
  } catch (e) {
    console.error('Sign in error', e);

    if (e.message === 'Business not found' || e.message === 'Invalid password') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    next(e);
  }
};

export const signOut = async (req, res, next) => {
  try {
    cookies.clear(res, 'token');

    console.log(' youve signed out successfully');
    res.status(200).json({
      message: 'youve signed out successfully',
    });
  } catch (e) {
    console.error('Sign out error', e);
    next(e);
  }
};

