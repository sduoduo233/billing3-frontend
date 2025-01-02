import { HTMLInputTypeAttribute } from "react"


interface IProps {
    readOnly?: boolean
    disabled?: boolean
    value?: string
    onChange?: (v: string) => void
    type?: HTMLInputTypeAttribute
    className?: string
    label?: string
    placeholder?: string
    helperText?: string
}

export default function Input(props: IProps) {

    return (
        <div className="flex flex-col">
            {props.label && <label className="mb-1">{props.label}</label>}
            <input
                className={"dark:[color-scheme:dark] rounded bg-surface border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent " + (props.className || "")}
                value={props.value}
                onChange={e => props.onChange && props.onChange(e.target.value)}
                type={props.type === undefined ? "text" : props.type}
                readOnly={props.readOnly === true}
                disabled={props.disabled === true}
                placeholder={props.placeholder}
            ></input>
            {props.helperText && <span className="text-sm text-on-surface2">{props.helperText}</span>}
        </div>
    )
}