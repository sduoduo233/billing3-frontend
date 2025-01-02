import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getUser, User } from "../../../api/admin-user";
import LoadingError from "../../../components/LoadingError";
import Card from "../../../components/Card";
import Button from "../../../components/Button";



export default function UserView() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        setError("");
        getUser(parseInt(id!))
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <>
            <h1 className="text-3xl font-bold">User #{id}</h1>

            <LoadingError className="mt-3" loading={loading} error={error} />

            {
                user && <>
                    <Link to={"/admin/user/" + id + "/edit"}><Button className="mt-3">Edit</Button></Link>

                    <Card title="User information" className="mt-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="font-bold">Name</div>
                                <div>{user.name}</div>
                            </div>
                            <div>
                                <div className="font-bold">Email</div>
                                <div>{user.email}</div>
                            </div>
                            <div>
                                <div className="font-bold">Role</div>
                                <div>{user.role}</div>
                            </div>
                            <div>
                                <div className="font-bold">Addreess</div>
                                <div>{user.address} {user.city} {user.state} {user.country} {user.zip_code}</div>
                            </div>
                        </div>
                    </Card>
                </>
            }

        </>
    );
}