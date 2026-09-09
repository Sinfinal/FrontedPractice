import { Checkbox, Form, Input, Select } from "antd";
import type { QuestionTitlePropsType } from "./interface";

function PropComponent(props: QuestionTitlePropsType) {
    const { text, level, isCenter, onChange } = props
    const [form] = Form.useForm()
    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }
    return (
        <Form form={form} layout="vertical" onValuesChange={handleValueChange} initialValues={{ text, level, isCenter }}>
            <Form.Item label="标题内容" name="text" rules={[{ required: true, message: "请输入标题内容" }]}>
                <Input />
            </Form.Item>
            <Form.Item label="层级" name="level">
                <Select options={[
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                ]} />
            </Form.Item>
            <Form.Item name="isCenter" valuePropName="checked">
                <Checkbox>居中显示</Checkbox>
            </Form.Item>
        </Form>
    )
}
export default PropComponent