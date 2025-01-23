import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Gateway, getGateways, getInvoice, getPayments, Invoice, InvoiceItem, Payment, payNow } from "../../api/invoice";
import LoadingError from "../../components/LoadingError";
import Alert from "../../components/Alert";
import Table from "../../components/Table";
import Th from "../../components/Th";
import Thead from "../../components/Thead";
import Tr from "../../components/Tr";
import Tbody from "../../components/Tbody";
import Td from "../../components/Td";
import Button from "../../components/Button";
import Select from "../../components/Select";



export default function InvoiceView() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [gateway, setGateway] = useState("");
    const [gateways, setGateways] = useState<Gateway[]>([]);

    useEffect(() => {
        setError("");
        setLoading(true);
        setItems([]);
        setInvoice(null);
        setPayments([]);
        getInvoice(parseInt(id!))
            .then((i) => {
                setInvoice(i.invoice);
                setItems(i.items);
                return getPayments(i.invoice.id);
            })
            .then((p) => {
                setPayments(p)
                return getGateways();
            })
            .then(g => setGateways(g))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    function onClick() {
        if (!invoice) return;
        setLoading(true);
        setError("");

        payNow(invoice.id, gateway)
            .then((url) => window.location.href = url)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <h1 className="text-3xl font-bold">Invoice #{id}</h1>

        <LoadingError loading={loading} error={error} />

        {invoice && <>
            <div className="mt-3">
                {invoice.status === "UNPAID" && <span className="bg-rose-500 font-bold text-white rounded p-1 text-xl">UNPAID</span>}
                {invoice.status === "PAID" && <span className="bg-green-600 font-bold text-white rounded p-1 text-xl">PAID</span>}
                {invoice.status === "CANCELLED" && <span className="bg-gray-500 font-bold text-white rounded p-1 text-xl">CANCELLED</span>}
            </div>

            {(invoice.cancellation_reason && invoice.status === "CANCELLED") && <div className="mt-3">
                <Alert severity="info">Cancellation reason: {invoice.cancellation_reason}</Alert>
            </div>}

            <h2 className="text-2xl mt-3">Basic</h2>

            <div className="mt-3 flex flex-col gap-1">
                <span><strong>Due at</strong></span>
                <span>{new Date(invoice.due_at * 1000).toLocaleString()}</span>
                <span><strong>Created at</strong></span>
                <span>{new Date(invoice.created_at * 1000).toLocaleString()}</span>
                {invoice.paid_at && <>
                    <span><strong>Paid at</strong></span>
                    <span>{new Date(invoice.paid_at * 1000).toLocaleString()}</span>
                </>}
            </div>

            {invoice.status === "UNPAID" && <div className="mt-3 flex justify-start gap-2">
                <Select value={gateway} onChange={e => setGateway(e)}>
                    {gateways.map((gateway) => <option key={gateway.name} value={gateway.name}>{gateway.display_name}</option>)}
                </Select>
                <Button onClick={onClick}>Pay now</Button>
            </div>}

            <h2 className="text-2xl mt-3">Items</h2>

            <Table className="mt-3">
                <Thead>
                    <Tr>
                        <Th>Description</Th>
                        <Th>Amount</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {items.map((item) => <Tr key={item.id}>
                        <Td>{item.description}</Td>
                        <Td>${item.amount}</Td>
                    </Tr>)}
                    <Tr>
                        <Th className="text-right">Total</Th>
                        <Td>${invoice.amount}</Td>
                    </Tr>
                </Tbody>
            </Table>

            <h2 className="text-2xl mt-3">Payments</h2>

            {(payments.length === 0 && !loading) && <div>No payment found</div>}

            {payments.length > 0 && <Table className="mt-3">
                <Thead>
                    <Tr>
                        <Th>Gateway</Th>
                        <Th>Description</Th>
                        <Th>Amount</Th>
                        <Th>Created at</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {payments.map((payment) => <Tr key={payment.id}>
                        <Td>{payment.gateway}</Td>
                        <Td>{payment.description}</Td>
                        <Td>${payment.amount}</Td>
                        <Td>{new Date(payment.created_at * 1000).toLocaleString()}</Td>
                    </Tr>)}
                </Tbody>
            </Table>}
        </>}


    </>

}