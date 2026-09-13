import { useDispatch } from "react-redux"
import useGetComponentInfo from "../../../hooks/useGetComponentInfo"
import { useState, type ChangeEvent } from "react"
import {message} from "antd"
import { changeComponentProps, changeSelectedId } from "../../../store/componentReducer"

function Layers(){
    const {componentList,selectedId}=useGetComponentInfo()
    const dispatch=useDispatch()
    const [changingTitleId,setChangingTitleId]=useState("")
    function handleTitleClick(fe_id:string){
        const curComp=componentList.find(c=>c.fe_id===fe_id)
        if(curComp&&curComp.isHidden){
            message.info("不能选中隐藏的组件")
            return
        }
        if(fe_id!==selectedId){
            dispatch(changeSelectedId(fe_id))
            setChangingTitleId("")
            return
        }
        setChangingTitleId(fe_id)
    }
    function changeComponentTitle(event:ChangeEvent<HTMLInputElement>){
        const newTitle=event.target.value.trim()
        if(!newTitle)return
        if(!selectedId)return
        dispatch(changeComponentTitle)
    }
    return (

    )

}
export default Layers