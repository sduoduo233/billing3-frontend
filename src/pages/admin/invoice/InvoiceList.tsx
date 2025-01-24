import { useEffect, useState } from "react";
import { Invoice, searchInvoices } from "../../../api/admin-invoice";
import LoadingError from "../../../components/LoadingError";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import Pagination from "../../../components/Pagination";
import Select from "../../../components/Select";
import Status from "../../../components/Status";


export default function InvoiceList() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [status, setStatus] = useState("");

    function search(status: string, user_id: number, page: number) {
        setLoading(true);
        setError("");
        setTotalPages(1);
        setInvoices([]);

        searchInvoices(status, user_id, page).then(({ invoices, total_pages }) => {
            setInvoices(invoices);
            setTotalPages(total_pages);
        })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        search(status, 0, page);
    }, [status, page]);

    useEffect(() => {
        setPage(1);
    }, [status]);


    return <>
        <h1 className="text-3xl font-bold">Invoices</h1>

        <LoadingError loading={loading} error={error} />
        
        <div className="mt-5 flex gap-2">
            <Select value={status} onChange={e => setStatus(e)} className="w-50">
                <option value="">All</option>
                <option value="UNPAID">Unpaid</option>
                <option value="PAID">Paid</option>
                <option value="CANCELLED">Cancelled</option>
            </Select>
        </div>

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Status</Th>
                    <Th>User</Th>
                    <Th>Amount</Th>
                    <Th>Due At</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    invoices.map((invoice) => <Tr key={invoice.id}>
                        <Td>{invoice.id}</Td>
                        <Td><Status status={invoice.status}></Status></Td>
                        <Td>{invoice.user_id}</Td>
                        <Td>${invoice.amount}</Td>
                        <Td>{new Date(invoice.due_at * 1000).toLocaleString()}</Td>
                        <Td>
                            <a href={"/admin/invoice/" + invoice.id} className="text-blue-500">Edit</a>
                        </Td>
                    </Tr>)
                }
            </Tbody>
        </Table>

        <Pagination className="mt-5" page={page} totalPages={totalPages} onChange={p => setPage(p)}></Pagination>
    </>;
}