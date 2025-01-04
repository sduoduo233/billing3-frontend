
import { cloneDeep } from "lodash"
import { ProductEdit } from "../../../api/admin-product"
import Input from "../../../components/Input"
import Stack from "../../../components/Stack"
import Table from "../../../components/Table"
import Thead from "../../../components/Thead"
import Tr from "../../../components/Tr"
import Th from "../../../components/Th"
import Tbody from "../../../components/Tbody"
import Td from "../../../components/Td"
import Button from "../../../components/Button"

interface IProps {
    onChange: (product: ProductEdit) => void
    product: ProductEdit
}

export default function Pricing({ onChange, product }: IProps) {

    function onDisplayNameChange(index: number, value: string) {
        const cloned = cloneDeep(product);
        cloned.pricing[index].display_name = value;
        onChange(cloned);
    }

    function onDurationChange(index: number, value: string) {
        const cloned = cloneDeep(product);
        cloned.pricing[index].duration = parseInt(value);
        onChange(cloned);
    }

    function onPriceChange(index: number, value: string) {
        const cloned = cloneDeep(product);
        cloned.pricing[index].price = value;
        onChange(cloned);
    }

    function onSetupFeeChange(index: number, value: string) {
        const cloned = cloneDeep(product);
        cloned.pricing[index].setup_fee = value;
        onChange(cloned);
    }

    function onAdd() {
        const cloned = cloneDeep(product);
        cloned.pricing.push({ display_name: "", duration: 0, price: "0.00", setup_fee: "0.00" });
        onChange(cloned);
    }

    function onDelete(index: number) {
        const cloned = cloneDeep(product);
        cloned.pricing.splice(index, 1);
        onChange(cloned);
    }

    return <>
        <Stack>
            <div>
                <Button onClick={onAdd}>Add</Button>
            </div>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Dispaly name</Th>
                        <Th>Duration (Seconds)</Th>
                        <Th>Price</Th>
                        <Th>Setup fee</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        product.pricing.map((price, index) => <Tr key={index}>
                            <Td><Input value={price.display_name} onChange={e => onDisplayNameChange(index, e)}></Input></Td>
                            <Td><Input value={price.duration.toString()} onChange={e => onDurationChange(index, e)}></Input></Td>
                            <Td><Input value={price.price} onChange={e => onPriceChange(index, e)}></Input></Td>
                            <Td><Input value={price.setup_fee} onChange={e => onSetupFeeChange(index, e)}></Input></Td>
                            <Td><button className="text-rose-500" onClick={() => onDelete(index)}>Delete</button></Td>
                        </Tr>)
                    }
                </Tbody>
            </Table>
        </Stack>
    </>
}