import type { Dispatch } from "@reduxjs/toolkit";
import { Typography } from "antd";
import { addComponent } from "../../../store/componentReducer";
import { nanoid } from "@reduxjs/toolkit";
import styles from "./ComponentLib.module.scss"
import { useDispatch } from "react-redux";
import { componentConfGroup, type ComponentConfType } from "../../../components/QuestionComponents";

const { Title } = Typography

function genComponent(c: ComponentConfType, dispatch: Dispatch) {
    const { title, type, Component, defaultProps } = c
    function handlerClick() {
        dispatch(
            addComponent({
                fe_id: nanoid(),
                title,
                type,
                isHidden: false,
                props: defaultProps,
            })
        )
    }
    return (
        <div key={type} className={styles.wrapper} onClick={handlerClick}>
            <div className={styles.component}>
                <Component {...defaultProps} />
            </div>
        </div>
    )
}

function Lib() {
    const dispatch = useDispatch()
    return (
        <div>
            {componentConfGroup.map((group, index) => {
                const { groupId, groupName, components } = group
                return (
                    <div key={groupId}>
                        <Title level={3} style={{ fontSize: "16px", marginTop: index > 0 ? 24 : 0 }}>
                            {groupName}
                        </Title>
                        <div>
                            {components.map(c => genComponent(c, dispatch))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Lib