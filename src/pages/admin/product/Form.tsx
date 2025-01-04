import { Category } from "../../../api/admin-category"
import { ProductEdit } from "../../../api/admin-product"
import Tab from "../../../components/Tab"
import { useState } from "react"
import Basic from "./Basic"
import Pricing from "./Pricing"
import Extension from "./Extension"
import Options from "./Options"

interface IProps {
    onChange: (product: ProductEdit) => void
    product: ProductEdit
    categories: Category[]
    extensions: string[]
}

export default function Form({ onChange, product, categories, extensions }: IProps) {

    const [selectedTab, setSelectedTab] = useState("basic");

    return <>
        <Tab className="my-5" tabs={["basic", "pricing", "extension", "options"]} selected={selectedTab} onSelect={setSelectedTab}></Tab>

        {selectedTab === "basic" && <Basic onChange={onChange} product={product} categories={categories}></Basic>}
        {selectedTab === "pricing" && <Pricing onChange={onChange} product={product}></Pricing>}
        {selectedTab === "extension" && <Extension onChange={onChange} product={product} extensions={extensions}></Extension>}
        {selectedTab === "options" && <Options onChange={onChange} product={product}></Options>}
    </>
}