import bcrypt from 'bcrypt';
import User from '../../../../models/User';
import connectDB from '../../../../lib/mongo';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

const secret = process.env.JWT_SECRET;

export async function POST(req) {
    // Call our database
    await connectDB();
    // Coming from the frontend
    const { email, password } = await req.json();

    try {
        // Ensure the email and password are inputted
        if (!email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        const user = await User.findOne({ email });
        
        // Check if the user exits
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        // If we do find someone with the email address
        // Encrypt the password using bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // Check if the password is correct
        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
        // If the password is correct
        // Create a JWT 
        const jwtSecret = new TextEncoder().encode(secret);
        // Pass a token to the frontend
        const token = await new SignJWT({ userId: user._id })
            .setProtectedHeader({ alg: 'HS256' })
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(jwtSecret);
        
        // Create a response with the token
        const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
            secure: false // Change to true in production
        });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}