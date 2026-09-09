import  { configureStore } from "@reduxjs/toolkit"
import type { UserStateType } from "./UserReducer"

import  userReducer from "./UserReducer"
export type StateType={
    user:UserStateType
}
export default configureStore({
    reducer:{
        user:userReducer,
    },
})