import { ReactNode } from "react"


interface IProps {
    disabled?: boolean
    value: string
    onChange?: (v: string) => void
    className?: string
    children: ReactNode
    label?: string
    helperText?: string
}

export default function Select(props: IProps) {
    return <div className="flex flex-col">
        {props.label && <label className="mb-1">{props.label}</label>}
        <select
            className={"dark:[color-scheme:dark] rounded bg-surface border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent " + (props.className || "")}
            value={props.value}
            onChange={e => props.onChange && props.onChange(e.target.value)}
            disabled={props.disabled === true}
        >
            {props.children}
        </select>
        {props.helperText && <span className="text-sm text-on-surface2">{props.helperText}</span>}
    </div>
}