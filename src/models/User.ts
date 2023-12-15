export interface User {
    id?: string,
    username?: string,
    password?: string,
    email?: string,
    roleName?: string[],
    nickName?: string,
    imagesURL?: string,
    birthday?: string,
    walletAmmount?: number,
    // status?: 0,
    phone?: string,
    roleIds?: string[],
    isAdmin?: boolean,
    isActive?: boolean

}