import { useParams } from "react-router-dom";
import {getQuestionService} from "../service/question"
import {useRequest} from "ahooks"

function useLoadQuestionData(){
    const {id=""}=useParams()
    // const [loading,setLoading]=useState(true)
    // const [questionData,setQuestionData]=useState({})
    // useEffect(()=>{
    //     async function fn(){
    //         const data=getQuestionService(id)
    //         setQuestionData(data)
    //         setLoading(false)
    //     }
    //     fn()
    // },[])
    // return {loading,questionData}
    
    const {loading ,data,error}=useRequest(()=>getQuestionService(id))
    return {loading ,data,error}
}
export default useLoadQuestionData