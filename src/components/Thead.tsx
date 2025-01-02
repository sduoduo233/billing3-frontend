import { ReactNode } from "react";

export default function Thead({ children }: { children?: ReactNode }) {
    return (<thead className="uppercase">
        {children}
    </thead>)
}