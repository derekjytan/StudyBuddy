import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET() {
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    // Deleting the token from the browser
    cookies().set('session', '', {expires: new Date(0)})
    return response;
}