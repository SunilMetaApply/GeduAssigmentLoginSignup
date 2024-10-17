"use client"
import React, { useState } from 'react';
import { Button, Container, Grid, TextField, IconButton } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignInInterface } from '../interface';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});


const Login:React.FC = () => {
    const [submitLoad, setSubmitLoad] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const initialValues: SignInInterface = {
        email: '',
        password: '',
    };

    const handleSubmit = (values: SignInInterface) => {
        setSubmitLoad(true);
        setTimeout(() => {
            console.log(values); 
            setSubmitLoad(false);
        }, 1000);
    };

  return (
    <>
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
                                    {submitLoad ? 'Submitting...' : 'Sign Up'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    </>
  )
}

export default Login