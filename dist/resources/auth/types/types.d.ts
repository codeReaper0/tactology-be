export interface Payload {
    id: string;
    firstName: string;
    lastName: string;
}
export interface UserAuth {
    user: Payload & {
        email: string;
    };
    accessToken: string;
}
export declare class LoginResponse {
    accessToken: string;
}
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    state: string;
    city: string;
    country: string;
    phoneNumber: string;
    constructor(id: string, email: string, firstName: string, lastName: string, state: string, city: string, country: string, phoneNumber: string);
}
