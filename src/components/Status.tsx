

export default function Status({ status, large }: { status: string, large?: boolean }) {
    let color = "bg-gray-500";
    switch (status) {
        case "UNPAID": color = "bg-red-500"; break;
        case "PAID": color = "bg-green-600"; break;
        case "CANCELLED": color = "bg-gray-500"; break;
        case "ACTIVE": color = "bg-green-500"; break;
        case "SUSPENDED": color = "bg-red-500"; break;
        case "PENDING": color = "bg-gray-500"; break;
    }
    let size = "";
    if (large === true) size = "text-xl font-bold";

    return <span className={"text-white rounded p-1 " + color + " " + size}>{status.toUpperCase()}</span>
}