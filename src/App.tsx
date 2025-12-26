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
import AdminCategoryList from './pages/admin/category/CategoryList'
import CategoryList from './pages/store/CategoryList'
import { NotFound } from './pages/NotFound'
import CategoryEdit from './pages/admin/category/CategoryEdit'
import CategoryAdd from './pages/admin/category/CategoryAdd'
import AdminProductList from './pages/admin/product/ProductList'
import ProductAdd from './pages/admin/product/ProductAdd'
import ProductEdit from './pages/admin/product/ProductEdit'
import AdminInvoiceList from './pages/admin/invoice/InvoiceList'
import ProductList from './pages/store/ProductList'
import Order from './pages/store/Order'
import InoivceEdit from './pages/admin/invoice/InvoiceEdit'
import ServerList from './pages/admin/server/ServerList'
import { ServerAdd } from './pages/admin/server/ServerAdd'
import { ServerEdit } from './pages/admin/server/ServerEdit'
import { GatewayEdit } from './pages/admin/gateway/GatewayEdit'
import GatewayList from './pages/admin/gateway/GatewayList'
import InvoiceList from './pages/invoice/InvoiceList'
import Dashboard from './pages/Dashboard'
import InvoiceView from './pages/invoice/InvoiceView'
import AdminServiceList from './pages/admin/service/ServiceList'
import AdminServiceView from './pages/admin/service/ServiceView'
import ServiceList from './pages/service/ServiceList'
import ServiceView from './pages/service/ServiceView'
import Logout from './pages/Logout'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Signup2 from './pages/Signup2'
import ResetPassword from './pages/ResetPassword'
import ResetPassword2 from './pages/ResetPassword2'

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
                        <Route path='auth/logout' element={<Logout />}></Route>
                        <Route path='auth/signup' element={<Signup />}></Route>
                        <Route path='auth/register2' element={<Signup2 />}></Route>
                        <Route path='auth/reset-password' element={<ResetPassword />}></Route>
                        <Route path='auth/reset-password2' element={<ResetPassword2 />}></Route>

                        <Route path="store">
                            <Route index element={<CategoryList></CategoryList>}></Route>
                            <Route path=':id' element={<ProductList></ProductList>}></Route>
                            <Route path='product/:id' element={<Order></Order>}></Route>
                        </Route>

                        <Route path='dashboard'>
                            <Route index element={<Dashboard />}></Route>

                            <Route path='invoice' element={<InvoiceList />}></Route>
                            <Route path='invoice/:id' element={<InvoiceView />}></Route>

                            <Route path='service' element={<ServiceList />}></Route>
                            <Route path='service/:id' element={<ServiceView />}></Route>

                            <Route path='profile' element={<Profile></Profile>}></Route>
                        </Route>

                        <Route path='admin'>
                            <Route index element={<Admin />}></Route>

                            <Route path='user' element={<UserList />}></Route>
                            <Route path='user/:id' element={<UserView />}></Route>
                            <Route path='user/:id/edit' element={<UserEdit />}></Route>

                            <Route path='category' element={<AdminCategoryList />}></Route>
                            <Route path='category/:id' element={<CategoryEdit />}></Route>
                            <Route path='category/add' element={<CategoryAdd />}></Route>

                            <Route path='product' element={<AdminProductList />}></Route>
                            <Route path='product/add' element={<ProductAdd />}></Route>
                            <Route path='product/:id' element={<ProductEdit />}></Route>

                            <Route path='invoice' element={<AdminInvoiceList />}></Route>
                            <Route path='invoice/:id' element={<InoivceEdit />}></Route>

                            <Route path='server' element={<ServerList></ServerList>}></Route>
                            <Route path='server/add' element={<ServerAdd />}></Route>
                            <Route path='server/:id' element={<ServerEdit />}></Route>

                            <Route path='gateway' element={<GatewayList></GatewayList>}></Route>
                            <Route path='gateway/:id' element={<GatewayEdit />}></Route>

                            <Route path='service' element={<AdminServiceList />}></Route>
                            <Route path='service/:id' element={<AdminServiceView />}></Route>
                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </UserContext.Provider >
    )
}

export default App
