import { ReactNode } from "react";

export default function Tr({ children }: { children?: ReactNode }) {
    return (<tr>{children}</tr>)
}