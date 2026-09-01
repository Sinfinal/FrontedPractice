import { useSearchParams } from "react-router-dom"
import { LIST_SEARCH_PARAM_KEY } from "../constant"
import { getQuestionListService } from "../service/question"
import { useRequest } from "ahooks"


type OptionType={
    isStar:boolean
    isDeleted:boolean
} 
function useLoadQuestionListData(opt:Partial<OptionType>={}){
    const {isStar=false,isDeleted=false}=opt
    const [searchParams]=useSearchParams()
    const keyword=searchParams.get(LIST_SEARCH_PARAM_KEY)||""
    const {data,loading,error}=useRequest(()=>getQuestionListService({keyword,isStar,isDeleted}),{refreshDeps:[searchParams]})
    return {data,loading,error}
}
export default useLoadQuestionListData