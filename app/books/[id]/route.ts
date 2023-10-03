import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/prisma";

export async function DELETE(req: NextRequest, context: { params: { id: number } }) {
    const id  = +context.params.id;

    const book = await prisma.book.delete({
        where: {
            id
        }
    });
    return NextResponse.json(book)
}