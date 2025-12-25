import { useEffect, useState } from "react";
import LoadingError from "../../../components/LoadingError";
import { getService, updateServiceSettings } from "../../../api/admin-service";
import Input from "../../../components/Input";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import Button from "../../../components/Button";
import { cloneDeep, omit } from "lodash";
import { useNavigate } from "react-router";
import Textarea from "../../../components/Textarea";




export default function Settings({ id }: { id: number }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [newKey, setNewKey] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError("");
        setSettings({});
        getService(id)
            .then(r => setSettings(r.settings))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    function onAdd() {
        if (newKey === "") return;
        if (settings[newKey] !== undefined) return;
        setSettings({ ...settings, [newKey]: "" });
        setNewKey("");
    }

    function onSave() {
        setLoading(true);
        setError("");
        updateServiceSettings(id, settings)
            .then(() => navigate(0))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    function onChange(k: string, v: string) {
        setSettings({ ...settings, [k]: v });
    }

    return <>
        <LoadingError loading={loading} error={error}></LoadingError>

        <div className="mb-3 flex gap-2">
            <Input className="" placeholder="Key" value={newKey} onChange={setNewKey}></Input>
            <Button className="" onClick={onAdd}>Add</Button>
        </div>

        <Table>
            <Thead>
                <Tr>
                    <Th>Key</Th>
                    <Th>Value</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {Object.keys(settings).map(k => <Tr key={k}>
                    <Td>{k}</Td>
                    <Td>
                        <Textarea rows={2} value={settings[k]} onChange={(v) => onChange(k, v)}></Textarea>
                    </Td>
                    <Td><button className="text-rose-500" onClick={() => setSettings(omit(cloneDeep(settings), [k]))}>Delete</button></Td>
                </Tr>)}
            </Tbody>
        </Table>

        <Button className="mt-3" onClick={onSave}>Save</Button>

    </>

}