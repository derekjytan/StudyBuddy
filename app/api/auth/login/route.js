import bcrypt from 'bcrypt';
import User from '../../../../models/User';
import connectDB from '../../../../lib/mongo';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

const secret = process.env.JWT_SECRET;
const jwtSecret = new TextEncoder().encode(secret);

export async function encrypt(payload) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })   
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(jwtSecret);
}

export async function POST(req) {
    // Call our database
    await connectDB();
    // Coming from the frontend
    const { email, password } = await req.json();
    const user = {email, password}

    console.log(user.email)
    console.log(user.password)

    try {
        // Ensure the email and password are inputted
        if (!email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        const user = await User.findOne({ email });
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
        const expires = new Date(Date.now())
        expires.setMinutes(expires.getMinutes() + 5)
        const session = await encrypt({user, expires})
        
        cookies().set('session', session, {expires, httpOnly: true});

        // Create a response with the token
        const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
        // response.cookies.set({
        //     name: 'token',
        //     value: token,
        //     httpOnly: true,
        //     maxAge: 60 * 60,
        //     sameSite: 'strict',
        //     path: '/',
        //     secure: false // Change to true in production
        // });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}