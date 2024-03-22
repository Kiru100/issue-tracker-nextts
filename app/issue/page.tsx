import { Table } from '@radix-ui/themes';
import { IssueAction, StatusBadge }  from '../components';
import prisma from '@/prisma/client';
import Link from '../components/Link'; 

const IssuePage = async () => {
    const issues = await prisma.issue.findMany();

    return (
        <div>
            <IssueAction />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>                 
                    {
                        issues.map(issue => (
                            <Table.Row key={issue.id}>
                                <Table.Cell>
                                    <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                                </Table.Cell>
                                <Table.Cell className='hidden md:table-cell'>
                                    <StatusBadge status={issue.status}/>
                                </Table.Cell>
                                <Table.Cell className='hidden md:table-cell'>
                                    {issue.created_at.toDateString()}
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }               
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default IssuePage;
