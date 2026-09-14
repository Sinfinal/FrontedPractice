import type { ComponentPropsType } from "../../components/QuestionComponents"
import {createSlice, nanoid, type PayloadAction} from "@reduxjs/toolkit"
import { getNextSelectedId, insertNewComponent } from "./utils"
import cloneDeep from 'lodash.clonedeep'
import { arrayMove } from "@dnd-kit/sortable"
export type ComponentInfoType={
    fe_id:string
    type:string
    title:string
    isHidden?:boolean
    isLocked?:boolean
    props:Partial<ComponentPropsType>
}
export type ComponentsStateType={
    selectedId:string
    componentList:Array<ComponentInfoType>
    copiedComponent:ComponentInfoType|null
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
        changeComponentProps:(state:ComponentsStateType,action:PayloadAction<{id:string,newProps:Partial<ComponentPropsType>}>)=>{
            const {id,newProps}=action.payload
            const curComp=state.componentList.find(c=>c.fe_id===id)
            if (curComp){
                curComp.props={
                    ...curComp.props,
                    ...newProps
                }
            }
        },
        removeSelectedComponent:(state:ComponentsStateType)=>{
            const {componentList,selectedId:removeId}=state
            const index=componentList.findIndex(c=>c.fe_id===removeId)
            if (index<0)return
            // 先在"还包含被删组件"的列表里算出下一个选中项,再删除
            const newSelectedId=getNextSelectedId(removeId,componentList)
            state.selectedId=newSelectedId
            componentList.splice(index,1)
        },
        changeComponentHidden:(state:ComponentsStateType,action:PayloadAction<{fe_id:string,isHidden:boolean}>)=>{
            const {componentList}=state
            const {fe_id,isHidden}=action.payload
            // 隐藏时把选中项移到相邻的可见组件;显示时直接选中该组件
            const newSelectedId=isHidden?getNextSelectedId(fe_id,componentList):fe_id
            state.selectedId=newSelectedId
            const curComp=componentList.find(c=>c.fe_id===fe_id)
            if(curComp){
                curComp.isHidden=isHidden
            }
        },
        toggleComponentLocked:(state:ComponentsStateType,action:PayloadAction<{fe_id:string,}>)=>{
            const {fe_id}=action.payload
            const curComp=state.componentList.find(c=>c.fe_id===fe_id)
            if(curComp){
                curComp.isLocked=!curComp.isLocked
            }
        },
        copySelectedComponent:(state:ComponentsStateType)=>{
            const {selectedId,componentList=[]}=state
            const selectedComponent=componentList.find(c=>c.fe_id===selectedId)
            if(selectedComponent==null)return
            state.copiedComponent=cloneDeep(selectedComponent)
        },
        pasteCopiedComponent:(state:ComponentsStateType)=>{
            const {copiedComponent}=state
            if(copiedComponent==null)return
            copiedComponent.fe_id=nanoid()
            insertNewComponent(state,copiedComponent)
        },
        selectPrevComponent:(state:ComponentsStateType)=>{
            const {selectedId,componentList}=state
            const selectedIndex=componentList.findIndex(c=>c.fe_id===selectedId)
            if(selectedIndex<0)return
            if(selectedIndex<=0)return
            state.selectedId=componentList[selectedIndex-1].fe_id
        },
        selectNextComponent:(state:ComponentsStateType)=>{
            const {selectedId,componentList}=state
            const selectedIndex=componentList.findIndex(c=>c.fe_id===selectedId)
            if (selectedIndex<0)return 
            if(selectedIndex+1===componentList.length)return
            state.selectedId=componentList[selectedIndex+1].fe_id
        },
        changeComponentTitle:(state:ComponentsStateType,action:PayloadAction<{fe_id:string,title:string}>)=>{
            const {title,fe_id}=action.payload
            const curComp=state.componentList.find(c=>c.fe_id===fe_id)
            if(curComp)curComp.title=title
        },
        moveComponent:(state:ComponentsStateType,action:PayloadAction<{oldIndex:number,newIndex:number}>)=>{
            const {componentList:curComponentList}=state
            const {oldIndex,newIndex}=action.payload
            state.componentList=arrayMove(curComponentList,oldIndex,newIndex)
        }

    }
})
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions
export default componentsSlice.reducer