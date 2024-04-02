import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import { Metadata } from 'next';

interface Props{
    params: {id: string}
}   

const IssueDetailsPages = async ({params}: Props) => {
    const session = await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}});

    if(!issue) return notFound();

    return (
        <Grid columns={{initial: "1", sm: "5"}} gap="5">
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />      
            </Box>
            {
                session && (
                    <Box>
                        <Flex direction="column" gap="4">
                            <AssigneeSelect issue={issue}/>
                            <EditIssueButton issue_id={issue.id} /> 
                            <DeleteIssueButton issue_id={issue.id}/>
                        </Flex>               
                    </Box>
                )           
            }
        </Grid>
    )
}

export async function generateMetadata({params}: Props){
    const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}});

    return{
        title: issue?.title,
        description: "Details of issue" + issue?.id
    }
}

export default IssueDetailsPages;
