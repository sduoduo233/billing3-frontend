import { cloneDeep } from "lodash"
import { ProductEdit, ProductSetting, getProductSettings as apiGetProductSettings } from "../../../api/admin-product"
import Stack from "../../../components/Stack"
import Select from "../../../components/Select"
import { useEffect, useState } from "react"
import LoadingError from "../../../components/LoadingError"
import Input from "../../../components/Input"
import Textarea from "../../../components/Textarea"
import MultiSelect from "../../../components/MultiSelect"
import { getServers, Server } from "../../../api/admin-server"

interface IProps {
    onChange: (product: ProductEdit) => void
    product: ProductEdit
    extensions: string[]
}

export default function Extension({ onChange, product, extensions }: IProps) {
    const [loaded, setLoaded] = useState(false);
    const [productSettings, setProductSettings] = useState<ProductSetting[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [servers, setServers] = useState<Server[]>([]);

    useEffect(() => {
        setLoading(true);
        setError("");
        setServers([]);
        getServers()
            .then((data) => setServers(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [])

    useEffect(() => {
        if (loaded) return;
        setLoaded(true);

        apiGetProductSettings(product.extension, product.settings)
                .then(d => setProductSettings(d))
                .catch(e => setError(e.message))
                .finally(() => setLoading(false));
    }, [loaded, product])

    function onExtensionChange(v: string) {
        const cloned = cloneDeep(product);
        cloned.extension = v;
        onChange(cloned);

        apiGetProductSettings(cloned.extension, cloned.settings)
                .then(d => setProductSettings(d))
                .catch(e => setError(e.message))
                .finally(() => setLoading(false));
    }

    function onSettingChange(name: string, value: string, update: boolean) {
        const cloned = cloneDeep(product);
        cloned.settings[name] = value;
        onChange(cloned);
        if (update) {
            apiGetProductSettings(cloned.extension, cloned.settings)
                .then((data) => {
                    setProductSettings(data)
                })
                .catch((e) => {
                    setError(e.message);
                })
                .finally(() => setLoading(false));
        }
    }

    return <>

        <LoadingError loading={loading} error={error} />

        <Stack>


            <Select label="Extension" value={product.extension} onChange={onExtensionChange}>
                {
                    extensions.map((extension) => <option key={extension} value={extension}>{extension}</option>)
                }
            </Select>

            {
                productSettings.map((setting) => {
                    if (setting.type === "string") {
                        return <Input key={setting.name} label={setting.display_name} helperText={setting.description} placeholder={setting.placeholder} value={product.settings[setting.name] || ""} onChange={v => onSettingChange(setting.name, v, false)}></Input>
                    } else if (setting.type === "select") {
                        return <Select key={setting.name} label={setting.display_name} helperText={setting.description} value={product.settings[setting.name] || ""} onChange={v => onSettingChange(setting.name, v, true)}>
                            <option value="">-- Please Select --</option>
                            {
                                setting.values.map((v) => <option key={v} value={v}>{v}</option>)
                            }
                        </Select>
                    } else if (setting.type === "text") {
                        return <Textarea key={setting.name} label={setting.display_name} helperText={setting.description} placeholder={setting.placeholder} value={product.settings[setting.name] || ""} onChange={v => onSettingChange(setting.name, v, false)}></Textarea>
                    } else if (setting.type === "servers") {
                        return <MultiSelect
                            key={setting.name}
                            values={servers.map(s => { return { display_name: s.label, value: s.id.toString() } })}
                            selected={product.settings[setting.name] ? product.settings[setting.name].split(",") : []}
                            onChange={(v) => onSettingChange(setting.name, v.join(","), false)}
                            label="Servers"
                            helperText="A random server will be chosen during automatic provision.">
                        </MultiSelect>
                    } else {
                        return <div key={setting.name}></div>
                    }
                })
            }

        </Stack>
    </>
}