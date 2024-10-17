import * as Yup from 'yup';

export const SignUpValidationSchema = Yup.object({
    fName: Yup.string().required('First Name is required'),
    lName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contact: Yup.number().required('Contact number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confpassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
    busiName: Yup.string().required('Business Name is required'),
    busiRegNum: Yup.string().required('Business Registration Number is required'),
    busiEmail: Yup.string().email('Invalid email').required('Business Email is required'),
    busiContact: Yup.number().required('Business Contact number is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipcode: Yup.number().required('Zip Code is required'),
});