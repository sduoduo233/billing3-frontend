import { useEffect, useState } from "react";
import { Invoice } from "../../../api/admin-invoice";
import LoadingError from "../../../components/LoadingError";
import Table from "../../../components/Table";
import Th from "../../../components/Th";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Tbody from "../../../components/Tbody";
import Button from "../../../components/Button";
import { generateInvoice, getInvoices } from "../../../api/admin-service";
import { Link } from "react-router";
import Td from "../../../components/Td";
import Status from "../../../components/Status";




export default function Billing({ id }: { id: number }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError("");
        setInvoices([]);
        getInvoices(id)
            .then(r => setInvoices(r))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id, refresh]);

    function onClick() {
        setLoading(true);
        setError("");
        generateInvoice(id)
            .then(() => setRefresh(refresh + 1))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <LoadingError loading={loading} error={error}></LoadingError>

        <Button onClick={onClick}>Generate renewal invoice</Button>

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Status</Th>
                    <Th>Amount</Th>
                    <Th>Created At</Th>
                    <Th>Due At</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {invoices.map(i => <Tr key={i.id}>
                    <Td>{i.id}</Td>
                    <Td><Status status={i.status}></Status></Td>
                    <Td>{i.amount}</Td>
                    <Td>{new Date(i.created_at * 1000).toLocaleString()}</Td>
                    <Td>{new Date(i.due_at * 1000).toLocaleString()}</Td>
                    <Td><Link to={"/admin/invoice/" + i.id} className="text-primary">View</Link></Td>
                </Tr>)}
            </Tbody>
        </Table>
    </>

}