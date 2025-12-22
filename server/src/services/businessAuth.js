import { business } from '../models/business.model.js';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import {db }  from '../config/database.js';


export const hashPassword = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (e) {
    console.error(`Error hashing the password: ${e}`);
    throw new Error('Error hashing');
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (e) {
    console.error(`Error comparing password: ${e}`);
    throw new Error('Error comparing password');
  }
};

export const createBusiness = async({ name, email, password, phone, phone2, location, openingHours, description })=>{
      try {
    const existingBus = await db
      .select()
      .from(business)
      .where(eq(business.email, email))
      .limit(1);

    if (existingBus.length > 0)
      throw new Error('Business with this email already exists');
    const password_hash = await hashPassword(password);

    
    const [newBusiness] = await db
      .insert(business)
      .values({ 
        name, 
        email, 
        password: password_hash, 
        phone,
        phone2,
        location,
        openingHours,
        description
      })
      .returning({
        id: business.id,
        name: business.name,
        email: business.email,
        phone: business.phone,
        phone2: business.phone2,
        location: business.location,
        openingHours: business.openingHours,
        description: business.description,
        createdAt: business.createdAt,  
        updatedAt: business.updatedAt   
      });

    console.log(`Business ${newBusiness.email} created successfully`);

    return newBusiness;
    
  } catch (e) {
    console.error(`Error creating the Business: ${e}`);
    throw e;
  }

}


export const authenticateBusiness = async ({ email, password }) => {
  try {
    const [existingBus] = await db
      .select()
      .from(business)
      .where(eq(business.email, email))
      .limit(1);

    if (!existingBus) {
      throw new Error('Business not found');
    }

    const isPasswordValid = await comparePassword(
      password,
      existingBus.password
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    console.log(`User ${existingBus.email} authenticated successfully`);
    return {
      id: existingBus.id,
      name: existingBus.name,
      email: existingBus.email,
      phone: existingBus.phone,
      phone2: existingBus.phone2,
      location: existingBus.location,
      openingHours: existingBus.openingHours,
      description: existingBus.description,
      createdAt: existingBus.createdAt,
    };
  } catch (e) {
    console.error(`Error authenticating business: ${e}`);
    throw e;
  }
};