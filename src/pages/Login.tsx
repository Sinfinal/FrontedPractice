import { Typography,Space ,Form,Input,Button,Checkbox,message} from "antd"
import {useNavigate,Link} from "react-router-dom"
import styles from "./Login.module.scss"
import { UserAddOutlined } from "@ant-design/icons"
import { MANAGE_INDEX_PATHNAME, REGISTER_PATHNAME } from "../router"
import { useEffect } from "react"
import { useRequest } from "ahooks"
import { loginService } from "../service/user"
import { setToken } from "../utils/user-token"
const {Title}=Typography
const USERNAME_KEY="USERNAME"
const PASSWORD_KEY="PASSWORD"
function rememberUser(username:string,password:string){
    localStorage.setItem(USERNAME_KEY,username)
    localStorage.setItem(PASSWORD_KEY,password)
}
function deleteUserFromStorage(){
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
}
function getUserInformStorage(){
    return {
        username:localStorage.getItem(USERNAME_KEY),
        password:localStorage.getItem(PASSWORD_KEY)
    }
}
function Login(){
    const nav=useNavigate()
    const [form]=Form.useForm()
    useEffect(()=>{
        const {username,password}=getUserInformStorage()
        form.setFieldsValue({username,password})
    },[])
    const {run}=useRequest(async(username,password)=>{
        const data=loginService(username,password)
        return data
    },{
        manual:true,
        onSuccess(data){
            const {token}=data
            setToken(token)
            message.success("登录成功")
            nav(MANAGE_INDEX_PATHNAME)
        }
    })
    function onFinish(value){
        const {username,password,remember}=value
        run(username,password)
        if (remember){
            rememberUser(username,password)
        }else{
            deleteUserFromStorage()
        }

    }
    return (
        <div className={styles.container}>
            <div>
                <Space>
                    <Title level={2}>
                        <UserAddOutlined/>
                    </Title>
                    <Title level={2}>登录</Title>
                </Space>
            </div>
            <div>
                <Form labelCol={{span:6}} wrapperCol={{span:16}} onFinish={onFinish} initialValues={{remember:true}} form={form}>

                    <Form.Item label="用户名" name="username" rules={[{required:true,message:"请输入用户名"},{type:"string",min:5,max:20,message:"长度在5-20之间"},{pattern:/^\w+$/,message:"只能是数字字母下划线"}]}>
                    <Input/>
                    </Form.Item>
                    <Form.Item label="密码" name="password" rules={[{required:true,message:"请输入密码"},{}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:6,span:16}} name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:6,span:16}}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Link to={REGISTER_PATHNAME}/>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default Login