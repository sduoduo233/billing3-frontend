import { Link } from "react-router";
import Card from "../../components/Card";

export default function Admin() {
    // url, title, icon
    const links = [
        ["/admin/user", "Users", "group"],
        ["/admin/product", "Products", "package_2"],
        ["/admin/service", "Services", "deployed_code"],
        ["/admin/category", "Product categories", "category"],
        ["/admin/server", "Servers", "dns"],
        ["/admin/users", "Payment gateways", "credit_card"],
    ]
    return <>
        <h1 className="font-bold text-3xl mb-3">Admin dashboard</h1>

        <nav>
            <div className="grid grid-cols-1 divide-y divide-outline border-outline border rounded">
                {
                    links.map(v => <div key={v[0]} className="p-3 flex items-center gap-2">
                        <span className="material-symbols-outlined">{v[2]}</span>
                        <Link to={v[0]} className="underline text-primary text-xl">{v[1]}</Link>
                    </div>)
                }
            </div>
        </nav>
    </>
}