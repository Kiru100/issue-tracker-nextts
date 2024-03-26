import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { validation_schema } from "../../validation_schema";

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = validation_schema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});

    const new_issue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(new_issue, {status: 201});
}
