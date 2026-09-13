import  { configureStore } from "@reduxjs/toolkit"
import type { UserStateType } from "./UserReducer"
import componentsReducer from "./componentReducer"
import  userReducer from "./UserReducer"
import type { ComponentsStateType } from "./componentReducer"
import pageInfoReducer, { type PageInfoType } from "./pageInfoReducer"
export type StateType={
    user:UserStateType
    components:ComponentsStateType
    pageInfo:PageInfoType
}
export default configureStore({
    reducer:{
        user:userReducer,
        components:componentsReducer,
        pageInfo:pageInfoReducer,
    },
})