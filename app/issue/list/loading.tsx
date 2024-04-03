import { Flex, Table } from '@radix-ui/themes';
import { IssueAction, Skeleton }  from '../../components';
import React from 'react';

const IssueTableLoading = () => {
    const issues = [1, 2, 3, 4, 5];

    return (    
        <Flex  gap="3">
            <IssueAction/>
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
                            <Table.Row key={issue}>
                                <Table.Cell>
                                    <Skeleton/>
                                </Table.Cell>
                                <Table.Cell className='hidden md:table-cell'>
                                    <Skeleton/>
                                </Table.Cell>
                                <Table.Cell className='hidden md:table-cell'>
                                    <Skeleton/>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }               
                </Table.Body>
            </Table.Root>
        </Flex>
    )
}

export default IssueTableLoading;
