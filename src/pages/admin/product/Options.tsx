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
import Dialog from "../../../components/Dialog"
import { useState } from "react"

interface IProps {
    onChange: (product: ProductEdit) => void
    product: ProductEdit
}

export default function Options({ onChange, product }: IProps) {
    const [valuesDialog, setValuesDialog] = useState(-1);
    const [valuePricingDialog, setValuePricingDialog] = useState(-1);

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

    function onValuesClicked(index: number) {
        setValuesDialog(index);
    }

    function onAddValue() {
        if (valuesDialog < 0) return;
        const cloned = cloneDeep(product);
        cloned.options[valuesDialog].values.push({
            display_name: "",
            value: "",
            prices: []
        });
        onChange(cloned);
    }

    return <>
        <Dialog title="Value Pricing" open={valuePricingDialog >= 0 && valuesDialog >= 0} onClose={() => setValuePricingDialog(-1)}>
            Value pricing
        </Dialog>

        <Dialog title="Values" open={valuesDialog >= 0} onClose={() => setValuesDialog(-1)}>
            <Button onClick={onAddValue}>Add</Button>
            <Table className="outline outline-outline">
                <Thead>
                    <Tr>
                        <Th>Display Name</Th>
                        <Th>Value</Th>
                        <Th>Price</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        valuesDialog >= 0 && product.options[valuesDialog].values.map((value, index) => <Tr key={index}>
                            <Td><Input value={value.display_name}></Input></Td>
                            <Td><Input value={value.value}></Input></Td>
                        </Tr>)
                    }
                </Tbody>
            </Table>
        </Dialog>

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
                                {option.type === "select" && <Button onClick={() => onValuesClicked(index)}>Values</Button>}
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