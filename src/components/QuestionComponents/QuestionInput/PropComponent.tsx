import { Form,Input } from "antd";
import type { QuestionInputPropsType } from "./interface";
import { useEffect } from "react";

function PropComponent(props:QuestionInputPropsType){
    const {title,placeholder,onChange}=props
    const [form]=Form.useForm()

    useEffect(()=>{
        form.setFieldsValue({title,placeholder})
    })
    function handleValueChange(){
        if (onChange){
            onChange(form.getFieldsValue())
        }
    }
    return (
        <Form layout="vertical" initialValues={{title,placeholder}} form={form} onValuesChange={handleValueChange}>

            <Form.Item label="标题" name="title" rules={[{required:true,message:"请输入标题"}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Placeholder" name="placeholder">
                <Input/>
            </Form.Item>
        </Form>
    )
}
export default PropComponent