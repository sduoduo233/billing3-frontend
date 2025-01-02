import { useEffect, useState } from "react";
import Table from "../../../components/Table";
import Tbody from "../../../components/Tbody";
import Td from "../../../components/Td";
import Th from "../../../components/Th";
import Thead from "../../../components/Thead";
import Tr from "../../../components/Tr";
import { getUsers, User } from "../../../api/admin-user";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Pagination from "../../../components/Pagination";
import LoadingError from "../../../components/LoadingError";
import { Link } from "react-router";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    function onSearch() {
        setUsers([]);
        setLoading(true);
        setError("");
        setPage(1);
        getUsers(page, search)
            .then((data) => {
                setUsers(data.users);
                setTotalPages(data.total_pages);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        onSearch();
    }, []);

    return <>
        <h1 className="text-3xl font-bold">Users</h1>

        <LoadingError loading={loading} error={error}></LoadingError>

        <div className="mt-5 flex gap-2">
            <Input placeholder="Serach" value={search} onChange={e => setSearch(e)}></Input>
            <Button onClick={onSearch}>Search</Button>
        </div>

        <Table className="mt-5">
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Role</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    users.map((user) => {
                        return <Tr key={user.id}>
                            <Td>{user.id}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <Link to={"/admin/user/" + user.id} className="text-primary">View</Link>
                            </Td>
                        </Tr>
                    })
                }
            </Tbody>
        </Table>

        <Pagination page={page} total_pages={totalPages} onChange={setPage} className="mt-5"></Pagination>
    </>
}