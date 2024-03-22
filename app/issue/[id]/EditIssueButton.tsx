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
        <Link href={`/issues/${issue_id}/edit`}></Link> Edit Issue
    </Button>
  )
}

export default EditIssueButton
