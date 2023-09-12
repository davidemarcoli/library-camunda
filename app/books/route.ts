import {NextRequest, NextResponse} from "next/server";

import { prisma } from "@/prisma/prisma";

export async function POST(req: NextRequest) {
    const { title, content } = await req.json();
    const newBook = await prisma.book.create({
        data: {
            title,
            content
        }
    });

    return NextResponse.json(newBook)
}

export async function GET() {
    const books = await prisma.book.findMany();
    return NextResponse.json(books)
}