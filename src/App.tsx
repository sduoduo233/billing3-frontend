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
import UserList from './pages/admin/user/UserList'
import UserView from './pages/admin/user/UserView'
import UserEdit from './pages/admin/user/UserEdit'
import CategoryList from './pages/admin/category/CategoryList'
import { NotFound } from './pages/NotFound'
import CategoryEdit from './pages/admin/category/CategoryEdit'
import CategoryAdd from './pages/admin/category/CategoryAdd'
import ProductList from './pages/admin/product/ProductList'
import ProductAdd from './pages/admin/product/ProductAdd'
import ProductEdit from './pages/admin/product/ProductEdit'

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
                    <Route path='*' element={<NotFound></NotFound>}></Route>
                    <Route path='/' element={<BaseLayout />}>
                        <Route index element={<Index />}></Route>
                        <Route path='auth/signin' element={<Signin />}></Route>
                        <Route path='admin'>
                            <Route index element={<Admin />}></Route>

                            <Route path='user' element={<UserList />}></Route>
                            <Route path='user/:id' element={<UserView />}></Route>
                            <Route path='user/:id/edit' element={<UserEdit />}></Route>

                            <Route path='category' element={<CategoryList />}></Route>
                            <Route path='category/:id' element={<CategoryEdit />}></Route>
                            <Route path='category/add' element={<CategoryAdd />}></Route>

                            <Route path='product' element={<ProductList />}></Route>
                            <Route path='product/add' element={<ProductAdd />}></Route>
                            <Route path='product/:id' element={<ProductEdit />}></Route>
                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </UserContext.Provider >
    )
}

export default App
