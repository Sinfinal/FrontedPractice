export const HOME_PATHNAME = "/"
export const LOGIN_PATHNAME = "/login"
export const MANAGE_INDEX_PATHNAME = "/manage/list"
export const REGISTER_PATHNAME = "/register"

export function isLoginOrRegister(pathname: string) {
    return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)
}

export function isNoNeedUserInfo(pathname: string) {
    return [HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)
}