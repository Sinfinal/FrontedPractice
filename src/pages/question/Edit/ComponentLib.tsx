import type { Dispatch } from "@reduxjs/toolkit";
import { Typography } from "antd";
import { addComponent } from "../../../store/componentReducer";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./ComponentLib.module.scss"
import { useDispatch } from "react-redux";
import { componentConfGroup } from "../../../components/QuestionComponents";
const {title} =Typography
function genComponent(c:ComponentConfType,dispatch:Dispatch){
    const {title,type,Component,defaultProps}=c
    function handlerClick(){
        dispatch(
            addComponent({
                fe_id:nanoid(),
                title,
                type,
                props:defaultProps
            })
        )
    }
    return (
        <div key={type} className={styles.wrapper} onClick={handlerClick}>
            <div className={styles.component}>
                <Component/>
            </div>
        </div>
    )
}
function Lib(){
    const dispatch=useDispatch()
    return (
        <div>
            {componentConfGroup.map(group,index)=>{
                const {groupId,groupName,components}=group
                return (
                    <div key={groupId}>
                        <Title level={3} style={{fontSize:"16px",marginTop:index>0}}>

                        </Title>
                    </div>
                )
            }}
        </div>
    )
}