import { useTitle } from "ahooks"
import { useDispatch } from "react-redux"
import { Spin } from "antd"
import useLoadQuestionData from "../../../hooks/useLoadQuestionData"
import useGetPageInfo from "../../../hooks/useGetPageInfo"
import { changeSelectedId } from "../../../store/componentReducer"
import LeftPanel from "./LeftPanel"
import styles from "./index.module.scss"

function Edit() {
    const dispatch = useDispatch()
    const { loading } = useLoadQuestionData()
    const { title } = useGetPageInfo()
    function clearSelectedId() {
        dispatch(changeSelectedId(""))
    }
    useTitle(`问卷编辑-${title}`)
    return (
       <div className={styles.container}>
        编辑头
        <div className={styles['content-wrapper']}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <LeftPanel/>
                </div>
                <div className={styles.main} onClick={clearSelectedId}>
                    <div className={styles['canvas-wrapper']}>
                        中间栏
                    </div>
                </div>
                <div className={styles.right}>
                    右侧边栏
                </div>
            </div>
        </div>
       </div>
    )
}
export default Edit