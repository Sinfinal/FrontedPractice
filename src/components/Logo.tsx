import { Link } from "react-router-dom"
import {Space,Typography} from "antd"
import {FormOutlined} from "@ant-design/icons"
import styles from "./Logo.module.scss"
const {Title}=Typography
function Logo(){
    return (
        <div className={styles.container}>
            <Link to="/"/>
            <Space>
                <Title>
                    <FormOutlined/>
                </Title>
                <Title>
                    老哥问卷
                </Title>
            </Space>
        </div>
    )
}
export default Logo