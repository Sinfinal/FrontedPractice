import { createBrowserRouter, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import MainLayout from "../layouts/MainLayout"
import ManageLayout from "../layouts/ManageLayout"
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import Register from "../pages/Register"
import List from "../pages/manage/List"
import Star from "../pages/manage/Star"
const RouterConfig=createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"manage",
                element:<ManageLayout/>,
                children:[
                    {
                        index:true,
                        element:<Navigate to="/manage/list" replace/>
                    },
                    {
                        path:"list",
                        element:<List/>
                    },
                    {
                        path:"star",
                        element:<Star/>
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
export const REGISTER_PATHNAME="/register"
