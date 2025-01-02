import Alert from "./Alert"
import Loading from "./Loading"
import Stack from "./Stack"

interface IProps {
    loading?: boolean
    error?: string
    className?: string
}

export default function LoadingError(props: IProps) {
    return <Stack className={"w-full " + (props.className || "")}>
        {
            props.loading === true && <Loading></Loading>
        }
        {
            (props.error !== undefined && props.error !== "") && <Alert severity="error">
                {props.error}
            </Alert>
        }


    </Stack>
}