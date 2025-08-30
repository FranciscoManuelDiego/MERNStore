import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// Types
export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Generate JWT token
export function generateToken(payload: { userId: string; email: string }): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

// Extract token from request cookies
export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get('token')?.value || null;
}

// Extract token from server-side cookies
export async function getTokenFromServerCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

// Verify user from request
export async function getUserFromRequest(request: NextRequest): Promise<JWTPayload | null> {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return null;
    
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

// Verify user from server-side cookies
export async function getUserFromServerCookies(): Promise<JWTPayload | null> {
  try {
    const token = await getTokenFromServerCookies();
    if (!token) return null;
    
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}

// Check if user is authenticated (for middleware)
export function isAuthenticated(request: NextRequest): boolean {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return false;
    
    verifyToken(token);
    return true;
  } catch (error) {
    return false;
  }
}

// Set authentication cookie options
export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  path: '/',
};

// Clear authentication cookie options
export const clearAuthCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 0,
  path: '/',
};
