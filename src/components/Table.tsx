import { ReactNode } from "react";

export default function Table({ children, className }: { children?: ReactNode, className?: string }) {
    return (
        <table className={"rounded table-auto w-full bg-container divide-y divide-outline " + (className || "")}>
            {children}
        </table>
    )
}