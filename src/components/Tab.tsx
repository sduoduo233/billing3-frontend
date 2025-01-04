
interface IProps {
    tabs: string[]
    selected: string
    onSelect: (tab: string) => void
    className?: string
}

export default function Tab({ tabs, selected, onSelect, className }: IProps) {
    return <div className={"flex " + (className || "")}>
        {
            tabs.map(t => <div key={t}>
                <button onClick={() => onSelect(t)} className={selected === t ? "text-primary border-b border-primary p-2 uppercase font-bold" : "p-2 uppercase"}>{t}</button>
            </div>)
        }
    </div>
}