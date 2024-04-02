import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";

export default async function Home({searchParams}: {searchParams: {page: string}}) {
    const open = await prisma.issue.count({where: { status: "OPEN"}})
    const in_progress = await prisma.issue.count({where: { status: "IN_PROGRESS"}})
    const close = await prisma.issue.count({where: { status: "CLOSED"}})

    return (
    	<IssueChart open={open} inProgress={in_progress} close={close} />
    )
}
