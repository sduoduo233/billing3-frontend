import { useContext, useState } from "react"
import Button from "./Button"
import { Link } from "react-router";
import { UserContext } from "./UserContext";

export default function Navbar() {
    const [show, setShow] = useState(false);
    const { user } = useContext(UserContext);

    let links = [
        { title: "Home", link: "/" },
        { title: "Store", link: "/" },
    ]

    if (user !== null && user.role === "admin") {
        links = links.concat([
            { title: "Admin", "link": "/admin" }
        ]);
    }

    return <>
        <div className="w-full px-3 border-outline border-b">
            <div className="container flex items-center h-16 gap-3 mx-auto">
                <h1 className="text-xl font-bold">Billing3</h1>

                <nav className="hidden md:block">
                    <ul className="flex gap-3">
                        {
                            links.map(l => <li key={l.title}><Link to={l.link} className="text-on-surface2">{l.title}</Link></li>)
                        }
                    </ul>
                </nav>

                <div className="flex-grow"></div>

                {
                    user === null ?
                        <div className="hidden md:block"><Link to="/auth/signin"><Button>Sign in / Sign up</Button></Link></div> :
                        <div className="hidden md:block"><Link to="/dashboard"><Button>Dashboard</Button></Link></div>
                }


                <span className="material-symbols-outlined md:hidden cursor-pointer select-none" onClick={() => setShow(!show)}>
                    {show ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                </span>
            </div>

            {
                show && <nav className="md:hidden container mx-auto my-2">
                    <ul className="flex flex-col gap-2">
                        {
                            links.map(l => <li key={l.title}><Link to={l.link}>{l.title}</Link></li>)
                        }
                        <li>
                            {
                                user === null ?
                                    <Link to="/auth/signin"><Button>Sign in / Sign up</Button></Link> :
                                    <Link to="/dashboard"><Button>Daskboard</Button></Link>
                            }

                        </li>
                    </ul>
                </nav>
            }
        </div>
    </>
}