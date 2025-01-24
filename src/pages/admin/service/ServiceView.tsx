import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Tab from "../../../components/Tab";
import Basic from "./Basic";
import Billing from "./Billing";
import { ActionStatus, getActionStatus } from "../../../api/admin-service";
import Alert from "../../../components/Alert";



export default function ServiceView() {
    const { id } = useParams();
    const [selected, setSelected] = useState("BASIC");
    const [actionStatus, setActionStatus] = useState<ActionStatus>({ pending: "", action_error: "", info: "" })

    useEffect(() => {
        let i = setTimeout(f, 1000)

        function f() {
            (async function() {
                const r = await getActionStatus(parseInt(id!));

                const n = {...actionStatus};

                // flash message
                if (r.action_error !== "") {
                    n.action_error = r.action_error
                }
                if (r.info !== "") {
                    n.info = r.info
                }

                n.pending = r.pending
                setActionStatus(n)

                i = setTimeout(f, 1000)
            })()
        }
        return () => clearTimeout(i)
    }, [actionStatus, id])

    return <>
        <h1 className="text-3xl font-bold">Service #{id}</h1>

        {actionStatus.pending && <div className="my-5"><Alert severity="info">{actionStatus.pending}</Alert></div>}
        {actionStatus.action_error && <div className="my-5"><Alert severity="error">{actionStatus.action_error}</Alert></div>}
        {actionStatus.info && <div className="my-5"><Alert severity="success">{actionStatus.info}</Alert></div>}

        <Tab tabs={["BASIC", "BILLING", "EXTENSION"]} selected={selected} onSelect={setSelected}></Tab>

        <div className="mt-5">
            {selected === "BASIC" && <Basic id={parseInt(id!)}></Basic>}
            {selected === "BILLING" && <Billing id={parseInt(id!)}></Billing>}
        </div>
    </>
}