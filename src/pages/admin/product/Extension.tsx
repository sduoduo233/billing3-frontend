import { cloneDeep } from "lodash"
import { ProductEdit, ProductSetting, getProductSettings as apiGetProductSettings } from "../../../api/admin-product"
import Stack from "../../../components/Stack"
import Select from "../../../components/Select"
import { useCallback, useEffect, useRef, useState } from "react"
import LoadingError from "../../../components/LoadingError"
import Input from "../../../components/Input"
import Textarea from "../../../components/Textarea"

interface IProps {
    onChange: (product: ProductEdit) => void
    product: ProductEdit
    extensions: string[]
}

export default function Extension({ onChange, product, extensions }: IProps) {
    const [productSettings, setProductSettings] = useState<ProductSetting[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const currentSettings = useRef<Record<string, string>>({});

    function onExtensionChange(v: string) {
        const cloned = cloneDeep(product);
        cloned.extension = v;
        onChange(cloned);
    }

    const updateProductSettings = useCallback((settings: Record<string, string>) => {
        setLoading(true);
        setError("");

        apiGetProductSettings(product.extension, settings)
            .then((data) => {
                setProductSettings(data)
            })
            .catch((e) => {
                setError(e.message);
            })
            .finally(() => setLoading(false));
    }, [product.extension]);

    useEffect(() => {
        updateProductSettings(currentSettings.current);
    }, [updateProductSettings]);

    useEffect(() => {
        currentSettings.current = product.settings;
    }, [product.settings]);

    function onSettingChange(name: string, value: string, update: boolean) {
        const cloned = cloneDeep(product);
        cloned.settings[name] = value;
        onChange(cloned);
        if (update) updateProductSettings(cloned.settings);
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
                    }
                })
            }

        </Stack>
    </>
}