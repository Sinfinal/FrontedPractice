
import { useTitle } from "ahooks"
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useState } from "react"
import styles from "./Common.module.scss"
import useRequest from "ahooks"
import { Tag,message } from "antd"
type QuestionItem = {
    _id: string
    title: string
    isPublished: boolean
    answerCount: number
    createdAt: string
}
function Trash(){

    useTitle("老哥爱回收")
    const {data={},loading,refresh}=useLoadQuestionListData({isDeleted=true})
    const {list=[],total=0}=data as {list?:QuestionItem[],total?:number}
    const [selectedIds,SetSelectedIds]=useState<string[]>([])
    function del(){
        confirm(
            {
                title:"确认彻底删除问题？",
                icon:<ExclamationCircleOutlined/>,
                content:"删除以后不可以被找回",
                onOk:deleteQuestion
            }
        )
    }
    const tableColumns=[
        {
            title:"标题",
            dataIndex:"title"
        },
        {
            title:"是否发布",
            dataIndex:"isPublished",
            render:(isPublished:boolean)=>{
                return isPublished?<Tag color="processing">已发布</Tag>:<Tag>未发布</Tag>
            }
        },
        {
            title:"答卷",
            dataIndex:"answerCount"
        },
        {
            title:"创建时间",
            dataIndex:"createAt"
        }
    ]
    const {run:recover}=useRequest(
        
        {
            manual:true,
            onSuccess(){
                message.success("删除成功")
                refresh()
                SetSelectedIds([])
            }
        }
    )
    
    const {run:recover}=useRequest(
        async()=>{
            for await
        }
    )

    return (
        <>
        <div className={styles.header}>

        </div>
        </>
    )
}
export default Trash