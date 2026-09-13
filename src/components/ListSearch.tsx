
import {Input} from "antd"
import { type ChangeEvent,useState } from "react"
import { useNavigate, useSearchParams ,useLocation} from "react-router-dom"
import { LIST_SEARCH_PARAM_KEY } from "../constant"

const {Search}=Input

function ListSearch(){
    const nav=useNavigate()
    const {pathname}=useLocation()
    const [searchParams]=useSearchParams()
    const keyword=searchParams.get(LIST_SEARCH_PARAM_KEY)||""
    const [value,setValue]=useState(keyword)
    // 当 URL 中的关键字变化时（页面跳转 / 点击搜索引起）,再同步到输入框
    // setState 放在渲染期间完成,避免在 effect 中同步 setState
    const [prevKeyword,setPrevKeyword]=useState("")
    if (keyword!==prevKeyword){
        setPrevKeyword(keyword)
        setValue(keyword)
    }
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