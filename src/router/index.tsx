import { createBrowserRouter, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import MainLayout from "../layouts/MainLayout"
import ManageLayout from "../layouts/ManageLayout"
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import Register from "../pages/Register"
import List from "../pages/manage/List"
import Star from "../pages/manage/Star"
import Trash from "../pages/manage/trash"
import QuestionLayout from "../layouts/QuestionLayout"
import Edit from "../pages/question/Edit"
import Stat from "../pages/question/Stat"
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
                    },
                    {
                        path:"trash",
                        element:<Trash/>
                    },
                    {
                        path:"edit"
                    }
                ]
            },
            {
                path:"question",
                element:<QuestionLayout/>,
                children:[
                    {
                        path:"edit/:id",
                        element:<Edit/>
                    },
                    {
                        path:"stat/:id",
                        element:<Stat/>
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