import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import Stack from "../components/Stack";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import LoadingError from "../components/LoadingError";
import { login, me } from "../api/auth";
import { UserContext } from "../components/UserContext";

export default function Signin() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPasswrod] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function onSubmit() {
        setLoading(true);
        setError("");
        login(email, password)
            .then(t => {
                localStorage.setItem("token", t);
                return me();
            })
            .then(u => {
                setUser(u);
                navigate("/");
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (user !== null) {
            navigate("/");
        }
    }, [user]);

    if (user !== null) {
        return <></>
    }

    return <>
        <Stack className="max-w-md mx-auto p-3">

            <h1 className="text-3xl font-bold">Sign in</h1>

            <LoadingError loading={loading} error={error}></LoadingError>

            <Input label="Email" value={email} onChange={e => setEmail(e)}></Input>
            <Input label="Password" type="password" value={password} onChange={e => setPasswrod(e)}></Input>
            <Link to="/auth/reset-password" className="text-primary underline">Forget password</Link>

            <Button disabled={loading} onClick={onSubmit}>Sign in</Button>
            <Button variant="outlined">Sign up</Button>

        </Stack >
    </>
}