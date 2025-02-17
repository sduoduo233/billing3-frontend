import { cloneDeep } from "lodash";
import { getServerSettings, Server, ServerSettings } from "../../../api/admin-server";
import Input from "../../../components/Input";
import Stack from "../../../components/Stack";
import { useEffect, useState } from "react";
import { getExtensions } from "../../../api/admin-product";
import Select from "../../../components/Select";
import LoadingError from "../../../components/LoadingError";
import Textarea from "../../../components/Textarea";




export default function Form({ server, onChange }: { server: Server, onChange: (s: Server) => void }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [extensions, setExtensions] = useState<string[]>([]);
    const [settings, setSettings] = useState<ServerSettings[]>([]);

    useEffect(() => {
        setLoading(true);
        setError("");
        setExtensions([]);
        setSettings([]);

        getExtensions()
            .then((data) => {
                setExtensions(data)
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setLoading(true);
        setError("");
        setSettings([]);
        getServerSettings(server.extension)
            .then((data) => {
                setSettings(data);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [server.extension]);

    function onExtensionChange(extension: string) {
        const cloned = cloneDeep(server);
        cloned.extension = extension;
        onChange(cloned);
    }

    function onLabelChange(label: string) {
        const cloned = cloneDeep(server);
        cloned.label = label;
        onChange(cloned);
    }

    function onSettingChange(name: string, value: string) {
        const cloned = cloneDeep(server);
        cloned.settings[name] = value;
        onChange(cloned);
    }


    return <Stack>
        <LoadingError loading={loading} error={error}></LoadingError>

        <Input label="Label" value={server.label} onChange={onLabelChange}></Input>

        {extensions.length > 0 && <Select label="Extension" value={server.extension} onChange={onExtensionChange}>
            {extensions.map((e) => <option key={e} value={e}>{e}</option>)}
        </Select>}

        {settings.map(s => {
            if (s.type === "string") {
                return <Input key={s.name} placeholder={s.placeholder} label={s.display_name} value={server.settings[s.name] || ""} onChange={e => onSettingChange(s.name, e)}></Input>
            }
            if (s.type === "text") {
                return <Textarea key={s.name} placeholder={s.placeholder} label={s.display_name} value={server.settings[s.name] || ""} onChange={e => onSettingChange(s.name, e)}></Textarea>
            }
        })}
    </Stack>
}