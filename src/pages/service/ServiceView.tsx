import { useParams } from "react-router";
import { getClientActions, getService, Service, doAction as apiDoAction } from "../../api/service";
import { useEffect, useState } from "react";
import LoadingError from "../../components/LoadingError";
import Card from "../../components/Card";
import Status from "../../components/Status";
import Alert from "../../components/Alert";
import Button from "../../components/Button";


export default function ServiceView() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [service, setSerivce] = useState<Service | null>(null);
    const [actions, setActions] = useState<string[]>([]);
    const [iframeSrc, setIframeSrc] = useState<string>("about:blank");  
    const [success, setSuccess] = useState<string>("");

    useEffect(() => {
        setIframeSrc("about:blank");
        setLoading(true);
        setError("");
        setSerivce(null);
        setSuccess("");
        (async function fetchData() {
            try {
                const s = await getService(parseInt(id!));
                setSerivce(s);
                if (s.status === "ACTIVE") {
                    setActions(await getClientActions(s.id));
                    setIframeSrc(`/api/service/${s.id}/info`);
                }
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    function formatBillingCycle(s: number) {
        const m = (s / 60 / 60 / 24 / 30);
        if (Math.floor(m) === m) {
            if (m === 1) {
                return "1 month";
            }
            return Math.floor(m) + " months";
        }
        return (s / 60 / 60 / 24 / 30).toFixed(1) + " months";
    }

    function doAction(a: string) {
        if (service === null) return;
        setSuccess("");
        setLoading(true);
        setError("");
        apiDoAction(service.id, a)
            .then(() => {
                setSuccess(`Action ${a} has been scheduled`);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <LoadingError loading={loading} error={error} />
        {success && <Alert severity="success">{success}</Alert>}


        <h1 className="text-3xl font-bold">Service #{id}</h1>


        {service && <div className="mt-3">
            <Status status={service.status} large />

            {service.status === "CANCELLED" && <div className="mt-3"><Alert severity="warning">Cancellation reason: {service.cancellation_reason}</Alert></div>}

            <Card className="mt-3" title="Info">
                <div className="flex flex-col gap-1">
                    <span className="font-bold">Label</span>
                    <span>{service.label}</span>

                    <span className="font-bold">Expiry date</span>
                    <span>{new Date(service.expires_at * 1000).toLocaleString()}</span>

                    <span className="font-bold">Price</span>
                    <span>${service.price} / {formatBillingCycle(service.billing_cycle)}</span>

                    <span className="font-bold">Created at</span>
                    <span>{new Date(service.created_at * 1000).toLocaleString()}</span>

                    {(service.cancelled_at && service.status === "CANCELLED") && <>
                        <span>Cancelled at</span>
                        <span>{new Date(service.cancelled_at * 1000).toLocaleString()}</span>
                    </>}
                </div>
            </Card>

            {service.status === "ACTIVE" && <>


                <Card className="mt-3" title="Server information">
                    <div className="flex gap-1 flex-wrap">
                        {actions.map(a => <Button onClick={() => doAction(a)} key={a}>{a.toUpperCase()}</Button>)}
                    </div>
                    <iframe src={iframeSrc} className="h-[60vh] w-full mt-3 bg-white select-none" sandbox="allow-forms allow-scripts" referrerPolicy="no-referrer"></iframe>
                </Card>
            </>}
        </div>}
    </>
}