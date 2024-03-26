import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

interface Props{
    issue_id: number;
}

const EditIssueButton = ({issue_id}: Props) => {
	return (
		<Button>
			<Pencil2Icon/>
			<Link href={`/issue/edit/${issue_id}`}>Edit Issue</Link> 
		</Button>
	)
}

export default EditIssueButton;
