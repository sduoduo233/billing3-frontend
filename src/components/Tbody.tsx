import { ReactNode } from "react";

export default function Tbody({ children }: { children?: ReactNode }) {
    return (<tbody className="divide-y divide-outline overflow-x-auto">
        {children}
    </tbody>)
}