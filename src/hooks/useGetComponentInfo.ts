import {useSelector} from "react-redux"
import type { ComponentsStateType } from "../store/componentReducer"
import { type StateType } from "../store"
function useGetComponentInfo(){
    const components=useSelector<StateType>(state=>state.components) as ComponentsStateType
    const {componentList=[],selectedId}=components
    const selectedComponent=componentList.find(c=>c.fe_id===selectedId)
    return {
        components,
        selectedId,
        selectedComponent
    }
}
export default useGetComponentInfo