import { useEffect, useState } from "react";
import LoadingError from "../../../components/LoadingError";
import Form from "./Form";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router";
import { Gateway, getGateway, updateGateway } from "../../../api/admin-gateways";



export function GatewayEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [gateway, setGateway] = useState<Gateway | null>(null);

    function onSubmit() {
        setLoading(true);
        setError("");

        updateGateway(parseInt(id!), gateway!)
            .then(() => navigate("/admin/gateway"))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setLoading(true);
        setError("");
        setGateway(null);
        getGateway(parseInt(id!))
            .then((data) => setGateway(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    return <div>
        <h1 className="text-3xl font-bold">Gateway #{id}</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        {gateway && <div className="mt-5">
            <Form gateway={gateway} onChange={setGateway}></Form>
        </div>}

        <Button onClick={onSubmit} className="mt-5">Save</Button>
    </div>
}