import { useEffect, useState } from "react";
import { getService, ServiceWithName, updateService, updateStatus } from "../../../api/admin-service";
import LoadingError from "../../../components/LoadingError";
import Stack from "../../../components/Stack";
import Input from "../../../components/Input";
import Card from "../../../components/Card";
import Datetime from "../../../components/Datetime";
import { cloneDeep } from "lodash";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Checkbox from "../../../components/Checkbox";
import Status from "../../../components/Status";



export default function Basic({ id }: { id: number }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [service, setService] = useState<ServiceWithName | null>(null);
    const [refresh, setRefresh] = useState(0);
    const [newStatus, setNewStatus] = useState("ACTIVE");
    const [useExtension, setUseExtension] = useState(false);
    const [cancellationReason, setCancellationReason] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        setService(null);
        getService(id)
            .then(r => setService(r))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id, refresh]);

    function onLabelChange(e: string) {
        if (!service) return;
        const cloned = cloneDeep(service);
        cloned.label = e;
        setService(cloned);
    }

    function onExpiresAtChange(e: number) {
        if (!service) return;
        const cloned = cloneDeep(service);
        cloned.expires_at = e;
        setService(cloned);
    }

    function onBillingCycleChange(e: string) {
        if (!service) return;
        const n = parseInt(e);
        if (isNaN(n)) return;
        const cloned = cloneDeep(service);
        cloned.billing_cycle = n;
        setService(cloned);
    }

    function onPriceChange(e: string) {
        if (!service) return;
        const cloned = cloneDeep(service);
        cloned.price = e;
        setService(cloned);
    }

    function onUpdate() {
        if (!service) return;
        setLoading(true);
        setError("");
        updateService(id, { label: service.label, billing_cycle: service.billing_cycle, price: service.price, expires_at: service.expires_at })
            .then(() => setRefresh(refresh + 1))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    function onUpdateStatus() {
        if (!service) return;
        setLoading(true);
        setError("");
        updateStatus(id, newStatus, cancellationReason, useExtension)
            .then(() => setRefresh(refresh + 1))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <LoadingError loading={loading} error={error} />

        {service && <>

            <div>
                <Status status={service.status} large></Status>
            </div>

            <h2 className="text-2xl mt-5">Basic info</h2>

            <Card className="mt-5">

                <Stack>
                    <Input label="Label" value={service.label} onChange={onLabelChange}></Input>
                    <Input label="Billing cycle (seconds)" value={service.billing_cycle.toString()} onChange={onBillingCycleChange}></Input>
                    <Input label="Price" value={service.price} onChange={onPriceChange}></Input>
                    <Datetime label="Expires at" value={service.expires_at} onChange={onExpiresAtChange}></Datetime>
                    <Input label="User" value={"#" + service.user_id + " " + service.name} readOnly></Input>
                    <div><Button onClick={onUpdate}>Save</Button></div>
                </Stack>
            </Card>

            <h2 className="text-2xl mt-5">Status</h2>

            <Card className="mt-5">
                <Stack>
                    <Select label="New status" value={newStatus} onChange={setNewStatus}>
                        <option value="ACTIVE">Active</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="PENDING">Pending</option>
                        <option value="UNPAID">Unpaid</option>
                        <option value="SUSPENDED">Suspended</option>
                    </Select>
                    <Checkbox label="Use extension" checked={useExtension} onChange={setUseExtension}></Checkbox>
                    {newStatus === "CANCELLED" && <Input label="Cancellation reason" value={cancellationReason} onChange={setCancellationReason}></Input>}
                    <div><Button onClick={onUpdateStatus}>Update Status</Button></div>
                </Stack>
            </Card>

        </>}
    </>
}