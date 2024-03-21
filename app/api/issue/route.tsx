import prisma from "@/prisma/client";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(1, "Title is required.").max(255),
    description: z.string().min(1, "Description is required.")
})

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});

    const new_issue = await prisma.issue.create({
        data:{
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(new_issue, {status: 201})
}