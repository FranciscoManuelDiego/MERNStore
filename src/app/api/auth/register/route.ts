import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { firstName, surname, email, password, province, city, streetAddress, phonenumber } = body;

    // Validation
    if (!firstName || !surname || !email || !password || !streetAddress || !phonenumber || !province || !city) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben estar completos' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 4) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 4 caracteres' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const newUser = new User({
      firstName,
      surname,
      email,
      password: hashedPassword,
      phonenumber: phonenumber || '',
      province: body.province || '',
      city: body.city || '',
      streetAddress: streetAddress || '',
    });
    
    await newUser.save();

    // Return success (don't include password)
    const userResponse = {
      id: newUser._id,
      firstName: newUser.firstName,
      surname: newUser.surname,
      email: newUser.email,
      phonenumber: newUser.phonenumber,
      province: newUser.province,
      city: newUser.city,
      streetAddress: newUser.streetAddress,
    };

    return NextResponse.json(
      { 
        message: 'Usuario registrado exitosamente',
        user: userResponse 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error:', error);
    
    // Handle MongoDB duplicate key error
    if (error instanceof Error && error.message.includes("duplicate key error")) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
