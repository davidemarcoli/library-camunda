import {NextRequest, NextResponse} from "next/server";

import { PrismaClient } from "@/prisma/generated/client";
const prisma = new PrismaClient()

export async function DELETE(req: NextRequest, context: { params: { id: number } }) {
    // how to get id from req path
    console.log(context.params);
    console.log(context.params.id);

    const id  = +context.params.id;

    console.log("id: ", id)
    console.log(typeof id)

    const book = await prisma.book.delete({
        where: {
            id
        }
    });
    return NextResponse.json(book)
}