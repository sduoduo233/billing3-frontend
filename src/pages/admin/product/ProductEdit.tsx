import { useEffect, useState } from "react";
import { Category, getCategories } from "../../../api/admin-category";
import { ProductEdit as ApiProductEdit, getExtensions, getProduct, updateProduct } from "../../../api/admin-product";
import LoadingError from "../../../components/LoadingError";
import Form from "./Form";
import Button from "../../../components/Button";
import { useNavigate, useParams } from "react-router";

export default function ProductEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [product, setProduct] = useState<ApiProductEdit | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [extensions, setExtensions] = useState<string[]>([]);

    useEffect(() => {
        setLoading(true);
        setError("");
        setCategories([]);

        getCategories()
            .then((data) => {
                setCategories(data);
                return getExtensions();
            })
            .then((data) => {
                setExtensions(data);
                return getProduct(parseInt(id!));
            })
            .then((data) => setProduct(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    function onSubmit() {
        if (!product) return;
        setLoading(true);
        setError("");
        updateProduct(parseInt(id!), product)
            .then(() => {
                navigate("/admin/product");
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }

    return <>
        <h1 className="text-3xl font-bold">Edit Product #{id}</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        {
            product && <>
                <Form product={product} categories={categories} onChange={setProduct} extensions={extensions}></Form>
                <Button className="mt-5" onClick={onSubmit}>Save</Button>
            </>
        }

    </>
}