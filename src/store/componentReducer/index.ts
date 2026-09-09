import type { ComponentPropsType } from "../../components/QuestionComponents"
import {createSlice, type PayloadAction} from "@reduxjs/toolkit"
export type ComponentInfoType={
    fe_id:string
    type:string
    title:string
    props:ComponentPropsType
}
export type ComponentsStateType={
    selectedId:string
    componentList:Array<ComponentInfoType>
}
const INIT_STATE:ComponentsStateType={
    selectedId:"",
    componentList:[],
}
export const componentsSlice=createSlice({
    name:"components",
    initialState:INIT_STATE,
    reducers:{
        resetComponents:(_state:ComponentsStateType,action:PayloadAction<ComponentsStateType>)=>{
            return action.payload
        },
        changeSelectedId:(state:ComponentsStateType,action:PayloadAction<string>)=>{
            state.selectedId=action.payload
        },
        addComponent:(state:ComponentsStateType,action:PayloadAction<ComponentInfoType>)=>{
            const newComponent=action.payload
            const {selectedId,componentList}=state
            const index=componentList.findIndex(c=>c.fe_id===selectedId)
            if (index<0){
                state.componentList.push(newComponent)
            }else{
                state.componentList.splice(index+1,0,newComponent)
            }
            state.selectedId=newComponent.fe_id
        },
        changeComponentProps:(state:ComponentsStateType,action:PayloadAction<{id:string,newProps:ComponentPropsType}>)=>{
            const {id,newProps}=action.payload
            const curComp=state.componentList.find(c=>c.fe_id===id)
            if (curComp){
                curComp.props={
                    ...curComp.props,
                    ...newProps
                }
            }
        }

    }
})
export const {resetComponents,changeSelectedId,addComponent,changeComponentProps}=componentsSlice.actions
export default componentsSlice.reducer