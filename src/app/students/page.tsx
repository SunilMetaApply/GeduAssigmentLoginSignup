"use client"
import {
  Button,
  Container,
  Grid,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import * as Yup from 'yup';
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Formik, Form, Field } from "formik";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import Header from "../common/header";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  padding: "25px 15px",
};

interface StudentInterface {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date | null;
  email: string;
  contact: number;
  gender: string;
  maritalStatus: string;
  country: string;
}

export interface CreateSInterface {
  fName: string;
  lName: string;
  email: string;
  contact: number | null; 
  gender: string;
  dob: Date | null;
  martialStatus: string;
  country: string;
}

// Validation schema
const AddStudentSchema = Yup.object({
  fName: Yup.string().required('First Name is required'),
  lName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contact: Yup.number().required('Contact number is required').nullable(), // Allow null
  gender: Yup.string().required('Gender is required'),
  dob: Yup.date().required('Date of Birth is required').nullable(),
  martialStatus: Yup.string().required('Marital Status is required'),
  country: Yup.string().required('Country is required'),
});

const CreateSInitialValues: CreateSInterface = {
  fName: '',
  lName: '',
  email: '',
  contact: null,
  gender: '',
  dob: null,
  martialStatus: '',
  country: '',
};

const Students: React.FC = () => {
  const [submitLoad, setSubmitLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<StudentInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values: CreateSInterface) => {
    setSubmitLoad(true);
    setTimeout(() => {
      const newStudent: StudentInterface = {
        id: students.length + 1,
        firstName: values.fName,
        lastName: values.lName,
        dob: values.dob,
        email: values.email,
        contact: values.contact !== null ? values.contact : 0, // Set a default if necessary
        gender: values.gender,
        maritalStatus: values.martialStatus,
        country: values.country,
      };
      setStudents([...students, newStudent]);
      handleClose();
      setSubmitLoad(false);
    }, 1000);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
      renderCell: (params) => (
        <Link href={`/students/${params.row.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
          {params.value}
        </Link>
      ),
    },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "contact", headerName: "Contact Number", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "maritalStatus", headerName: "Marital Status", width: 130 },
    { field: "country", headerName: "Country", width: 130 },
    {
      field: "dob",
      headerName: "DOB",
      width: 150,
      valueFormatter: ({ value }) => value ? new Date(value).toLocaleDateString() : '',
    },
  ];

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header/>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search Students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={5}>
            <Button onClick={handleOpen}>Add Student</Button>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ marginTop: "20px" }}>
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            rows={filteredStudents} 
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>Add Student</h1>
                <span onClick={handleClose} style={{ cursor: 'pointer' }}><CloseIcon /></span>
              </div>

              <Formik
                initialValues={CreateSInitialValues}
                validationSchema={AddStudentSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, values, errors, touched, resetForm }) => (
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
                          value={values.contact || ''} // Handle null for input
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
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Field>
                          {touched.gender && errors.gender && (
                            <div style={{ color: "red" }}>{errors.gender}</div>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth variant="outlined">
                          <DatePicker
                            selected={values.dob}
                            onChange={(date) => {
                              handleChange({ target: { name: "dob", value: date } });
                            }}
                            onBlur={handleBlur}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="DOB"
                            isClearable
                            className="date-picker"
                            popperPlacement="bottom"
                          />
                          {touched.dob && !values.dob && (
                            <div style={{ color: "red" }}>{errors.dob || "Date of birth is required"}</div>
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
                            value={values.martialStatus}
                            error={touched.martialStatus && Boolean(errors.martialStatus)}
                          >
                            <MenuItem value="married">Married</MenuItem>
                            <MenuItem value="unmarried">Unmarried</MenuItem>
                          </Field>
                          {touched.martialStatus && errors.martialStatus && (
                            <div style={{ color: "red" }}>{errors.martialStatus}</div>
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
                            <div style={{ color: "red" }}>{errors.country}</div>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={2}>
                          <Button variant="contained" type="submit" disabled={submitLoad}>
                            {submitLoad ? "Submitting..." : "Create Student"}
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              resetForm();
                            }}
                          >
                            Clear
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Students;
