export class User {
    name?: string;
    login?: string;
    password?: string;
}

export class Credentials {
    login?: string;
    password?: string;
}

export class AccessToken {
    accessToken: string | undefined;
}

export class UserSessionToken {
    name?: string;
    login?: string;
    accessToken?: string;
    duration?: number;
}