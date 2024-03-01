import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Staff from '../pages/Staff'
import setPassword from '../pages/setPassword';
import ProductCategory from "../pages/ProductCategory"
import Brand from "../pages/Brands"
import Product from "../pages/Products"
import ProductAdd from "../pages/productAdd"
import ListProduct from "../pages/ListProducts"
import UpdateProductPage from '../pages/updateProduct';
// không cần đăng nhập vẫn xem được
const publicRouters  = [
    {path: '/', component: Home},
    {path: '/register', component: Register, Layout: null},
    {path: '/login', component: Login, Layout: null},
    {path: '/Staff', component: Staff},
    {path: '/passStaff', component: setPassword},
    {path: '/brand', component: Brand},
    {path: '/category', component: ProductCategory},
    {path: '/:id/product', component: Product},
    {path: '/productAdd', component: ProductAdd},
    {path: '/productList', component: ListProduct},
    {path: '/updateProduct', component: UpdateProductPage},











]


export {publicRouters}