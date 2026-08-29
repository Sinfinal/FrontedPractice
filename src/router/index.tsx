import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import MainLayout from "../layouts/MainLayout"
import NotFound from "../pages/NotFound"
const RouterConfig=createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            }
        ]
    },
    {
        path:"*",
        element:<NotFound/>

    }
])
export default RouterConfig
export const HOME_PATHNAME="/"
export const LOGIN_PATHNAME="/login"
export const MANAGE_INDEX_PATHNAME="/manage/list"