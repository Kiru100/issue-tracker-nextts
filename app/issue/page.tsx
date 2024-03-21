import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

const IssuePage = () => {
    return (
        <div>
            <Button className='p-5'>
                <Link href="/issue/new">New Issue</Link>
            </Button>
        </div>
    )
}

export default IssuePage;
