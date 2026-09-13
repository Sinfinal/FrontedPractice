import {createSlice, type PayloadAction } from "@reduxjs/toolkit"
export type PageInfoType={
    title:string
    desc?:string
    js?:string
    css?:string
    isPublished?:boolean

}
const INIT_STATE:PageInfoType={
    title:"",
    desc:"",
    js:"",
    css:""
}
const PageInfoSlice=createSlice({
    name:"pageInfo",
    initialState:INIT_STATE,
    reducers:{
        resetPageInfo:(_state:PageInfoType,action:PayloadAction<PageInfoType>)=>{
            return action.payload
        },
        changePageTitle:(state:PageInfoType,action:PayloadAction<string>)=>{
            state.title=action.payload
        }
    }
})
export const {resetPageInfo,changePageTitle}=PageInfoSlice.actions
export default PageInfoSlice.reducer