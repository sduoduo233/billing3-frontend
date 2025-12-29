import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import Stack from "../components/Stack";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router";
import LoadingError from "../components/LoadingError";
import { me, register2 } from "../api/auth";
import { UserContext } from "../components/UserContext";

export default function Signup2() {
    const { user, setUser } = useContext(UserContext);
    const [token, setToken] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function onSubmit() {
        setLoading(true);
        setError("");
        register2(name, password, token)
            .then(t => {
                localStorage.setItem("token", t);
                document.cookie = `token=${t}; path=/; max-age=31536000`;
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
        const token = searchParams.get("token");
        try {
            if (token && token.split(".").length === 3) {
                JSON.parse(atob(token.split(".")[1]));
                setEmail(JSON.parse(atob(token.split(".")[1]))["sub"] || "");
                setToken(token);
            } else {
                setError("Invalid token");
            }
        } catch (e) {
            console.error(e);
            setError("Invalid token");
        }
    }, [searchParams]);

    useEffect(() => {
        if (user !== null) {
            navigate("/");
        }
    }, [user, navigate]);

    if (user !== null) {
        return <></>
    }

    return <>
        <Stack className="max-w-md mx-auto p-3">

            <h1 className="text-3xl font-bold">Sign up</h1>

            <LoadingError loading={loading} error={error}></LoadingError>

            <Input label="Email" value={email} onChange={e => setEmail(e)} readOnly></Input>

            <Input label="Name" value={name} onChange={e => setName(e)}></Input>

            <Input label="Password" type="password" value={password} onChange={e => setPassword(e)}></Input>

            <Button disabled={loading} onClick={onSubmit}>Sign up</Button>
            
        </Stack >
    </>
}