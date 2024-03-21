import StatusBadge from '@/app/components/StatusBadge'
import TailwindSpinner from '@/app/components/TailwindSpinner'
import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'


interface Props{
    params: {id: string}
}   

const IssueDetailsPages = async ({params}: Props) => {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}})

    if(!issue)
        return notFound();

    return (
        <div>
            <Heading>{issue?.title}</Heading>
            <Flex gap="2" my="2">
                <StatusBadge status={issue.status}/>
                <p>{issue?.created_at.toDateString()}</p>
            </Flex>
            <Card>               
                <p>{issue?.description}</p>
            </Card>         
        </div>
    )
}

export default IssueDetailsPages;
