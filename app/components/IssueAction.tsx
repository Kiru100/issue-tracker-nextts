import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from '../issue/list/IssueStatusFilter'

const IssueAction = () => {
    return (
        <Flex className='mb-5' justify="between">
            <IssueStatusFilter />
            <Button className='p-5'>
                <Link href="/issue/new">New Issue</Link>
            </Button>
        </Flex>
    )
}

export default IssueAction
