"use client";
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Grid, IconButton, Container } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [submitLoad, setSubmitLoad] = useState<boolean>(false);
    const router = useRouter();

    const initialValues: LoginFormValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required')
    });

    const handleSubmit = async (values: LoginFormValues) => {
        setSubmitLoad(true);
        try {
            const response = await axios.post('https://api-dev.eduapply.io/api/v1/Auth/login', {
                email: values.email,
                password: values.password,
                clientIp: '14.195.20.42',
                deviceId: 'b34201c7-7d61-414f-be9c-856c19c83328'
            });
            console.log('Login successful:', response.data);
            router.replace('/students'); 
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setSubmitLoad(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <h1 className='heading'>Login</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form className="container">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="email"
                                    label="Email*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="password"
                                    label="Password*"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" type="submit" disabled={submitLoad}>
                                    {submitLoad ? 'Submitting...' : 'Login'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default LoginForm;
