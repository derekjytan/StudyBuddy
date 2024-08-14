import User from "@/models/User";
import connectDB from "@/lib/mongo";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function getUserData(req) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = req.cookies.get('token')?.value || '';
    console.log("Received JWT Token:", token); // Log the token for inspection
    try {
        const { payload } = await jwtVerify(token, secret);
        console.log("User data", payload.userId);
        return payload.userId;
    } catch (error) {
        console.error("Error getting user data", error);
        return NextResponse.json({ message: 'Error getting user data' }, { status: 500 });
    }
}

export async function GET(req) {
    await connectDB();
    const userId = await getUserData(req);

    // Check with our database to see if the user exists
    try {
        const user = await User.findById(userId).select('username');
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error getting user data", error);
        return NextResponse.json({ message: 'Error getting user data' }, { status: 500 });
    }
}
