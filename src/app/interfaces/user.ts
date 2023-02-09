export interface User {
    'id': number,
    'first_name': string,
    'last_name': string,
    'email': string,
    'organisation': string,
    'representative': string,
    'isadmin': boolean,
    'projects': string[],
    'passcode?': number,
    'token': string
}