import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
    // console.log(req)
    // console.log(params)

    const id = params.id;

    try {
        const response = await fetch(process.env.CAMUNDA_URL + `/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Response", response)
        const data = await response.json();
        console.log("Data", data)
        return NextResponse.json(data);
    } catch (error) {
        console.log("Error", error)
        return NextResponse.error();
    }
}