

export default function Status({ status, large }: { status: string, large?: boolean }) {
    let color = "bg-gray-500";
    switch (status.toUpperCase()) {
        case "ACTIVE": case "COMPLETED": case "PAID": color = "bg-green-500"; break;
        case "CANCELLED": color = "bg-gray-500"; break;
        case "UNPAID": case "DISCARDED": case "SUSPENDED": color = "bg-red-500"; break;
        case "SCHEDULED": case "PENDING": color = "bg-orange-500"; break;
        case "RUNNING": color = "bg-blue-500"; break;
    }
    let size = "";
    if (large === true) size = "text-xl font-bold";
    else size = "font-medium";

    return <span className={"text-white rounded p-1 " + color + " " + size}>{status.toUpperCase()}</span>
}