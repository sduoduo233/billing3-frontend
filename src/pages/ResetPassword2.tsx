import { useEffect, useState } from "react";
import Input from "../components/Input";
import Stack from "../components/Stack";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router";
import LoadingError from "../components/LoadingError";
import { resetPassword2 } from "../api/auth";

export default function ResetPassword2() {
    const [token, setToken] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function onSubmit() {
        setLoading(true);
        setError("");
        resetPassword2(password, token)
            .then(() => {
                navigate("/auth/signin");
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        const token = searchParams.get("token");
        setToken(token || "");
    }, [searchParams]);

    return <>
        <Stack className="max-w-md mx-auto p-3">

            <h1 className="text-3xl font-bold">Reset password</h1>

            <LoadingError loading={loading} error={error}></LoadingError>

            <Input label="New password" type="password" value={password} onChange={e => setPassword(e)}></Input>

            <Button disabled={loading} onClick={onSubmit}>Reset password</Button>
            
        </Stack >
    </>
}
