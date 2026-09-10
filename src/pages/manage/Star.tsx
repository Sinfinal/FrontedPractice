import { useTitle } from "ahooks"
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData"
import styles from "./Common.module.scss"
import { Typography,Spin, Empty } from "antd"
import ListSearch from "../../components/ListSearch"
import QuestionCard from "../../components/QuestionCard"
import ListPage from "../../components/ListPage"
type QuestionItem={
    _id: string
    title: string
    isStar: boolean
    isPublished: boolean
    answerCount: number
    createdAt: string
}
const {Title}=Typography
function Star(){

    useTitle("老哥问卷-星标问卷")
    const {data=[],loading}=useLoadQuestionListData()
    const {list=[],total=0}=data
    return (
        <>

        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>星标问卷</Title>
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
                !loading &&list.length===0&&<Empty description="暂无数据"/>
            }
            {
                list.length>0&&list.map((question:QuestionItem)=>{

                    const {_id}=question
                    return <QuestionCard key={_id} {...question}/>
                })
            }
        </div>
        <div className={styles.footer}>
            <ListPage total={total}/>
        </div>
        </>
    )
}
export default Star