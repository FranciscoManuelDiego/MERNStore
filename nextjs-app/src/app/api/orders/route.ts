import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    // Get the JWT token from cookies
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    // Verify the token
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload & { userId: string };
      userId = decoded.userId;
    } catch {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const { items, total } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Invalid order data' }, { status: 400 });
    }

    await connectDB();

    // Here you would typically save the order to your database
    // For now, we'll just return a success response
    const order = {
      _id: new Date().getTime().toString(), // Simple ID generation
      userId,
      items,
      total,
      status: 'pending',
      createdAt: new Date(),
    };

    // TODO: Save order to MongoDB collection
    console.log('Order created:', order);

    return NextResponse.json({ 
      message: 'Order created successfully', 
      orderId: order._id 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}
