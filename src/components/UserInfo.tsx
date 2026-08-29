import { LOGIN_PATHNAME } from "../router"
import {Link} from "react-router-dom"
function UserInfo(){
    return (
        <>
        <Link to={LOGIN_PATHNAME}>登录</Link>
        </>
        
    )
}
export default UserInfo