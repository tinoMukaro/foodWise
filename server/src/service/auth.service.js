import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';
import { users } from '../models/user.model.js';

export const hashPassword = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (e) {
    throw new Error('Error hashing');
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (e) {
    throw new Error('Error comparing password');
  }
};

export const createUser = async ({ name, email, password,phone, role = 'user' }) => {
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
        password_hash: password_hash, 
        phone,
        role: role || 'user'  
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        role: users.role,
        createdAt: users.created_at,  
        updatedAt: users.updated_at   
      });

    return newUser;
  } catch (e) {
    console.error("error creating user")
    throw e;
  }
};

export const authenticateUser = async ({ email, password }) => {
  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password_hash
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    
    return {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      created_at: existingUser.created_at,
    };
  } catch (e) {
    console.error(`Error authenticating user: ${e}`);
    throw e;
  }
};
