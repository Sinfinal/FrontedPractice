import  { configureStore } from "@reduxjs/toolkit"
import type { UserStateType } from "./UserReducer"
import componentsReducer from "./componentReducer"
import  userReducer from "./UserReducer"
import type { ComponentsStateType } from "./componentReducer"
export type StateType={
    user:UserStateType
    components:ComponentsStateType
}
export default configureStore({
    reducer:{
        user:userReducer,
        components:componentsReducer,
    },
})