import { NextRequest, NextResponse } from "next/server";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {

    const session = await getServerSession(authOptions);

    try {
        const response = await fetch(process.env.CAMUNDA_URL + `/process-definition/key/${process.env.CAMUNDA_PROCESS_DEFINITION_KEY}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                variables: {
                    user: {
                        type: "String",
                        value: session ? session.user!.id : "Anonymous"
                    }
                }
            })
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}