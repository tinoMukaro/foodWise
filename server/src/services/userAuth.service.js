import { users } from '../models/user.model.js';
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

export const createUser = async({ name, email, password, role = 'user' })=>{
      try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0)
      throw new Error('User with this email already exists');

    const password_hash = await hashPassword(password);

    
    const [newUser] = await db
      .insert(users)
      .values({ 
        name, 
        email, 
        password: password_hash, 
        role: role || 'user'  
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,  
        updatedAt: users.updatedAt   
      });

    console.log(`User ${newUser.email} created successfully`);

    return newUser;
    
  } catch (e) {
    console.error(`Error creating the user: ${e}`);
    throw e;
  }

}