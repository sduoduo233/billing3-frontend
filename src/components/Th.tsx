import { ReactNode } from "react";

export default function Th({ children }: { children?: ReactNode }) {
    return (<td className="p-3 font-bold">{children}</td>)
}