
export interface SignUpInterface {
    fName: string;
    lName: string;
    email: string;
    contact?: number;
    password: string;
    confpassword: string;
    busiName: string;
    busiRegNum: string;
    busiEmail: string;
    busiContact?: number;
    country: string;
    state: string;
    city: string;
    zipcode?: number;
}

export interface SignInInterface{
    email: string;
    password: string;
}