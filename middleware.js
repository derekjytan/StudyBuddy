// import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { updateSession } from "./lib/session";
// import dotenv from 'dotenv';

// dotenv.config( { path: './.env' } );

// const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// export async function middleware(req, res) {
//     const path = req.nextUrl.pathname;
//     const isPublicPath = path === '/' || path === '/register';
//     const token = req.cookies.get('token')?.value;

//     if (!token && !isPublicPath) {
//         return NextResponse.redirect(new URL('/', req.url));
//     } else if (token) {
//         try {
//         const { paylod } = await jwtVerify(token, secret);
//         const tokenExpiry = new Date(paylod.exp * 1000);
//         if (tokenExpiry <= new Date()) {
//             return NextResponse.redirect(new URL('/', req.url));
//         }
//         if (isPublicPath) {
//             return NextResponse.next();
//         }
//         } catch (error) {
//             return NextResponse.redirect(new URL('/', req.url));
//         }   
//     }
//     return NextResponse.next();
// }

// // Define which routes should trigger the middleware
// export const config = {
//     matcher: ['/api/auth/:path*'],
// }



// export { default } from "next-auth/middleware";

export async function middleware(request) {
    console.log("fire")
    return await updateSession(request)
}

export const config = { matcher: ["/dashboard"] };