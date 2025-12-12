import { NextRequest, NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

const IFLO_BASE : string = process.env.IFLO_API_URL!;
const IFLO_API_KEY : string = process.env.IFLO_API_KEY!;

// TODO: I need to figure out how to specify the path dynamically (for now it's just going to clients)

async function handler(req: NextRequest, ctx: { params: { path: string[] } }) {
    const url = `${IFLO_BASE}${req.nextUrl.pathname}${req.nextUrl.search}`;
    const token = await getToken({ req });
    const ifloAccessToken = token?.ifloAccessToken;

    const headers : Record<string, string> = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": IFLO_API_KEY,
    };

    if (ifloAccessToken) {
        headers["Authorization"] = `Bearer ${ifloAccessToken}`;
    }

    const upstream = await fetch(`${IFLO_BASE}clients`, {
        method: req.method,
        headers: headers,
        body: ["GET", "HEAD"].includes(req.method) ? undefined : req.body,
    })

    return new NextResponse(upstream.body, {
        status: upstream.status,
        headers: upstream.headers
    });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;