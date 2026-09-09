import type { FC } from "react"
import QuestionInputConf , { type QuestionInputPropsType } from "./QuestionInput"
import QuestionTitleConf ,{type  QuestionTitlePropsType } from "./QuestionTitle"


export type ComponentPropsType=Omit<QuestionInputPropsType,"onChange">&Omit<QuestionTitlePropsType,"onChange">
export type ComponentConfType={
    title:string
    type:string
    Component:FC<ComponentPropsType>
    PropComponent:FC<ComponentPropsType>
    defaultProps:Partial<ComponentPropsType>
}
const componentConfList:ComponentConfType[]=[QuestionInputConf,QuestionTitleConf]

export const componentConfGroup=[
    {
        groupId:"textGroup",
        groupName:"文本显示",
        components:[QuestionTitleConf],
    },
    {
        groupId:"inputGroup",
        groupName:"用户输入",
        components:[QuestionInputConf]
    }
]
export function getComponentConfByType(type:string){
    return componentConfList.find(c=>c.type===type)
}