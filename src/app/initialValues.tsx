import { SignUpInterface, CreateSInterface } from "./interface";


export const initialValues: SignUpInterface = {
    fName: '',
    lName: '',
    email: '',
    contact: undefined,
    password: '',
    confpassword: '',
    busiName: '',
    busiRegNum: '',
    busiEmail: '',
    busiContact: undefined,
    country: '',
    state: '',
    city: '',
    zipcode: undefined,
};

export const CreateSInitialValues: CreateSInterface = {
    fName: '',
    lName: '',
    email: '',
    contact: undefined,
    gender:'',
    dob:undefined,
    martialStatus:'',
    country: '',
};