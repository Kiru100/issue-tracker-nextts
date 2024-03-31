import authOptions from "@/app/auth/authOptions";
import { validation_schema } from "@/app/validation_schema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props{
    params:  {id: string}
}

export async function POST(request: NextRequest, {params}: Props){
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({}, {status: 401});
    const body = await request.json();
    const validation = validation_schema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})

    if(!issue)
        return NextResponse.json({error: "Invalid Issue"}, {status: 404})

    const updatedIssue = await prisma.issue.update(
        {
            where: {
                id: issue.id 
            }, 
            data: {
                title: body.title, description: body.description
            }
        }
    )

    return NextResponse.json(updatedIssue, {status: 200});
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}){
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({}, {status: 401});

    const issue = await prisma.issue.findUnique({where:{ id: parseInt(params.id)}});
    
    if(!issue) return NextResponse.json("Issue cannot be found", {status: 404});
    await prisma.issue.delete({where: {id: parseInt(params.id)}});

    return NextResponse.json({});
}