import { useDispatch } from "react-redux"
import useGetUserInfo from "./useGetUserInfo"
import { useRequest } from "ahooks"
import { getUserInfoService } from "../service/user"
import { loginReducer } from "../store/UserReducer"
import { useState ,useEffect} from "react"
import type { UserStateType } from "../store/UserReducer"
function useLoadUserData(){
    const dispatch=useDispatch()
    const {username}=useGetUserInfo()
    const [waitingUserData,setWaitingUserData]=useState(!username)
    const {run}=useRequest(getUserInfoService,{
        manual:true,
        onSuccess(result){
            const {username="",nickname=""}=result as UserStateType
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
    },[username, run])
    return {waitingUserData}
}
export default useLoadUserData