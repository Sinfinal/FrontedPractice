import { useDispatch } from "react-redux"
import useGetUserInfo from "./useGetUserInfo"
import { useRequest } from "ahooks"
import { getUserInfoService } from "../service/user"
import { loginReducer } from "../store/UserReducer"
import { useState ,useEffect} from "react"
function useLoadUserData(){
    const dispatch=useDispatch()
    const {username}=useGetUserInfo()
    const [waitingUserData,setWaitingUserData]=useState(!username)
    const {run}=useRequest(getUserInfoService,{
        manual:true,
        onSuccess(result){
            const {username,nickname}=result
            dispatch(loginReducer({username,nickname}))
        },
        onFinally(){
            setWaitingUserData(false)
        }
    },)
    useEffect(()=>{
        if (username){
            return 
        }
        run()
    },[username])
    return {waitingUserData}
}
export default useLoadUserData