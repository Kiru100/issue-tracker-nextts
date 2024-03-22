import StatusBadge from '@/app/components/StatusBadge';
import { Box, Card, Flex, Heading } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
