"use client"
import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface FormValues {
    fName: string;
    lName: string;
}

const validationSchema = Yup.object({
    fName: Yup.string().required('First Name is required'),
    lName: Yup.string().required('Last Name is required'),
});

const SignUp: React.FC = () => {
    const [submitLoad, setSubmitLoad] = useState(false);

    const initialValues: FormValues = {
        fName: '',
        lName: '',
    };

    const handleSubmit = (values: FormValues) => {
        setSubmitLoad(true);
        setTimeout(() => {
            setSubmitLoad(false);
        }, 1000);
    };

    return (
        <Container>
            <h1 className='heading'>Signup Form</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form className="container">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="fName"
                                    label="First Name"
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
                                    label="Last Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lName}
                                    error={touched.lName && Boolean(errors.lName)}
                                    helperText={touched.lName && errors.lName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" type="submit" disabled={submitLoad}>
                                    {submitLoad ? 'Submitting...' : 'Submit'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default SignUp;
