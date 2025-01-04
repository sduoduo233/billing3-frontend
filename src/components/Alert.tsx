import { ReactNode } from "react"

interface IProps {
    severity: "info" | "warning" | "error" | "success"
    children: ReactNode
}

export default function Alert({ severity, children }: IProps) {
    const colors = {
        "info": {
            bg: "bg-slate-500",
            text: "text-white"
        },
        "warning": {
            bg: "bg-orange-500",
            text: "text-white"
        },
        "error": {
            bg: "bg-rose-500",
            text: "text-white"
        },
        "success": {
            bg: "bg-green-500",
            text: "text-white"
        }
    }[severity];

    return <div className={`w-full ${colors.bg} rounded flex flex-row p-4 gap-2 items-center`}>
        <span className={"material-symbols-outlined " + colors.text}>error</span>
        <div className={colors.text}>{children}</div>
    </div>
}