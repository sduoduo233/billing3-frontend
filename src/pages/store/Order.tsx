import { useNavigate, useParams } from "react-router";
import { calculatePricing, createOrder, getProduct, getProductOptions, Pricing, Product, ProductOption } from "../../api/store";
import { useEffect, useMemo, useState } from "react";
import LoadingError from "../../components/LoadingError";
import Card from "../../components/Card";
import Select from "../../components/Select";
import Stack from "../../components/Stack";
import { cloneDeep, debounce } from "lodash";
import Button from "../../components/Button";
import Loading from "../../components/Loading";



export default function Order() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>();
    const [inputs, setInputs] = useState<Record<string, string>>({});
    const [optoins, setOptions] = useState<ProductOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [billingCycle, setBillingCycle] = useState(0);
    const [pricing, setPricing] = useState<Pricing | null>(null);
    const [loadingPrice, setLoadingPrice] = useState(false);

    useEffect(() => {
        setOptions([]);
        setProduct(null);
        setLoading(true);
        setError("");
        setInputs({});
        setBillingCycle(0);
        setPricing(null);

        getProduct(parseInt(id!))
            .then(p => {
                setProduct(p);
                setBillingCycle(p.pricing[0].duration);
                return getProductOptions(p.id, p.pricing[0].duration);
            })
            .then(o => {
                setOptions(o)
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));

    }, [id]);

    function onOptionChange(name: string, value: string) {
        const newInputs = {
            ...inputs,
            [name]: value
        }
        setInputs(newInputs);

        setLoadingPrice(true);
        debounced(newInputs, billingCycle, parseInt(id!));
    }

    function onBillingCycleChange(value: number) {


        setBillingCycle(value);
        getProductOptions(parseInt(id!), value)
            .then(o => {
                setOptions(o);
                const newInputs = cloneDeep(inputs);
                Object.keys(newInputs).forEach(k => {
                    if (o.find(opt => opt.name === k) === undefined) {
                        delete newInputs[k];
                    }
                });
                setInputs(newInputs);

                debounced(newInputs, value, parseInt(id!));
                setLoadingPrice(true);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    const debounced = useMemo(() => debounce(function (inputs: Record<string, string>, duration: number, id: number) {
        setLoadingPrice(true);
        setError("");
        setPricing(null);
        calculatePricing({
            product_id: id,
            duration: duration,
            options: inputs
        })
            .then((p) => setPricing(p))
            .catch(e => setError(e.message))
            .finally(() => setLoadingPrice(false));
    }, 500), []);

    function onSubmit() {
        setLoading(true);
        setError("");

        createOrder({
            product_id: parseInt(id!),
            duration: billingCycle,
            options: inputs
        })
            .then((i) => navigate("/dashboard/invoice/" + i))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return <>
        <LoadingError loading={loading} error={error}></LoadingError>
        {product && <>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {product.description && <Card className="mt-3">{product.description}</Card>}

            <div className="mt-3 grid grid-cols-12 gap-3">

                <div className="col-span-12 lg:col-span-8">
                    <Card title="Options" className="">
                        <Stack>


                            <Select label="Billing Cycle" value={billingCycle.toString()} onChange={e => onBillingCycleChange(parseInt(e))}>
                                {
                                    product.pricing.map(p => <option key={p.duration} value={p.duration.toString()}>
                                        {p.display_name} - ${p.price} {p.setup_fee !== "0" && `+ $${p.setup_fee} Setup Fee`}
                                    </option>)
                                }
                            </Select>


                            {
                                optoins.map(o => {
                                    if (o.type === "select") {
                                        return <Select key={o.name} label={o.display_name} value={inputs[o.name] || ""} onChange={e => onOptionChange(o.name, e)}>
                                            {
                                                o.values.map(v => <option key={v.value} value={v.value}>{v.display_name}</option>)
                                            }
                                        </Select>
                                    }

                                    return <></>
                                })
                            }


                        </Stack>
                    </Card>
                </div>


                <div className="col-span-12 lg:col-span-4">
                    <Card title="Pricing" className="">
                        {
                            loadingPrice && <Loading></Loading>
                        }
                        {
                            (!loadingPrice && pricing !== null) && <table className="w-full rounded table-auto text-left">
                                <thead className="border-b border-outline">
                                    <tr>
                                        <th className="p-1">Description</th>
                                        <th className="p-1">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pricing.items.map(p => <tr key={p.description}>
                                            <td className="p-1">{p.description}</td>
                                            <td className="p-1">${p.price}</td>
                                        </tr>)
                                    }
                                    <tr className="border-t border-outline">
                                        <th className="p-1">{pricing.billing_cycle}</th>
                                        <td className="p-1">${pricing.recurring_fee}</td>
                                    </tr>
                                    <tr className="">
                                        <th className="p-1">Setup fee</th>
                                        <td className="p-1">${pricing.setup_fee}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }

                    </Card>
                    <Button className="mt-3" onClick={onSubmit} disabled={loading || loadingPrice}>Place Order</Button>
                </div>
            </div>

        </>}

    </>
}