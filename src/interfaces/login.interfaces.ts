export interface UserInfoFromServer {
    Id: string,
    Username: string,
    FullName: string,
    ClientRoles: string
}

export interface AuthorizationTokenInfo {
    AuthResult: string,
    Token: string,
    TokenExpires: string
}

export interface LoginResponseResult {
    User: UserInfoFromServer,
    AuthorizationToken: AuthorizationTokenInfo
}

export interface LoginResponse {
    Result: LoginResponseResult
    ResultType: string;
}