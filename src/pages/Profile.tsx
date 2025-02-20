import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import Stack from "../components/Stack";
import { me, Me, updateProfile } from "../api/auth";
import LoadingError from "../components/LoadingError";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { UserContext } from "../components/UserContext";


export default function Profile() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [user, setUser] = useState<Me | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setUser(null);
        setLoading(true);
        setError("");
        me()
            .then(u => setUser(u))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    function onSubmit() {
        if (!user) return;

        setLoading(true);
        setError("");
        
        updateProfile(user)
            .then(() => me())
            .then(u => {
                userContext.setUser(u);
                navigate("/dashboard");
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));

    }


    return <>
        <h1 className="text-3xl font-bold">Profile</h1>

        <LoadingError loading={loading} error={error} />

        {user && <Stack className="mt-3">
            <Input label="Name" value={user.name} onChange={e => setUser({...user, name: e})}></Input>
            <Input label="Email" value={user.email} readOnly></Input>
            <Input label="Address" value={user.address || ""} onChange={e => setUser({...user, address: e})}></Input>
            <Input label="City" value={user.city || ""} onChange={e => setUser({...user, city: e})}></Input>
            <Input label="State" value={user.state || ""} onChange={e => setUser({...user, state: e})}></Input>
            <Input label="Country" value={user.country || ""} onChange={e => setUser({...user, country: e})}></Input>
            <Input label="Zip Code" value={user.zip_code || ""} onChange={e => setUser({...user, zip_code: e})}></Input>
            <div><Button onClick={onSubmit}>Save</Button></div>
        </Stack>}

    </>
}