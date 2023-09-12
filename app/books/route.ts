import { PrismaClient } from "@/prisma/generated/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const { title, content } = await req.json();
    console.log("title: ", title, "content: ", content)
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