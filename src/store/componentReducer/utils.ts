import type { ComponentInfoType, ComponentsStateType } from ".";

export function getNextSelectedId(fe_id:string,componentList:ComponentInfoType[]){
    const visibleComponentList=componentList.filter(c=>!c.isHidden)
    const index=visibleComponentList.findIndex(c=>c.fe_id===fe_id)
    if (index<0)return ""
    // 优先选中下一个可见组件,没有下一个就选上一个,都没有则不选中
    const newComponent=visibleComponentList[index+1]??visibleComponentList[index-1]
    return newComponent?newComponent.fe_id:""
}
export function insertNewComponent(draft:ComponentsStateType,newComponent:ComponentInfoType){
    const {selectedId,componentList}=draft
    const index=componentList.findIndex(c=>c.fe_id===selectedId)
    if(index<0){
        draft.componentList.push(newComponent)
    }else{
        draft.componentList.splice(index+1,0,newComponent)
    }
    draft.selectedId=newComponent.fe_id
}