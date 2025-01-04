import { useState } from "react";
import Dialog from "./Dialog";


export default function Delete({ onDelete, className }: { onDelete: () => void, className?: string }) {
    const [open, setOpen] = useState(false);

    return <>
        <button className={"text-rose-500 " + (className || "")} onClick={() => setOpen(true)}>Delete</button>
        <Dialog open={open} title="Delete" onClose={() => setOpen(false)} positiveButton="Delete" onPositiveButtonClick={onDelete} negativeButton="Cancel" onNegativeButtonClick={() => setOpen(false)}>
            Are you sure you want to delete this item?
        </Dialog>
    </>

}