import { cloneDeep } from "lodash"
import { Category } from "../../../api/admin-category"
import { ProductEdit } from "../../../api/admin-product"
import Input from "../../../components/Input"
import Stack from "../../../components/Stack"
import Textarea from "../../../components/Textarea"
import Select from "../../../components/Select"

interface IProps {
    onChange: (product: ProductEdit) => void
    product: ProductEdit
    categories: Category[]
}

export default function Basic({ onChange, product, categories }: IProps) {

    function onNameChange(v: string) {
        const cloned = cloneDeep(product);
        cloned.name = v;
        onChange(cloned);
    }

    function onDescriptionChange(v: string) {
        const cloned = cloneDeep(product);
        cloned.description = v;
        onChange(cloned);
    }

    function onCategoryChange(v: string) {
        const cloned = cloneDeep(product);
        cloned.category_id = parseInt(v);
        onChange(cloned);
    }

    function onEnabledChange(v: string) {
        const cloned = cloneDeep(product);
        cloned.enabled = v === "true";
        onChange(cloned);
    }

    function onStockControlChange(v: string) {
        const cloned = cloneDeep(product);
        cloned.stock_control = parseInt(v) as 1 | 2;
        if (cloned.stock_control === 1) {
            cloned.stock = 0;
        }
        onChange(cloned);
    }

    function onStockChange(v: string) {
        const cloned = cloneDeep(product);
        cloned.stock = parseInt(v);
        onChange(cloned);
    }

    return <>
        <Stack>
            <Input label="Name" value={product.name} onChange={onNameChange}></Input>
            <Textarea label="Description (Markdown)" value={product.description} onChange={onDescriptionChange}></Textarea>
            <Select label="Category" value={product.category_id.toString()} onChange={onCategoryChange}>
                {
                    categories.map((category) => <option key={category.id} value={category.id.toString()}>{category.name}</option>)
                }
            </Select>
            <Select label="Enabled" value={product.enabled.toString()} onChange={onEnabledChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </Select>
            <Select label="Stock Control" value={product.stock_control.toString()} onChange={onStockControlChange}>
                <option value="1">Yes</option>
                <option value="2">No</option>
            </Select>
            {
                product.stock_control === 1 && <Input label="Stock" value={product.stock.toString()} onChange={onStockChange}></Input>
            }
        </Stack>
    </>
}