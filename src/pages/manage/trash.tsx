
import { useTitle } from "ahooks"
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useState } from "react"
import styles from "./Common.module.scss"
import { useRequest } from "ahooks"
import { Tag,message,Modal, Typography, Empty ,Spin,Space,Button,Table} from "antd"
import ListPage from "../../components/ListPage"
import ListSearch from "../../components/ListSearch"
import { updateQuestionService,deleteQuestionService } from "../../service/question"
type QuestionItem = {
    _id: string
    title: string
    isPublished: boolean
    answerCount: number
    createdAt: string
}
const {confirm}=Modal
const {Title}=Typography
function Trash(){

    useTitle("老哥爱回收")
    const {data={},loading,refresh}=useLoadQuestionListData({isDeleted:true})
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
    const {run:deleteQuestion}=useRequest(async()=>await deleteQuestionService(selectedIds),
        
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
            for await (const id of selectedIds){
                await updateQuestionService(id,{isDeleted:false})
            }
        },
        {
            manual:true,
            debounceWait:500,
            onSuccess(){
                message.success("恢复成功")
                refresh()
                SetSelectedIds([])
            }
        }
    )
    const TableElem=<>
    <div style={{marginBottom:"16px"}}>
        <Space>
            <Button type="primary" disabled={selectedIds.length===0} onClick={recover}>恢复</Button>
            <Button danger disabled={selectedIds.length===0} onClick={()=>del()}>彻底删除</Button>
        </Space>
    </div>
    <Table dataSource={list} columns={tableColumns} pagination={false} rowKey={q=>q._id} rowSelection={{type:"checkbox",onChange:selectedRowKeys=>{SetSelectedIds(selectedRowKeys as string[])}}} ></Table>
    </>
    return (
        <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>回收站</Title>
            </div>
            <div className={styles.right}>
                <ListSearch/>
            </div>
        </div>
        <div className={styles.content}>
            {
                loading&&(<div style={{textAlign:"center"}}><Spin/></div>)
            }
            {
                !loading&&list.length===0&&<Empty description="暂无数据"/>
                
            }
            {
                list.length>0&&TableElem
            }
        </div>
        <div className={styles.footer}>
            <ListPage total={total}/>
        </div>
        </>
    )
}
export default Trash