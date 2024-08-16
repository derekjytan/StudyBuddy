import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import React from 'react'

const secret = process.env.JWT_SECRET;
const jwtSecret = new TextEncoder().encode(secret);

export async function decrypt(input) {
    const {payload} = await jwtVerify(input, jwtSecret, {
        algorithms: ['HS256'],
    });
    return payload; 
}

export async function getSession() {
    const session = cookies().get('session');
    console.log("penis: ", session)
    var value = '';
    if(session) {
        value = session.value;
    } else {
        value = null;
    }

    if(!value) return null;
    return await decrypt(value);
}

export async function updateSession(request) {
    const session = request.cookies.get('session')?.value;
    if(!session) return;

    const parsed = await decrypt(session);

    exp = new Date(Date.now());
    exp.setMinutes(expires.getMinutes() + 1);
    parsed.expires = exp;

    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires
    });

    return res;
}