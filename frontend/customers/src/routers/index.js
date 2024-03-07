import Home from '../pages/Home';
import Login from "../pages/Login"
import NotFoundPage from '../pages/404';
import ProductDeatail from '../pages/product';
// không cần đăng nhập vẫn xem được
const publicRouters  = [
    {path: '/', component: Home},
    {path: '/login', component: Login, Layout: null},
    {path: '/product', component: ProductDeatail},
    {path: '*', component: NotFoundPage},



]
// phải đăng nhập
const privateRouters = [

]

export {publicRouters, privateRouters}