import { ReactNode } from "react";

interface IProps {
    children?: ReactNode
    onClick?: () => void
    className?: string
    variant?: "filled" | "outlined"
    disabled?: boolean
    secondary?: boolean
}

export default function Button({ children, onClick, className, variant, disabled, secondary }: IProps) {

    let primaryFilled = "rounded p-2 font-bold text-on-primary transition-colors bg-primary hover:bg-primary2 active:bg-primary3";
    const secondaryFilled = "rounded p-2 font-bold text-on-secondary transition-colors bg-secondary hover:bg-secondary2 active:bg-secondary3";
    const primaryOutlined = "rounded p-2 font-bold text-primary ring-inset ring-1 ring-primary hover:ring-0 active:ring-0 hover:bg-primary2 active:bg-primary3 hover:text-on-primary";
    const secondaryOutlined = "rounded p-2 font-bold text-secondary ring-inset ring-1 ring-secondary hover:ring-0 active:ring-0 hover:bg-secondary2 active:bg-secondary3 hover:text-on-secondary";

    if (disabled === true) {
        primaryFilled = "rounded p-2 font-bold text-on-primary transition-colors bg-gray-300";
    }

    let clazz = className + " ";
    if (variant === "filled" || variant === undefined) {
        clazz += secondary ? secondaryFilled : primaryFilled;
    } else {
        clazz += secondary ? secondaryOutlined : primaryOutlined;
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