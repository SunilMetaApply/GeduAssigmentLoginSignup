"use client";
import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { CreateSInterface } from '../../interface';
import { AddStudentSchema } from '../../validationSchema';
import { CreateSInitialValues } from '../../initialValues';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CreateModal: React.FC = () => {
    const [submitLoad, setSubmitLoad] = useState(false);
    const [dob, setDob] = useState<Date | null>(null);

    const handleSubmit = (values: CreateSInterface) => {
        setSubmitLoad(true);
        setTimeout(() => {
            console.log({ ...values, dob });
            setSubmitLoad(false);
        }, 1000);
    };

    return (
        <Container>
            <h1 className='heading'>Add Student</h1>
            <Formik
                initialValues={CreateSInitialValues}
                validationSchema={AddStudentSchema}
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
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="gender-label">Gender*</InputLabel>
                                    <Field
                                        as={Select}
                                        labelId="gender-label"
                                        name="gender"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.gender}
                                        error={touched.gender && Boolean(errors.gender)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Field>
                                    {touched.gender && errors.gender && (
                                        <div style={{ color: 'red' }}>{errors.gender}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth variant="outlined">
                                    <DatePicker
                                        selected={dob}
                                        onChange={(date) => {
                                            setDob(date);
                                            handleChange({ target: { name: 'dob', value: date } });
                                        }}
                                        onBlur={handleBlur}
                                        dateFormat="yyyy/MM/dd"
                                        placeholderText="DOB"
                                        isClearable
                                        className="date-picker"
                                        popperPlacement="bottom"
                                    />
                                    {touched.dob && !dob && (
                                        <div style={{ color: 'red' }}>{errors.dob || 'Date of birth is required'}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="marital-status-label">Marital Status*</InputLabel>
                                    <Field
                                        as={Select}
                                        labelId="marital-status-label"
                                        name="martialStatus"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.martialStatus} // Corrected name
                                        error={touched.martialStatus && Boolean(errors.martialStatus)}
                                    >
                                        <MenuItem value="married">Married</MenuItem>
                                        <MenuItem value="unmarried">Unmarried</MenuItem>
                                    </Field>
                                    {touched.martialStatus && errors.martialStatus && (
                                        <div style={{ color: 'red' }}>{errors.martialStatus}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="country-label">Country*</InputLabel>
                                    <Field
                                        as={Select}
                                        labelId="country-label"
                                        name="country"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.country}
                                        error={touched.country && Boolean(errors.country)}
                                    >
                                        <MenuItem value="india">India</MenuItem>
                                        <MenuItem value="canada">Canada</MenuItem>
                                        <MenuItem value="usa">USA</MenuItem>
                                        <MenuItem value="uae">UAE</MenuItem>
                                    </Field>
                                    {touched.country && errors.country && (
                                        <div style={{ color: 'red' }}>{errors.country}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" type="submit" disabled={submitLoad}>
                                        {submitLoad ? 'Submitting...' : 'Create Student'}
                                    </Button>
                                    <Button variant="outlined" color="error">
                                        Clear
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default CreateModal;
