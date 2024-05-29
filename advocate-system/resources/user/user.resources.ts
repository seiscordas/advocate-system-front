// export interface User {
//     id: string;
//     firstName: string;
//     lastName: string;
//     login: string;
//     email: string;
//     password: string;
//     registrationTime?: string;
//     lastModificationTime: string;
//     rolesDTO: string[];  
// }

export interface UserList  {
    id: string;
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    imageUrl: string;
    registrationTime: string;
    lastModificationTime: string;
    rolesDTO: string[];
    status: 'active' | 'inactive';
};

export class UserCredentials {
    login?: string;
    password?: string;
}

export type AccessToken = {
    accessToken: string;
}

export interface userSession extends AccessToken{
    id?: string;
    name?: string;
    login?: string;
    email?: string;
    image_url?: string;
    rules?: string[];
    expiration?: number;
}