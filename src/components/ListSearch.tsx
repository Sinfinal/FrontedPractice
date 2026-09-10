
import {Input} from "antd"
import { type ChangeEvent,useState,useEffect } from "react"
import { useNavigate, useSearchParams ,useLocation} from "react-router-dom"
import { LIST_SEARCH_PARAM_KEY } from "../constant"

const {Search}=Input

function ListSearch(){
    const [value,setValue]=useState("")
    const nav=useNavigate()
    const {pathname}=useLocation()
    const [searchParams]=useSearchParams()
    useEffect(()=>{
        const curVal=searchParams.get(LIST_SEARCH_PARAM_KEY)
        setValue(curVal)
    })
    function handleChange(e:ChangeEvent<HTMLInputElement>){
        setValue(e.target.value)
    }
    function handleSearch(value:string){
        nav({
            pathname,
            search:`${LIST_SEARCH_PARAM_KEY}=${value}`
        })
    }
    return (
        <Search placeholder="请输入关键字" value={value} onChange={handleChange} onSearch={handleSearch} size="large" style={{width:"200px"}} allowClear/>
    )
    
}
export default ListSearch