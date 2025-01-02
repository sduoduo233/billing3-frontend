import { ReactNode } from "react";

export default function Td({ children }: { children?: ReactNode }) {
    return (<td className="p-3">{children}</td>)
}