import { NextRequest } from "next/server";

export async function GET() {
    const response = NextRequest.json({ message: 'Logout successful' }, { status: 200 });
    // Deleting the token from the browser
    response.cookies.delete('token', {
        path: '/',
        httpOnly: true,
        secure: false
    });
    return response;
}