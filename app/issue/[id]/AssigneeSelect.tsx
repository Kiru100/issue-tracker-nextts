"use client"

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {Skeleton} from "@/app/components"

const AssigneeSelect = ({issue}: {issue: Issue}) => {


  	const {data: users, error, isLoading} = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: ()=> axios.get("/api/users").then(res => res.data),
		staleTime: 60 * 1000,
		retry: 3
	})

	if(isLoading) return <Skeleton />

	if(error) return null;

	return (
		<Select.Root 
			defaultValue={issue.assignedToUserId || ""}
			onValueChange={(userId)=> {
			axios.patch("/api/issue/"+ issue.id, {assignedToUserId: userId || null} )
		}}>
			<Select.Trigger defaultValue="assign.."  aria-placeholder='Assign'/>
			<Select.Content >
				<Select.Group>
					<Select.Label>Suggestion</Select.Label>
					<Select.Item value="">{"Unassigned"}</Select.Item>
					{users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}             
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

export default AssigneeSelect;
