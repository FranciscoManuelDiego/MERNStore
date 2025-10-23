import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookieOptions } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = NextResponse.json(
      { message: 'Logout exitoso' },
      { status: 200 }
    );

    // Clear the authentication cookie
    response.cookies.set('token', '', clearAuthCookieOptions);

    return response;

  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
