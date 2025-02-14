import { useEffect, useState } from "react";
import { getServices, Service } from "../../../api/admin-service";
import LoadingError from "../../../components/LoadingError";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import Status from "../../../components/Status";
import { Link } from "react-router";
import Pagination from "../../../components/Pagination";



export default function UserService({id}: {id: number}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [services, setServices] = useState<Service[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError("");
        setServices([]);
        getServices(page, id, 0, "", "")
            .then(r => {
                setServices(r.services);
                setTotalPages(r.total_pages);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id, page]);

    return <>
        <LoadingError loading={loading} error={error} />

        <Table className="mt-3">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Status</Th>
                    <Th>Label</Th>
                    <Th>Expiry date</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {services.map(service => <Tr key={service.id}>
                    <Td>{service.id}</Td>
                    <Td><Status status={service.status}></Status></Td>
                    <Td>{new Date(service.expires_at * 1000).toLocaleString()}</Td>
                    <Td><Link className="text-primary underline" to={`/admin/service/${service.id}`}>View</Link></Td>
                </Tr>)}
            </Tbody>
        </Table>

        <Pagination className="mt-3" page={page} totalPages={totalPages} onChange={setPage}></Pagination>
    </>
}