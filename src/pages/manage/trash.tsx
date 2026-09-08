
import { useTitle } from "ahooks"
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData"

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
    


    return <p>Trash</p>
}
export default Trash