

interface IProps {
    readOnly?: boolean
    disabled?: boolean
    value?: string
    onChange?: (v: string) => void
    className?: string
    label?: string
    placeholder?: string
    helperText?: string
    rows?: number
}

export default function Textarea(props: IProps) {

    return (
        <div className="flex flex-col">
            {props.label && <label className="mb-1">{props.label}</label>}
            <textarea
                className={"dark:[color-scheme:dark] rounded bg-surface border-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent " + (props.className || "")}
                value={props.value}
                onChange={e => props.onChange && props.onChange(e.target.value)}
                readOnly={props.readOnly === true}
                disabled={props.disabled === true}
                placeholder={props.placeholder}
                rows={props.rows || 5}
            ></textarea>
            {props.helperText && <span className="text-sm text-on-surface2">{props.helperText}</span>}
        </div>
    )
}