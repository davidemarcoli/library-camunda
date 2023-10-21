import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
    // console.log(req)
    // console.log(params)

    const id = params.id;

    try {
        const response = await fetch(process.env.CAMUNDA_URL + `/process-instance/${id}`, {
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