import { Link } from "react-router-dom"
import { Typography } from "antd"
import { FormOutlined } from "@ant-design/icons"
import styles from "./Logo.module.scss"
const { Title } = Typography
function Logo() {
    return (
        <Link to="/" className={styles.container}>
            <Title className={styles.title}>
                <FormOutlined />
            </Title>
            <Title className={styles.title}>老哥问卷</Title>
        </Link>
    )
}
export default Logo
