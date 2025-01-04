import { useEffect, useRef } from "react"
import Button from "./Button"

interface IProps {
    open: boolean
    title: string
    children: React.ReactNode
    onClose: () => void
    positiveButton?: string
    onPositiveButtonClick?: () => void
    negativeButton?: string
    onNegativeButtonClick?: () => void
}

export default function Dialog({ open, title, children, onClose, positiveButton, negativeButton, onPositiveButtonClick, onNegativeButtonClick }: IProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current === null) return;
        if (open && !dialogRef.current.open) {
            dialogRef.current.showModal();
        } else if (!open && dialogRef.current.open) {
            dialogRef.current.close();
        }
    }, [open]);

    function onClick(e: React.MouseEvent<HTMLDialogElement, MouseEvent>) {
        if (dialogRef.current === null) return;
        const rect = dialogRef.current.children[0].getBoundingClientRect();
        const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        if (!inside) onClose();
    }

    return <dialog ref={dialogRef} className="bg-transparent backdrop:backdrop-brightness-50" onClick={onClick}>
        <div className="rounded bg-container p-5 text-on-surface">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="mt-2">
                {children}
            </div>
            <div className="mt-2 flex flex-row justify-end gap-2">
                {negativeButton && <Button secondary onClick={() => { onClose(); onNegativeButtonClick && onNegativeButtonClick() }}>{negativeButton}</Button>}
                {positiveButton && <Button onClick={() => { onClose(); onPositiveButtonClick && onPositiveButtonClick() }}>{positiveButton}</Button>}
            </div>
        </div>
    </dialog>
}