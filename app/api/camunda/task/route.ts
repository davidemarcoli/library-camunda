import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(process.env.CAMUNDA_URL + `/task`, {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: "no-store"
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}