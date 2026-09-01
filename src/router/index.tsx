import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import MainLayout from "../layouts/MainLayout"
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import Register from "../pages/Register"
const RouterConfig=createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/manage",
                element:<ManageLayout/>,
                children:[
                    {
                        path:"/list",
                        element:<List/>
                    },
                    {
                        path:"/star",
                        element:<Star/>
                    },
                    {
                        path:""
                    }
                ]
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