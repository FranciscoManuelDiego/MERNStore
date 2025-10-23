import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../../models/User';

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'Teléfono es requerido' },
        { status: 400 }
      );
    }

    // Update user phone
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { phonenumber: phone }, // Fixed: use phonenumber field from model
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Teléfono actualizado correctamente',
        user: {
          id: updatedUser._id,
          firstName: updatedUser.firstName,
          surname: updatedUser.surname,
          email: updatedUser.email,
          phonenumber: updatedUser.phonenumber, // Fixed: use phonenumber field
          address: updatedUser.address,
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Phone update error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
