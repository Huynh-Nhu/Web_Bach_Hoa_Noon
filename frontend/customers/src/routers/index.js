import Home from '../pages/Home';


// không cần đăng nhập vẫn xem được
const publicRouters  = [
    {path: '/', component: Home}
]
// phải đăng nhập
const privateRouters = [

]

export {publicRouters, privateRouters}