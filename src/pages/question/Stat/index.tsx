import { useNavigate } from "react-router-dom"
import useLoadQuestionData from "../../../hooks/useLoadQuestionData"
import useGetPageInfo from "../../../hooks/useGetPageInfo"
import { useState } from "react"
import { useTitle } from "ahooks"
import { Button, Result, Spin } from "antd"
import styles from "./index.module.scss"

function Stat(){
    const nav=useNavigate()
    const {title,isPublished}=useLoadQuestionData()
    const {title,isPublished}=useGetPageInfo()

    const [selectedComponentId,setSelectedComponentId]=useState("")
    const [selectedComponentType,setSelectedComponentType]=useState("")
    useTitle(`问卷统计-${title}`)
    const loadingElem=(
        <div style={{textAlign:"center",marginTop:"60px"}}>
            <Spin/>
        </div>
    )
    function genContentElem(){
        if(typeof isPublished==="boolean" &&!isPublished){
            return(
                <div style={{flex:"1"}}>
                    <Result
                    status="warning"
                    title="该页面尚未发布"
                    extra={
                        <Button type="primary" onClick={()=>nav(-1)}>返回</Button>
                    }
                    >
                    </Result>
                </div>
            )
        }
    
    return(
        <>
        <div className={styles.left}>
            
        </div>
        <div className={styles.main}>

        </div>
        <div className={styles.right}>
            
        </div>
        
        </>
    )
}
    return (
        <div className={styles.container}>
            header
            <div className={styles["content-wrapper"]}>
                {loading&&loadingElem}
                {!loading&&<div className={styles.content}>{genContentElem()}</div>}
            </div>
        </div>
    )
}
export default Stat