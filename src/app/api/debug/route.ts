import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const debug = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
      mongoUriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
      jwtSecretLength: process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0,
      // Never log actual values, just check if they exist
      envVars: {
        MONGODB_URI: process.env.MONGODB_URI ? 'SET' : 'MISSING',
        JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'MISSING',
        NODE_ENV: process.env.NODE_ENV || 'undefined',
        EMAIL_SERVICE: process.env.EMAIL_SERVICE ? 'SET' : 'MISSING',
        SMTP_HOST: process.env.SMTP_HOST ? 'SET' : 'MISSING',
      }
    };

    return NextResponse.json({ 
      status: 'debug',
      debug
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Debug check failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}