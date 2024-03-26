"use client";

import { TailwindSpinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DeleteIssueButton = ({issue_id}: {issue_id: number}) => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [is_deleting, setDeleting] = useState(false);

	const handleDeleteIssue = async () => {
		try {
			setDeleting(true);
			await axios.delete(`/api/issue/${issue_id}`);
			router.push("/issue");
			router.refresh();	
			setError(false);	
		} catch (error) {
			setDeleting(false);
			setError(true);
		}
	}

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red" disabled={is_deleting}>
						Delete Issue
						{ is_deleting && <TailwindSpinner />}					
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content >
					<AlertDialog.Title>Confirm Delete</AlertDialog.Title>
					<AlertDialog.Description size="2">
						Are you sure you want to delete this issue? Wala nang balikan to pag nag confirm ka na bahala ka.
					</AlertDialog.Description>
					<Flex mt="4" gap="3" justify="end">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">Cancel</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button variant="solid" color="red" onClick={handleDeleteIssue}>Delete Issue</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>				
					<AlertDialog.Description size="2">
						This issue could not be deleted hahahah bala ka na sa buhay mo.
					</AlertDialog.Description>
					<Flex justify="end">
						<AlertDialog.Action>
							<Button variant="soft" color="gray" mt="2" onClick={()=>setError(false)}>Okie</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	)
}

export default DeleteIssueButton;
