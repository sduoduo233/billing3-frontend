import { useEffect, useState } from "react";
import { Invoice, searchInvoices } from "../../../api/admin-invoice";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import Status from "../../../components/Status";
import { Link } from "react-router";
import Pagination from "../../../components/Pagination";
import LoadingError from "../../../components/LoadingError";


export default function UserInvoice({ id }: { id: number }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [invoicePage, setInvoicePage] = useState(1);
    const [invoiceTotalPages, setInvoiceTotalPages] = useState(0);

    useEffect(() => {
        setLoading(true);
        setError("");
        setInvoices([]);
        searchInvoices("", id, invoicePage)
            .then(r => {
                setInvoices(r.invoices);
                setInvoiceTotalPages(r.total_pages);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [invoicePage, id]);

    return <>

        <LoadingError loading={loading} error={error} />

        <Table className="mt-3">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Status</Th>
                    <Th>Amount</Th>
                    <Th>Due at</Th>
                    <Th>Created at</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {invoices.map(invoice => <Tr key={invoice.id}>
                    <Td>{invoice.id}</Td>
                    <Td><Status status={invoice.status}></Status></Td>
                    <Td>${invoice.amount}</Td>
                    <Td>{new Date(invoice.due_at * 1000).toLocaleString()}</Td>
                    <Td>{new Date(invoice.created_at * 1000).toLocaleString()}</Td>
                    <Td><Link className="text-primary underline" to={`/admin/invoice/${invoice.id}`}>View</Link></Td>
                </Tr>)}
            </Tbody>
        </Table>

        <Pagination className="mt-3" page={invoicePage} totalPages={invoiceTotalPages} onChange={setInvoicePage}></Pagination>
    </>
}