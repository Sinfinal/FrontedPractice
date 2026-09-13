import { Link } from "react-router-dom"
import { Space, Typography } from "antd"
import { FormOutlined } from "@ant-design/icons"
import styles from "./Logo.module.scss"
import useGetUserInfo from "../hooks/useGetUserInfo"
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router/paths"
const { Title } = Typography
function Logo() {
    const {username}=useGetUserInfo()
    const pathname=username?MANAGE_INDEX_PATHNAME:HOME_PATHNAME
    return (
        <div className={styles.container}>
            <Link to={pathname} >
            <Space>
<Title>
                <FormOutlined />
            </Title>
            <Title >老哥问卷</Title>
            </Space>
            
        </Link>
        </div>
    )
}
export default Logo
