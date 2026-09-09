import axios,{type ResDataType} from "./ajax"
type SearchOption={
    keyword:string
    isStar:boolean
    isDeleted:boolean
    page:number
    pageSize:number
}
export async function getQuestionService(id:string):Promise<ResDataType>{
    const url=`/api/question/${id}`
    return axios.get(url).then(res=>res.data as ResDataType)
}
export async function createQuestionService():Promise<ResDataType>{
    const url="/api/question"
    const data=(await axios.post(url)) as ResDataType
    return data 
}
export async function getQuestionListService(opt:Partial<SearchOption>={}):Promise<ResDataType>{
    const url="/api/question"
    const data=(await axios.get(url,{params:opt})) as ResDataType
    return data

}
export async function updateQuestionService(id:string,opt:Record<string,unknown>){
    const url=`/api/question/${id}`
    const data=(await axios.patch(url,opt)) as ResDataType
    return data
}
export async function deleteQuestionService(ids:string[]):Promise<ResDataType>{
    const url="/api/question"
    const data=(await axios.delete(url,{data:{ids}})) as ResDataType
    return data
}