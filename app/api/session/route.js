import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getSession();
    const test = {data: session}

    console.log("session: ", session)
    console.log("fines: ", test)

    return NextResponse.json({data: session},{status:200});
}
