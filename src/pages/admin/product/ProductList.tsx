import { useEffect, useState } from "react";
import { deleteProduct, getProducts, ProductWithCategoryName } from "../../../api/admin-product";
import LoadingError from "../../../components/LoadingError";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import { Link } from "react-router";
import Delete from "../../../components/Delete";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import { Category, getCategories } from "../../../api/admin-category";


export default function ProductList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<ProductWithCategoryName[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [category, setCategory] = useState("0");

    function search(c: string) {
        setLoading(true);
        setError("");
        getProducts(c)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        setLoading(true);
        setError("");
        setProducts([]);
        setCategories([]);

        getCategories()
            .then((data) => setCategories(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));

        search("0");
    }, []);

    function onDelete(id: number) {
        setLoading(true);
        setError("");
        deleteProduct(id)
            .then(() => setProducts(products.filter((p) => p.id !== id)))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }

    return <>
        <h1 className="text-3xl font-bold">Products</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        <Link to="/admin/product/add"><Button className="mt-5">Add</Button></Link>

        <div className="mt-5 flex gap-2">
            <Select value={category} onChange={setCategory}>
                <option value="0">All Category</option>
                {
                    categories.map((category) => <option key={category.id} value={category.id.toString()}>{category.name}</option>)
                }
            </Select>
            <Button onClick={() => search(category)} disabled={loading}>Search</Button>
        </div>

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Enabled</Th>
                    <Th>Name</Th>
                    <Th>Category</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {products.map((product) => <Tr key={product.id}>
                    <Td>{product.id}</Td>
                    <Td>{product.enabled ? "True" : "False"}</Td>
                    <Td>{product.name}</Td>
                    <Td>{product.category_name}</Td>
                    <Td>
                        <Link to={`/admin/product/${product.id}`} className="text-primary">Edit</Link>
                        <Delete className="ml-1" onDelete={() => onDelete(product.id)}></Delete>
                    </Td>
                </Tr>)}
            </Tbody>
        </Table>
    </>
}