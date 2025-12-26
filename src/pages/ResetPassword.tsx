import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import Stack from "../components/Stack";
import Button from "../components/Button";
import { Link } from "react-router";
import LoadingError from "../components/LoadingError";
import { resetPassword } from "../api/auth";
import { UserContext } from "../components/UserContext";
import Alert from "../components/Alert";

export default function ResetPassword() {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function onSubmit() {
        setLoading(true);
        setError("");
        setSuccess(false);
        resetPassword(email)
            .then(() => {
                setSuccess(true);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (user !== null) {
            setEmail(user.email);
        }
    }, [user]);
    
    return <>
        <Stack className="max-w-md mx-auto p-3">

            <h1 className="text-3xl font-bold">Reset password</h1>

            {success && <Alert severity="success">An email has been sent to your address. Please check your inbox to reset your password.</Alert>}

            <LoadingError loading={loading} error={error}></LoadingError>

            <Input label="Email" value={email} onChange={e => setEmail(e)}></Input>

            <Button disabled={loading} onClick={onSubmit}>Send email</Button>
            
            <Link to="/auth/signin" className="text-primary underline">Sign in</Link>

        </Stack >
    </>
}
