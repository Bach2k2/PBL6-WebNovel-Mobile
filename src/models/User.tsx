export interface User {
    id: string,
    username?: string,
    password?: string,
    email?: string,
    roleName?: string[],
    nickName?: string,
    status?: 0,
    phone?: string,
    roleIds?: string[],
    isAdmin?: boolean
}