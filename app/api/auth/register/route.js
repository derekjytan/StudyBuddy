import bcrypt from 'bcrypt';
import User from '../../../../models/User';
import connectDB from '../../../../lib/mongo';
import { NextResponse } from 'next/server';

export async function POST(req) {
    console.log('Register route hit');
    // Call our database
    await connectDB();

    try {
        // Coming from the frontend
        const { username, email, password } = await req.json();
        console.log('Received:', { username, email, password });
        // Ensure the email and password are inputted
        if (!username || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        
        // Email validation using regex
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        // }

        // Check if there is a user with that email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists, please login!' }, { status: 409 });
        }

        // Not an existing user
        // Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        await newUser.save();
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}