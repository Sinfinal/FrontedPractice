import { Typography } from "antd";
import type { QuestionTitlePropsType } from "./interface";

const {Title}=Typography
function QuestionTitle(props:QuestionTitlePropsType){
    const {text="",level=1,isCenter=false}=props
    const genFontSize=(level:number)=>{
        if(level===1)return "24px"
        if(level===2)return "20px"
        if(level===3)return "16px"
        return "16px"
    }
    return <div>
        <Title level={level} style={{textAlign:isCenter?"center":"start",marginBottom:"0",fontSize:genFontSize(level)}}>
            {text}
        </Title>
    </div>
}
export default QuestionTitle