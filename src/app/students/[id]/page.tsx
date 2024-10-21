"use client";
import React from 'react';
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface TestScore {
  testType: string;
  dateOfExam: Date | null;
  expiryDate: Date | null;
  rollNumber: string;
}

interface FormValues {
  testScores: TestScore[];
}

const validationSchema = Yup.object().shape({
  testScores: Yup.array().of(
    Yup.object().shape({
      testType: Yup.string().required('Test Type is required'),
      dateOfExam: Yup.date().required('Date of exam is required'),
      expiryDate: Yup.date().required('Exam expiry date is required'),
      rollNumber: Yup.string().required('Roll Number is required'),
    })
  ).required('At least one test score is required'),
});

const initialValues: FormValues = {
  testScores: [],
};

interface StudentDetailProps {
  params: {
    id: string;
  };
}

const StudentDetail: React.FC<StudentDetailProps> = ({ params }) => {
  const id = params.id;
  if (!id) {
    return <div>Student ID not found.</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Container>
            <Grid container>
              <Grid item xs={6}>
                <h3>Test Scores</h3>
              </Grid>
              <Grid item xs={6}>
                <Button type="button" onClick={() => {
                        const newTestScore = { testType: '', dateOfExam: null, expiryDate: null, rollNumber: '' };
                        setFieldValue('testScores', [newTestScore, ...values.testScores]);
                    }}>
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>

            {values.testScores.length === 0 && <p style={{ marginTop: '20px' }}>Add Test Scores</p>}
            
            {values.testScores.map((testScore, index) => (
              <Grid container key={index} spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={6}>
                  {testScore.testType === 'ielts' && 'IELTS'}
                  {testScore.testType === 'gmat' && 'GMAT'}
                  {testScore.testType === 'gre' && 'GRE'}
                  {testScore.testType === '' && 'Test Score'}
                </Grid>
                <Grid item xs={6}>
                  <Button type="button" onClick={() => {
                    const newTestScores = values.testScores.filter((_, i) => i !== index);
                    setFieldValue('testScores', newTestScores);
                  }}>
                    <DeleteIcon />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id={`test-type-label-${index}`}>Test Type*</InputLabel>
                    <Field
                      as={Select}
                      labelId={`test-type-label-${index}`}
                      name={`testScores.${index}.testType`}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="ielts">IELTS</MenuItem>
                      <MenuItem value="gmat">GMAT</MenuItem>
                      <MenuItem value="gre">GRE</MenuItem>
                    </Field>
                    <ErrorMessage name={`testScores.${index}.testType`} component="div" className='red' />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Field name={`testScores.${index}.dateOfExam`}>
                    {({ field }: any) => (
                      <DatePicker
                        selected={field.value}
                        onChange={date => setFieldValue(`testScores.${index}.dateOfExam`, date)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Date of exam"
                        className="date-picker"
                        isClearable
                      />
                    )}
                  </Field>
                  <ErrorMessage name={`testScores.${index}.dateOfExam`} component="div" className='red' />
                </Grid>
                <Grid item xs={6}>
                  <Field name={`testScores.${index}.expiryDate`}>
                    {({ field }: any) => (
                      <DatePicker
                        selected={field.value}
                        onChange={date => setFieldValue(`testScores.${index}.expiryDate`, date)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Exam expiry date"
                        className="date-picker"
                        isClearable
                      />
                    )}
                  </Field>
                  <ErrorMessage name={`testScores.${index}.expiryDate`} component="div" className='red' />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    name={`testScores.${index}.rollNumber`}
                    label="Roll Number"
                  />
                  <ErrorMessage name={`testScores.${index}.rollNumber`} component="div" className='red' />
                </Grid>

                {/* Submit and Clear Buttons for each Test Score */}
                <Grid item xs={12} style={{ marginTop: '10px' }}>
                  <Button variant="contained" type="submit">Submit</Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => { setFieldValue(`testScores.${index}`, { testType: '', dateOfExam: null, expiryDate: null, rollNumber: '' }); }}
                    style={{ marginLeft: '10px' }}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default StudentDetail;
