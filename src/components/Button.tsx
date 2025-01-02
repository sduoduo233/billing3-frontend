import { ReactNode } from "react";

interface IProps {
    children?: ReactNode
    onClick?: () => void
    className?: string
    variant?: "filled" | "outlined"
    disabled?: boolean
}

export default function Button({ children, onClick, className, variant, disabled }: IProps) {
    let clazz = "rounded p-2 font-bold text-on-primary transition-colors " + (className || "");

    if (variant === undefined || variant === "filled") {
        clazz += " bg-primary"
        if (!disabled) {
            clazz += " hover:bg-primary2 active:bg-primary3"
        }
    } else {
        clazz += " text-primary ring-inset ring-1 ring-primary"
        if (!disabled) {
            clazz += " hover:ring-0 active:ring-0 hover:bg-primary2 active:bg-primary3 hover:text-on-primary"
        }
    }

    if (disabled) {
        clazz += " saturate-50"
    }

    return <button
        type="button"
        onClick={() => { if (onClick !== undefined) onClick(); }}
        className={clazz}
        disabled={disabled}
    >
        {children}
    </button>
}