import { useEffect, useMemo, useState } from "react";
import { getServices, ServiceWithName } from "../../../api/admin-service";
import { debounce } from "lodash";
import LoadingError from "../../../components/LoadingError";
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import { Link } from "react-router";
import Pagination from "../../../components/Pagination";
import Status from "../../../components/Status";



export default function ServiceList() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [services, setServices] = useState<ServiceWithName[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const debounced = useMemo(() => debounce((page: number, user_id: number, server_id: number, status: string, label: string) => {
        setServices([]);
        getServices(page, user_id, server_id, status, label)
            .then(r => {
                setServices(r.services);
                setTotalPages(r.total_pages);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, 300), []);


    useEffect(() => {
        setLoading(true);
        setError("");
        debounced(page, 0, 0, status, search);
    }, [debounced, page, search, status]);

    return <>
        <h1 className="text-3xl font-bold">Services</h1>

        <LoadingError loading={loading} error={error} />

        <div className="flex flex-wrap gap-2">
            <Select value={status} onChange={setStatus}>
                <option value="">All</option>
                <option value="ACTIVE">Active</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="PENDING">Pending</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="UNPAID">Unpaid</option>
            </Select>
            <Input value={search} onChange={setSearch} placeholder="Search" />
        </div>

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Status</Th>
                    <Th>Label</Th>
                    <Th>User</Th>
                    <Th>Expiry date</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {services.map(service => <Tr key={service.id}>
                    <Td>{service.id}</Td>
                    <Td><Status status={service.status}></Status></Td>
                    <Td>{service.label}</Td>
                    <Td><Link className="text-primary" to={"/admin/user/" + service.user_id}>#{service.user_id} {service.name}</Link></Td>
                    <Td>{new Date(service.expires_at * 1000).toLocaleString()}</Td>
                    <Td>
                        <Link to={"/admin/service/" + service.id} className="text-primary">View</Link>
                    </Td>
                </Tr>)}
            </Tbody>
        </Table>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} className="mt-5" />
    </>
}