import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import './components/Navbar'
import Index from './pages/Index'
import BaseLayout from './components/BaseLayout'
import Signin from './pages/Signin'
import { UserContext } from './components/UserContext'
import { useEffect, useState } from 'react'
import { me, Me } from './api/auth'
import Loading from './components/Loading'
import Admin from './pages/admin/Admin'
import AdminLayout from './components/AdminLayout'

function App() {
    const [user, setUser] = useState<Me | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        me()
            .then(u => setUser(u))
            .catch(e => console.error(e))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="m-5">
            <Loading></Loading>
        </div>
    }


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<BaseLayout />}>
                        <Route index element={<Index />}></Route>
                        <Route path='auth/signin' element={<Signin />}></Route>
                        <Route path='admin'>
                            <Route index element={<Admin />}></Route>
                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </UserContext.Provider >
    )
}

export default App
