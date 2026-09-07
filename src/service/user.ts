import axios from "axios";
import type { ResDataType } from "./ajax";

export async function loginService(username:string,password:string){
    const body={username,password}
    const data=(await axios.post("/api/user/login",body)) as ResDataType
    return data
}
export async function registerService(username:string,password:string,nickname:string){
    const body={username,password,nickname:nickname||username}
    const data=(await axios.post("/api/user/register",body)) as ResDataType
    return data
}