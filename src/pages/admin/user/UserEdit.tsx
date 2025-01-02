import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getUser, User, UserEdit as ApiUserEdit, updateUser } from "../../../api/admin-user";
import Loading from "../../../components/Loading";
import LoadingError from "../../../components/LoadingError";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";

export default function UserEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<ApiUserEdit | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        setError("");
        getUser(parseInt(id!))
            .then((data) => {
                setUser({ ...data, password: "" });
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    function onSubmit() {
        if (!user) return;

        setLoading(true);
        setError("");
        updateUser(parseInt(id!), user)
            .then(() => {
                navigate("/admin/user");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }


    return <>
        <h1 className="text-3xl font-bold">User #{id}</h1>

        <LoadingError className="mt-3" loading={loading} error={error} />

        {
            user && <div className="mt-3 flex flex-col gap-3">
                <Input label="Name" value={user.name} onChange={v => setUser({ ...user, name: v })} className="w-full"></Input>
                <Input label="Email" value={user.email} onChange={v => setUser({ ...user, email: v })} className="w-full"></Input>
                <Input label="Password" value={user.password} onChange={v => setUser({ ...user, password: v })} type="password" className="w-full" helperText="Leave this field empty if you don't wnat to change password."></Input>
                <Select label="Role" value={user.role} onChange={v => setUser({ ...user, role: v as any })} className="w-full">
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                </Select>
                <Input label="Address" value={user.address || ""} onChange={v => setUser({ ...user, address: v })} className="w-full"></Input>
                <Input label="City" value={user.city || ""} onChange={v => setUser({ ...user, city: v })} className="w-full"></Input>
                <Input label="State" value={user.state || ""} onChange={v => setUser({ ...user, state: v })} className="w-full"></Input>
                <Input label="Country" value={user.country || ""} onChange={v => setUser({ ...user, country: v })} className="w-full"></Input>
                <Input label="Zip code" value={user.zip_code || ""} onChange={v => setUser({ ...user, zip_code: v })} className="w-full"></Input>
                <Button onClick={onSubmit}>Save</Button>
            </div>
        }
    </>
}