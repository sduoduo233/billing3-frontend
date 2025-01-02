import { ReactNode } from "react";

export default function Card({ children, className, title }: { children: ReactNode, className?: string, title?: string }) {
    return <div className={"rounded border-outline border p-3 " + (className || "")}>
        {title !== undefined && <div className="text-2xl font-bold mb-3">{title}</div>}
        {children}
    </div>
}