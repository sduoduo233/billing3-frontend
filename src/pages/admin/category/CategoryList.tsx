import { useEffect, useState } from "react";
import LoadingError from "../../../components/LoadingError";
import { Category, deleteCategory, getCategories } from "../../../api/admin-category";
import Table from "../../../components/Table";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import Th from "../../../components/Th";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import { Link } from "react-router";
import Delete from "../../../components/Delete";
import Button from "../../../components/Button";

export default function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(0);

    function onDelete(id: number) {
        setLoading(true);
        setError("");
        deleteCategory(id)
            .then(() => setRefresh(refresh + 1))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setLoading(true);
        setError("");
        setCategories([]);
        getCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [refresh]);

    return <>
        <h1 className="text-3xl font-bold">Categories</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        <Link to={"/admin/category/add"}><Button className="mt-5">Add</Button></Link>

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Name</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    categories.map((category) => <Tr key={category.id}>
                        <Td>{category.id}</Td>
                        <Td>{category.name}</Td>
                        <Td>
                            <Link to={`/admin/category/${category.id}`} className="text-primary">Edit</Link>
                            <Delete className="ml-1" onDelete={() => onDelete(category.id)}></Delete>
                        </Td>
                    </Tr>)
                }
            </Tbody>
        </Table>
    </>

}