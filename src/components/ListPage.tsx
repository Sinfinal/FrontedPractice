import { useNavigate, useSearchParams } from "react-router-dom"
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY } from "../constant"
import { useLocation } from "react-router-dom"
import { Pagination } from "antd"

type PropsType={
    total:number
}
function ListPage(props:PropsType){
    const {total}=props
    const [searchParams]=useSearchParams()
    const current =parseInt(searchParams.get(LIST_SEARCH_PARAM_KEY)||"")||1
    const pageSize=parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)||"")||LIST_PAGE_SIZE
    const nav=useNavigate()
    const {pathname}=useLocation()
    function handlePageChange(page:number,pageSize:number){
        searchParams.set(LIST_PAGE_PARAM_KEY,page.toString())
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString())
        nav({
            pathname,
            search:searchParams.toString()
        })
    }

    return <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange}/>
}
export default ListPage