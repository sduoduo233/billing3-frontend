
interface IProps {
    page: number
    total_pages: number
    onChange: (page: number) => void
    className?: string
}

export default function Pagination(props: IProps) {

    const pages = [];
    for (let i = props.page - 2; i <= props.page + 2; i++) {
        if (i < 1 || i > props.total_pages) continue;
        pages.push(i);
    }

    return (
        <div className={"flex gap-2 flex-wrap " + (props.className || "")}>
            <button className="rounded bg-container text-white px-3 py-1" disabled={props.page === 1} onClick={() => props.onChange(props.page - 1)}>
                <span className="material-symbols-outlined text-base">arrow_back</span>
            </button>

            {
                pages[0] > 1 && <button className={"rounded px-3 py-1 bg-container text-white"} onClick={() => props.onChange(1)}>
                    1
                </button>
            }

            {
                pages[0] > 2 && <button className={"rounded px-3 py-1 bg-container text-white"} disabled={true}>
                    ...
                </button>
            }

            {
                pages.map((p) => <button key={p} className={"rounded px-3 py-1 " + (p === props.page ? "bg-primary text-on-primary" : "bg-container text-white")} onClick={() => props.onChange(p)}>
                    {p}
                </button>)
            }

            {
                pages[pages.length - 1] < props.total_pages - 1 && <button className={"rounded px-3 py-1 bg-container text-white"} disabled={true}>
                    ...
                </button>
            }

            {
                pages[pages.length - 1] < props.total_pages && <button className={"rounded px-3 py-1 bg-container text-white"} onClick={() => props.onChange(props.total_pages)}>
                    {props.total_pages}
                </button>
            }

            <button className="rounded bg-container text-white px-3 py-1" disabled={props.page === props.total_pages} onClick={() => props.onChange(props.page + 1)}>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
        </div>
    )
}