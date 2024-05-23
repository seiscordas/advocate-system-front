export interface DecodedToken {
    accessToken: string;
    sub: string;
    name: string;
    exp: number;
    rules?: string[];
}