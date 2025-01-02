import { Link, Outlet } from "react-router";
import Navbar from "./Navbar";

export default function AdminLayout() {
    return <>
        <Navbar></Navbar>

        <div className="w-full px-3 border-outline border-b">
            <div className="container flex items-center h-12 gap-3 mx-auto">
                <nav>
                    <ul className="flex gap-3">
                        <Link to={"/"} className="text-on-surface">Users</Link>
                        <Link to={"/"} className="text-on-surface">Services</Link>
                        <Link to={"/"} className="text-on-surface">Packages</Link>
                        <Link to={"/"} className="text-on-surface">Users</Link>
                        <Link to={"/"} className="text-on-surface">Users</Link>
                        <Link to={"/"} className="text-on-surface">Users</Link>
                        <Link to={"/"} className="text-on-surface">Users</Link>
                    </ul>
                </nav>
            </div>

        </div>

        <div className="px-3">
            <div className='container mx-auto mt-5'>
                <Outlet></Outlet>
            </div>
        </div>

    </>
}