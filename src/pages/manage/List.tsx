import { useDebounceFn, useRequest, useTitle } from "ahooks"
import styles from "./Common.module.scss"
import { Typography,Spin, Empty } from "antd"
import ListSearch from "../../components/ListSearch"
import { useEffect, useMemo, useRef, useState } from "react"
import QuestionCard from "../../components/QuestionCard"
import { getQuestionListService } from "../../service/question"
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant"
import { useSearchParams } from "react-router-dom"
type QuestionItem={
    _id:string
    title:string
    isStar: boolean
    isPublished: boolean
    answerCount: number
    createdAt: string
}
const {Title} =Typography
function List(){
    useTitle("老哥问卷，懂你的问卷")
    const [list,setList]=useState<QuestionItem[]>([])
    const [started,setStarted]=useState(false)
    const [total,setTotal]=useState(0)
    const [page,setPage]=useState(1)
    const [searchParams]=useSearchParams()
    const haveMoreData=total>list.length
    const keyword=searchParams.get(LIST_SEARCH_PARAM_KEY)||""
    const containerRef=useRef<HTMLDivElement>(null)
    const {run:load,loading}=useRequest(async()=>{
        const data=getQuestionListService({keyword,page:page,pageSize:LIST_PAGE_SIZE})
        return data
    },{
        manual:true,
        onSuccess(data){
            const list=(data.list as QuestionItem[]|undefined)||[]
            const total=(data.total as number)||0
            setTotal(total)
            setList(list)
            setPage(page+1)
        }
    })
    const {run:tryLoadMore}=useDebounceFn(()=>{
        const elem=containerRef.current
        if (elem==null)return
        const domReact=elem.getBoundingClientRect()
        if (domReact==null)return
        const {bottom}=domReact
        if (bottom<=document.body.clientHeight){
            load()
            setStarted(true)
        }
    },{
        wait:1000
    })
    useEffect(()=>{
        tryLoadMore()
    },[searchParams, tryLoadMore])
    useEffect(()=>{
        if (haveMoreData){
            window.addEventListener("scroll",tryLoadMore)
        }
        return ()=>{
            window.removeEventListener("scroll",tryLoadMore)
        }
    }
    ,[searchParams, haveMoreData, tryLoadMore])
    const LoadMoreContentElem=useMemo(()=>{
        if (!started||loading)return <Spin></Spin>
        if (total==0)return <Empty description="暂无数据"/>
        if (!haveMoreData)return <span>没有更多了</span>
        return <span>开始加载下一页</span>
    },[started,loading,total,haveMoreData])
    return (
        <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>我的问卷</Title>
            </div>
            <div className={styles.right}>
                <ListSearch/>
            </div>
        </div>
        <div className={styles.content}>
            {list.length>0 && list.map((question:QuestionItem)=>{
                const {_id}=question
                return <QuestionCard key={_id} {...question}/>
            })}
        </div>        
        <div className={styles.footer}>
            <div ref={containerRef}>
                {LoadMoreContentElem}
            </div>
        </div>
        </>
    )
}
export default List