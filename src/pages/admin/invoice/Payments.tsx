import { useEffect, useState } from "react";
import { createPayment, getInvoice, getPayments, InvoiceWithUsername, Payment } from "../../../api/admin-invoice";
import LoadingError from "../../../components/LoadingError";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import Stack from "../../../components/Stack";
import Input from "../../../components/Input";
import Card from "../../../components/Card";



export default function Payments({ id }: { id: number }) {
    const [loading, setLoading] = useState(true);
    const [invoice, setInvoice] = useState<InvoiceWithUsername | null>(null);
    const [error, setError] = useState<string>("");
    const [refresh, setRefresh] = useState(0);
    const [payments, setPayments] = useState<Payment[]>([]);

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        setInvoice(null);

        getInvoice(id)
            .then(i => {
                setInvoice(i.invoice)
                return getPayments(id)
            })
            .then(p => setPayments(p))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id, refresh]);


    function onAdd() {
        setLoading(true);
        setError("");

        createPayment(id, { description, amount })
            .then(() => {
                setRefresh(refresh + 1)
                setDescription("")
                setAmount("")
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <LoadingError loading={loading} error={error} />

        <Card className="mt-5" title="Add payment">
            <Stack className="items-start">
                <Input value={description} label="Description" onChange={setDescription}></Input>
                <Input value={amount} label="Amount" onChange={setAmount}></Input>
                <Button onClick={onAdd}>Add</Button>
            </Stack>
        </Card>


        {invoice && <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>Description</Th>
                    <Th>Gateway</Th>
                    <Th>Reference ID</Th>
                    <Th>Created at</Th>
                    <Th>Amount</Th>
                </Tr>
            </Thead>
            <Tbody>
                {payments.map(p => <Tr key={p.id}>
                    <Td>{p.description}</Td>
                    <Td>{p.gateway}</Td>
                    <Td>{p.reference_id}</Td>
                    <Td>{new Date(p.created_at * 1000).toLocaleString()}</Td>
                    <Td>${p.amount}</Td>
                </Tr>)}
            </Tbody>
        </Table>}

    </>
}