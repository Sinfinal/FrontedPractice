import { Spin } from "antd"
import { Outlet } from "react-router-dom"
import useLoadUserData from "../hooks/useLoadUserData"
function QuestionLayout(){
    const {waitingUserData}=useLoadUserData()
    
    return (
        <>
        <div style={{height:"100vh"}}>
            {waitingUserData?<div style={{textAlign:"center",marginTop:"60px"}}><Spin/></div>:<Outlet/>}
        </div>
        </>
    )
}
export default QuestionLayout