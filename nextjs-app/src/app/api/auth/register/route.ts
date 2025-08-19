import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { firstName, surname, email, password, address, phone } = body;

    // Validation
    if (!firstName || !surname || !email || !password) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben estar completos' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe con este email' },
        { status: 409 }
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
      phone: phone || '',
      address: address || '',
    });
    
    await newUser.save();

    // Return success (don't include password)
    const userResponse = {
      id: newUser._id,
      firstName: newUser.firstName,
      surname: newUser.surname,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
    };

    return NextResponse.json(
      { 
        message: 'Usuario registrado exitosamente',
        user: userResponse 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
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
