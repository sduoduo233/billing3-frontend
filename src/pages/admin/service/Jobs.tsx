import { useEffect, useState } from "react";
import LoadingError from "../../../components/LoadingError";
import Table from "../../../components/Table";
import Th from "../../../components/Th";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Tbody from "../../../components/Tbody";
import { getServiceJobs, ServiceJob } from "../../../api/admin-service";
import Td from "../../../components/Td";




export default function Jobs({ id }: { id: number }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [jobs, setJobs] = useState<ServiceJob[]>([]);

    useEffect(() => {
        setLoading(true);
        setError("");
        setJobs([]);
        getServiceJobs(id)
            .then(r => setJobs(r))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    return <>
        <LoadingError loading={loading} error={error}></LoadingError>

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                    <Th>New Status</Th>
                    <Th>Scheduled at</Th>
                    <Th>Attempted at</Th>
                    <Th>Finalized at</Th>
                    <Th>Errors</Th>
                </Tr>
            </Thead>
            <Tbody>
                {jobs.map(job => <Tr key={job.id}>
                    <Td>{job.id}</Td>
                    <Td>{job.state}</Td>
                    <Td>{JSON.parse(job.args).action}</Td>
                    <Td>{JSON.parse(job.args).new_status}</Td>
                    <Td>{new Date(job.scheduled_at).toLocaleString()}</Td>
                    <Td>{job.attempted_at ? new Date(job.attempted_at).toLocaleString() : "-"}</Td>
                    <Td>{job.finalized_at ? new Date(job.finalized_at).toLocaleString() : "-"}</Td>
                    <Td>{job.error}</Td>
                </Tr>)}

            </Tbody>
        </Table>
    </>

}