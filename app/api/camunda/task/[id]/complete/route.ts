import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {params}: { params: { id: string } }) {
    // console.log(req)
    // console.log(params)

    const id = params.id;

    try {
        const response = await fetch(process.env.CAMUNDA_URL + `/task/${id}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Response", response)
        return NextResponse.json({});
    } catch (error) {
        console.log("Error", error)
        return NextResponse.error();
    }
}