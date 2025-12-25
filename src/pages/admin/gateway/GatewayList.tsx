import { useEffect, useState } from "react";
import LoadingError from "../../../components/LoadingError";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import { Link } from "react-router";
import { Gateway, getGateways } from "../../../api/admin-gateways";
import { YesNo } from "../../../components/YesNo";



export default function GatewayList() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [gateways, setGateways] = useState<Gateway[]>([]);

    useEffect(() => {
        setLoading(true);
        setError("");
        setGateways([]);
        getGateways()
            .then((data) => setGateways(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    return <>
        <h1 className="text-3xl font-bold">Payment Gateways</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>Type</Th>
                    <Th>Display Name</Th>
                    <Th>Enabled</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {gateways.map((g) => (
                    <Tr key={g.id}>
                        <Td>{g.name}</Td>
                        <Td>{g.display_name}</Td>
                        <Td><YesNo value={g.enabled}></YesNo></Td>
                        <Td>
                            <Link to={`/admin/gateway/${g.id}`} className="text-blue-500">Edit</Link>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </>

}