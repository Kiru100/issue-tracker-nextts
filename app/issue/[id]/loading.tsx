import Skeleton from '@/app/components/Skeleton';
import { Box, Card, Flex, Heading } from '@radix-ui/themes';

const IssueDetailsLoadingPage = () => {
	return (
		<Box className='max-w-xl'>
            <Heading><Skeleton/></Heading>
            <Flex gap="2" my="2">
				<Skeleton width="5rem"/>
                <Skeleton width="8rem"/>
            </Flex>
            <Card className='prose' mt="4">  
				<Skeleton count={3}/>           
            </Card>         
        </Box>
	)
}

export default IssueDetailsLoadingPage;
