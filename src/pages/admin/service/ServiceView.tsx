import { useState } from "react";
import { useParams } from "react-router";
import Tab from "../../../components/Tab";
import Basic from "./Basic";
import Billing from "./Billing";
import Settings from "./Settings";
import Extension from "./Extension";
import Jobs from "./Jobs";

export default function ServiceView() {
    const { id } = useParams();
    const [selected, setSelected] = useState("BASIC");


    return <>
        <h1 className="text-3xl font-bold">Service #{id}</h1>

        <Tab tabs={["BASIC", "BILLING", "EXTENSION", "SETTINGS", "JOBS"]} selected={selected} onSelect={setSelected}></Tab>

        <div className="mt-5">
            {selected === "BASIC" && <Basic id={parseInt(id!)}></Basic>}
            {selected === "BILLING" && <Billing id={parseInt(id!)}></Billing>}
            {selected === "EXTENSION" && <Extension id={parseInt(id!)}></Extension>}
            {selected === "SETTINGS" && <Settings id={parseInt(id!)}></Settings>}
            {selected === "JOBS" && <Jobs id={parseInt(id!)}></Jobs>}
        </div>
    </>
}