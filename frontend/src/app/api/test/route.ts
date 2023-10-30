import {NextRequest, NextResponse} from "next/server";

export default function GET(req: NextRequest) {
    console.log("Hello World")
    return NextResponse.json({});
}