import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const response = await fetch(process.env.CAMUNDA_URL + `/process-definition/key/${process.env.CAMUNDA_PROCESS_DEFINITION_KEY}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}