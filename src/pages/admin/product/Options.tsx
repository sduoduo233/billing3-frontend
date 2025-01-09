import { cloneDeep } from "lodash"
import { ProductEdit } from "../../../api/admin-product"
import Input from "../../../components/Input"
import Stack from "../../../components/Stack"
import Select from "../../../components/Select"
import Table from "../../../components/Table"
import Thead from "../../../components/Thead"
import Tr from "../../../components/Tr"
import Td from "../../../components/Td"
import Th from "../../../components/Th"
import Tbody from "../../../components/Tbody"
import Button from "../../../components/Button"
import { useState } from "react"

interface IProps {
    onChange: (product: ProductEdit) => void
    product: ProductEdit
}

export default function Options({ onChange, product }: IProps) {
    const [option, setOption] = useState(-1);
    const [optionPricing, setOptionPricing] = useState(-1);

    function onDisplayNameChange(index: number, value: string) {
        const cloned = cloneDeep(product);
        cloned.options[index].display_name = value;
        onChange(cloned);
    }

    function onAdd() {
        const cloned = cloneDeep(product);
        cloned.options.push({
            display_name: "",
            name: "",
            type: "select",
            regex: "",
            values: []
        });
        onChange(cloned);
    }

    function onNameChange(index: number, value: string) {
        const cloned = cloneDeep(product);
        cloned.options[index].name = value;
        onChange(cloned);
    }

    function onTypeChange(index: number, value: string) {
        const cloned = cloneDeep(product);
        cloned.options[index].type = value as any;
        if (value !== "select") {
            cloned.options[index].values = [];
        }
        onChange(cloned);
    }

    function onRegexChange(index: number, value: string) {
        const cloned = cloneDeep(product);
        cloned.options[index].regex = value;
        onChange(cloned);
    }

    function onDelete(index: number) {
        const cloned = cloneDeep(product);
        cloned.options.splice(index, 1);
        onChange(cloned);
    }

    function onAddValue() {
        if (option < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[option].values.push({
            display_name: "",
            value: "",
            prices: []
        })
        onChange(cloned);
    }

    function onValueChange(index: number, v: string) {
        if (option < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[option].values[index].value = v;
        onChange(cloned);
    }

    function onValueDisplayNameChange(index: number, v: string) {
        if (option < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[option].values[index].display_name = v;
        onChange(cloned);
    }

    function onValueDelete(index: number) {
        if (option < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[option].values.splice(index, 1);
        onChange(cloned);
    }

    function onAddValuePricing() {
        if (option < 0 || optionPricing < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[option].values[optionPricing].prices.push({
            duration: 0,
            price: "0.00",
            setup_fee: "0.00"
        });
        onChange(cloned);
    }

    function onValuePricingDurationChange(index: number, value: number) {
        if (option < 0 || optionPricing < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[option].values[optionPricing].prices[index].duration = value;
        onChange(cloned);
    }

    function onValuePricingChange(index: number, value: string) {
        if (option < 0 || optionPricing < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[option].values[optionPricing].prices[index].price = value;
        onChange(cloned);
    }

    function onValuePricingSetupFeeChange(index: number, value: string) {
        if (option < 0 || optionPricing < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[option].values[optionPricing].prices[index].setup_fee = value;
        onChange(cloned);
    }

    function onValuePricingDelete(index: number) {
        if (option < 0 || optionPricing < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[option].values[optionPricing].prices.splice(index, 1);
        onChange(cloned);
    }

    if (optionPricing >= 0) {
        return <Stack>
            <div className="flex gap-2">
                <button className="text-primary flex items-center font-bold" onClick={() => setOptionPricing(-1)}><span className="material-symbols-outlined">arrow_back</span>Go back</button>
                <span>{product.options[option].values[optionPricing].display_name}</span>
            </div>

            <div><Button onClick={onAddValuePricing}>Add</Button></div>

            <Table>
                <Thead>
                    <Tr>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        <Th>Setup Fee</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        product.options[option].values[optionPricing].prices.map((v, index) => <Tr key={index}>
                            <Td>
                                <Select value={v.duration.toString()} onChange={v => onValuePricingDurationChange(index, parseInt(v))}>
                                    {product.pricing.map((p, i) => <option key={i} value={p.duration.toString()}>{p.display_name} ({p.duration} seconds)</option>)}
                                </Select>
                            </Td>
                            <Td><Input value={v.price} onChange={v => onValuePricingChange(index, v)}></Input></Td>
                            <Td><Input value={v.setup_fee} onChange={v => onValuePricingSetupFeeChange(index, v)}></Input></Td>
                            <Td><button className="text-rose-500" onClick={() => onValuePricingDelete(index)}>Delete</button></Td>
                        </Tr>)
                    }
                </Tbody>
            </Table>
        </Stack>
    }

    if (option >= 0) {
        return <Stack>
            <div className="flex gap-2">
                <button className="text-primary flex items-center font-bold" onClick={() => setOption(-1)}><span className="material-symbols-outlined">arrow_back</span>Go back</button>
                <span>{product.options[option].display_name}</span>
            </div>

            <div><Button onClick={onAddValue}>Add</Button></div>

            <Table>
                <Thead>
                    <Tr>
                        <Th>Value</Th>
                        <Th>Display Name</Th>
                        <Th>Prices</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        product.options[option].values.map((v, index) => <Tr key={index}>
                            <Td><Input value={v.value} onChange={v => onValueChange(index, v)}></Input></Td>
                            <Td><Input value={v.display_name} onChange={v => onValueDisplayNameChange(index, v)}></Input></Td>
                            <Td><Button onClick={() => setOptionPricing(index)}>Prices</Button></Td>
                            <Td><button className="text-rose-500" onClick={() => onValueDelete(index)}>Delete</button></Td>
                        </Tr>)
                    }
                </Tbody>
            </Table>
        </Stack>
    }

    return <>
        <Stack>
            <div>
                <Button onClick={onAdd}>Add</Button>
            </div>

            <Table>
                <Thead>
                    <Tr>
                        <Th>Display Name</Th>
                        <Th>Name</Th>
                        <Th>Type</Th>
                        <Th>Regex / Values</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        product.options.map((option, index) => <Tr key={index}>
                            <Td><Input value={option.display_name} onChange={e => onDisplayNameChange(index, e)}></Input></Td>
                            <Td><Input value={option.name} onChange={e => onNameChange(index, e)}></Input></Td>
                            <Td>
                                <Select value={option.type} onChange={e => onTypeChange(index, e)}>
                                    <option value="text">Text</option>
                                    <option value="select">Select</option>
                                    <option value="password">Password</option>
                                    <option value="textarea">Textarea</option>
                                </Select>
                            </Td>
                            <Td>
                                {option.type === "select" && <Button onClick={() => setOption(index)}>Values</Button>}
                                {option.type !== "select" && <Input placeholder="regex validation" value={option.regex} onChange={e => onRegexChange(index, e)}></Input>}
                            </Td>
                            <Td>
                                <button className="text-rose-500" onClick={() => onDelete(index)}>Delete</button>
                            </Td>
                        </Tr>)
                    }
                </Tbody>
            </Table>
        </Stack>
    </>
}