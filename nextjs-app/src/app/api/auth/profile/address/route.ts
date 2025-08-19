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
    const { address } = body;

    if (!address) {
      return NextResponse.json(
        { error: 'Dirección es requerida' },
        { status: 400 }
      );
    }

    // Update user address
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { address },
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
        message: 'Dirección actualizada correctamente',
        user: {
          id: updatedUser._id,
          firstName: updatedUser.firstName,
          surname: updatedUser.surname,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Address update error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
