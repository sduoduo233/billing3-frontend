import { useParams } from "react-router";
import { getActionStatus, getClientActions, getInfoPage, getService, Service, doAction as apiDoAction } from "../../api/service";
import { useEffect, useState } from "react";
import LoadingError from "../../components/LoadingError";
import Card from "../../components/Card";
import Status from "../../components/Status";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import { ActionStatus } from "../../api/admin-service";


export default function ServiceView() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [service, setSerivce] = useState<Service | null>(null);
    const [actions, setActions] = useState<string[]>([]);
    const [iframeData, setIframeData] = useState<string>("");
    const [actionStatus, setActionStatus] = useState<ActionStatus>({ pending: "", action_error: "", info: "" })

    useEffect(() => {
        let i = setTimeout(f, 1000)

        function f() {
            (async function () {
                const r = await getActionStatus(parseInt(id!));

                const n = { ...actionStatus };

                // flash message
                if (r.action_error !== "") {
                    n.action_error = r.action_error
                }
                if (r.info !== "") {
                    n.info = r.info
                }

                n.pending = r.pending
                setActionStatus(n)

                i = setTimeout(f, 3000)
            })()
        }
        return () => clearTimeout(i)
    }, [actionStatus, id])

    useEffect(() => {
        setLoading(true);
        setError("");
        setSerivce(null);
        (async function fetchData() {
            try {
                const s = await getService(parseInt(id!));
                setSerivce(s);
                if (s.status === "ACTIVE") {
                    setActions(await getClientActions(s.id));
                    setIframeData(await getInfoPage(s.id));
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
        setLoading(true);
        setError("");
        apiDoAction(service.id, a)
            .then(() => { })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <LoadingError loading={loading} error={error} />

        <h1 className="text-3xl font-bold">Service #{id}</h1>


        {service && <div className="mt-3">
            <Status status={service.status} large />

            {service.status === "CANCELLED" && <div className="mt-3"><Alert severity="warning">Cancellation reason: {service.cancellation_reason}</Alert></div>}

            {actionStatus.pending && <div className="mt-3"><Alert severity="info">{actionStatus.pending}</Alert></div>}
            {actionStatus.action_error && <div className="mt-3"><Alert severity="error">{actionStatus.action_error}</Alert></div>}
            {actionStatus.info && <div className="mt-3"><Alert severity="success">{actionStatus.info}</Alert></div>}

            <Card className="mt-3" title="Info">
                <div className="flex flex-col gap-1">
                    <span className="font-bold">Label</span>
                    <span>{service.label}</span>

                    <span className="font-bold">Expiry date</span>
                    <span>{new Date(service.expires_at * 1000).toLocaleString()}</span>

                    <span className="font-bold">Price</span>
                    <span>${service.price} / {formatBillingCycle(service.billing_cycle)}</span>

                    <span>Created at</span>
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
                    <iframe className="h-[60vh] w-full mt-3 bg-white select-none" srcDoc={iframeData} sandbox="allow-forms allow-scripts" referrerPolicy="no-referrer"></iframe>
                </Card>
            </>}
        </div>}
    </>
}