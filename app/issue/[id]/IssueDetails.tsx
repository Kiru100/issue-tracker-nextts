import { StatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';


const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
        <Heading>{issue?.title}</Heading>
        <Flex gap="2" my="2">
            <StatusBadge status={issue.status}/>
            <p>{issue?.created_at.toDateString()}</p>
        </Flex>
        <Card className='prose max-w-full' mt="4">  
            <ReactMarkdown>{issue?.description}</ReactMarkdown>             
        </Card> 
    </>
  )
}

export default IssueDetails;
