import { useEffect, useState } from "react";
import LoadingError from "../../components/LoadingError";
import { getInvoices, Invoice } from "../../api/invoice";
import Table from "../../components/Table";
import Thead from "../../components/Thead";
import Tr from "../../components/Tr";
import Th from "../../components/Th";
import Tbody from "../../components/Tbody";
import Td from "../../components/Td";
import { Link } from "react-router";
import Pagination from "../../components/Pagination";
import Status from "../../components/Status";



export default function InvoiceList() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        setLoading(true);
        setError("");

        getInvoices(page)
            .then(({ invoices, total_pages }) => {
                setInvoices(invoices);
                setTotalPages(total_pages);
            }).catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page]);

    return <>
        <h1 className="text-3xl font-bold">Invoices</h1>

        <LoadingError loading={loading} error={error} />

        <Table className="mt-5">
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
                    <Td><Link className="text-primary underline" to={`/dashboard/invoice/${invoice.id}`}>View</Link></Td>
                </Tr>)}
            </Tbody>
        </Table>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} className="mt-5" />
    </>
}