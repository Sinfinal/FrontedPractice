const KEY="TOKEN"
export function setToken(token:string){
    localStorage.setItem(KEY,token)
}
export function getToken(){
    localStorage.getItem(KEY)
}
export function removeToken(){
    localStorage.removeItem(KEY)
}