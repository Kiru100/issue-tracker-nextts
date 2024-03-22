import { StatusBadge } from '@/app/components';
import { Card, Flex, Grid, Heading, Box, Button } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from 'next/link';

interface Props{
    params: {id: string}
}   

const IssueDetailsPages = async ({params}: Props) => {
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}});

    if(!issue) return notFound();

    return (
        <Grid columns={{initial: "1", md: "2"}} gap="5">
            <Box>
                <Heading>{issue?.title}</Heading>
                <Flex gap="2" my="2">
                    <StatusBadge status={issue.status}/>
                    <p>{issue?.created_at.toDateString()}</p>
                </Flex>
                <Card className='prose' mt="4">  
                    <ReactMarkdown>{issue?.description}</ReactMarkdown>             
                </Card>         
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon/>
                    <Link href={`/issues/${issue.id}/edit`}></Link> Edit Issue
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailsPages;
