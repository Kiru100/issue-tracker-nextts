"use client";

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const DeleteIssueButton = ({issue_id}: {issue_id: number}) => {
	const router = useRouter();

	const handleDeleteIssue = async () => {
		await axios.delete(`/api/issue/${issue_id}`);
		await router.push("/issue");
		await router.refresh();
	}

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color="red">Delete Issue</Button>
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
	)
}

export default DeleteIssueButton;
