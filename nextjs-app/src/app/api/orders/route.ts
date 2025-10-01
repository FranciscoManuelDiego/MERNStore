import { NextRequest, NextResponse } from 'next/server';
import Order from '../../../models/Order';
import User from '../../../models/User';
import connectDB from '../../lib/mongodb';
import { EmailService } from '../../lib/email';
import jwt from 'jsonwebtoken';

// First initialize the email Service
const emailConfig = {
  service: process.env.EMAIL_SERVICE!, // The ! asserts that this env var is defined thus states that it is a string
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!
  },
};

const emailService = new EmailService(emailConfig);

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

    const { items, total, province, city, streetAddress } = await request.json();
    
    // 🔍 DEBUG: Check what address data is actually received
    console.log('Received address data:', {
        province: province,
        city: city,
        streetAddress: streetAddress,
        hasProvince: !!province,
        hasCity: !!city,
        hasStreetAddress: !!streetAddress
    });

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Invalid order data' }, { status: 400 });
    }

    await connectDB();

    // Get user details for the order
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

    console.log('User found:', { name: user.firstName, email: user.email, phone: user.phonenumber }); // Debug

    if (!streetAddress || !province || !city) {
      return NextResponse.json({ message: 'Address information is required' }, { status: 400 });
    }

    // Validate that each item has all required fields
        const validatedItems = items.map((item) => {
            if (!item.productId || !item.name || !item.imageUrl || !item.price || !item.quantity) {
                throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
            }
            return {
                productId: item.productId,
                name: item.name,
                quantity: Number(item.quantity),
                imageUrl: item.imageUrl,
                price: Number(item.price),
            };
        });

    console.log('Validated items:', validatedItems); // Debug

    // Create the order in MongoDB
        const newOrder = new Order({
            userId: user._id,
            customerEmail: user.email,
            imageUrl: user.imageUrl,
            customerName: user.firstName,
            customerPhone: user.phonenumber,
            address: {
                address: streetAddress,  // Match the schema field name
                province: province,      // Now supported by updated schema
                city: city              // Now supported by updated schema
            },
            items: validatedItems,
            total: total,
            status: 'pending'
        });

    // TODO: Save order to MongoDB collection
    console.log('Order created:', newOrder);
    // Save order to DB
    const savedOrder = await newOrder.save();

    // Send confirmation email
    try {
        const emailSent = await emailService.sendOrderConfirmation(savedOrder);
        if (emailSent) {
            console.log('Order confirmation email sent successfully');
        }
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Don't fail the order creation if email fails
        }

    return NextResponse.json({ 
      message: 'Order created successfully', 
      orderId: savedOrder._id,
      order: savedOrder
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
