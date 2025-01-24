import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function BaseLayout() {
    return <>
        <Navbar></Navbar>

        <div className="px-3">
            <div className='container mx-auto my-5'>
                <Outlet></Outlet>
            </div>
        </div>
    </>
}