"use client"
import { Button, Container, Grid, TextField, IconButton, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignUpInterface } from '../interface';
import { SignUpValidationSchema } from '../validationSchema';
import {initialValues} from '../initialValues'
import Link from 'next/link';

const SignUp: React.FC = () => {
    const [submitLoad, setSubmitLoad] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    
    const handleSubmit = (values: SignUpInterface) => {
        setSubmitLoad(true);
        setTimeout(() => {
            console.log(values); 
            setSubmitLoad(false);
        }, 1000);
    };

    return (
        <Container sx={{padding:'10px 0px 20px'}}>
            <h1 className='heading'>Sign up</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={SignUpValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form className="container">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h4>PERSONAL DETAILS: </h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="fName"
                                    label="First Name*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fName}
                                    error={touched.fName && Boolean(errors.fName)}
                                    helperText={touched.fName && errors.fName}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="lName"
                                    label="Last Name*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lName}
                                    error={touched.lName && Boolean(errors.lName)}
                                    helperText={touched.lName && errors.lName}
                                />
                            </Grid>
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="contact"
                                    label="Contact Number*"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.contact}
                                    error={touched.contact && Boolean(errors.contact)}
                                    helperText={touched.contact && errors.contact}
                                />
                            </Grid>
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="confpassword"
                                    label="Confirm Password*"
                                    type={showConfPassword ? 'text' : 'password'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.confpassword}
                                    error={touched.confpassword && Boolean(errors.confpassword)}
                                    helperText={touched.confpassword && errors.confpassword}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={() => setShowConfPassword(!showConfPassword)}
                                                edge="end"
                                            >
                                                {showConfPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <h4>BUSINESS DETAILS:</h4>
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="busiName"
                                    label="Business Name*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.busiName}
                                    error={touched.busiName && Boolean(errors.busiName)}
                                    helperText={touched.busiName && errors.busiName}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="busiRegNum"
                                    label="Business Registration Number*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.busiRegNum}
                                    error={touched.busiRegNum && Boolean(errors.busiRegNum)}
                                    helperText={touched.busiRegNum && errors.busiRegNum}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="busiEmail"
                                    label="Business Email*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.busiEmail}
                                    error={touched.busiEmail && Boolean(errors.busiEmail)}
                                    helperText={touched.busiEmail && errors.busiEmail}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="busiContact"
                                    label="Business Contact Number*"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.busiContact}
                                    error={touched.busiContact && Boolean(errors.busiContact)}
                                    helperText={touched.busiContact && errors.busiContact}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="country"
                                    label="Country*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    error={touched.country && Boolean(errors.country)}
                                    helperText={touched.country && errors.country}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="state"
                                    label="State*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.state}
                                    error={touched.state && Boolean(errors.state)}
                                    helperText={touched.state && errors.state}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="city"
                                    label="City*"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    error={touched.city && Boolean(errors.city)}
                                    helperText={touched.city && errors.city}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="zipcode"
                                    label="Zip Code*"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.zipcode}
                                    error={touched.zipcode && Boolean(errors.zipcode)}
                                    helperText={touched.zipcode && errors.zipcode}
                                />
                            </Grid>

                            <Grid item xs={5}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="I agree to the T&C and Privacy Policy" />
                                </FormGroup>
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

            <br /><br />

            <p>Already have an account?<Link href="/login">Sign In</Link></p>

        </Container>
    );
}

export default SignUp;
