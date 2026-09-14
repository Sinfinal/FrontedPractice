import { useDispatch } from "react-redux"
import useGetComponentInfo from "../../../hooks/useGetComponentInfo"
import { useState, type ChangeEvent } from "react"
import {message} from "antd"
import { changeComponentHidden, changeComponentProps, changeComponentTitle, changeSelectedId, moveComponent, toggleComponentLocked } from "../../../store/componentReducer"
import SortableContainer from "../../../components/DragSortable/SortableContainer"

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
    function changeTitle(event:ChangeEvent<HTMLInputElement>){
        const newTitle=event.target.value.trim()
        if(!newTitle)return
        if(!selectedId)return
        dispatch(changeComponentTitle({fe_id:selectedId,title:newTitle}))
    }
    function changeHidden(fe_id:string,isHidden:boolean){
        dispatch(changeComponentHidden({fe_id,isHidden}))
    }
    function changeLocked(fe_id:string){
        dispatch(toggleComponentLocked({fe_id}))
    }
    const componentListWithId=componentList.map(c=>{
        return {...c,id:c.fe_id}
    })
    function handleDragEnd(oldIndex:number,newIndex:number){
        dispatch(moveComponent({oldIndex,newIndex}))
    }
    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
            {
                componentList.map(c=>{
                    const{fe_id,title,isHidden,isLocked}=c
                    const titleDefaultClassName=styles.title
                    const titleClassName=classNames({
                        [titleDefaultClassName]:true,
                        [selectedClassName]:fe_id===selectedId,
                    })
                    return (
                        <SortableItem key=>

                        </SortableItem>
                    )
                })
            }
        </SortableContainer>
    )

}
export default Layers