import { Form, Formik, Field, useField, ErrorMessage } from 'formik';
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box,
  Button,
} from '@mui/material';
import { array, boolean, mixed, number, object, string } from 'yup';
function App() {
  const initialValues = {
    fullName: '',
    initialInvestment: 0,
    investmentRisk: [],
    commentAboutInvestmentRisk: '',
    dependents: -1,
    acceptedTermsAndConditions: false,
  };
  return (
    <div className='App' style={{ padding: '2rem' }}>
      <h1>New Account</h1>
      <Formik
        //Adding Yup Validation
        validationSchema={object({
          fullName: string()
            .required('your name is mandatory!')
            .min(2)
            .max(100),
          initialInvestment: number().required().min(100),
          dependents: number().required().min(0).max(5),
          acceptedTermsAndConditions: boolean().oneOf([true]),
          investmentRisk: array(string().oneOf(['High', 'Medium', 'Low'])).min(
            1
          ),
          commentAboutInvestmentRisk: mixed().when('investmentRisk', {
            is: (investmentRisk) => investmentRisk.find((ir) => ir === 'High'),
            then: string().required().min(20).max(100),
            otherwise: string().min(20).max(100),
          }),
        })}
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          return new Promise((res) => {
            setTimeout(() => {
              console.log(values);
              console.log(formikHelpers);
              console.log('----------------');
              res();
            }, 5000);
          });
        }}
        onSubmit={(values) => {
          console.log(values, 'submitting');
        }}
      >
        {({ values, errors, isSubmitting, handleSubmit, isValidating }) => (
          <Form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
              <FormGroup>
                <Field name='fullName' as={TextField} label='Full Name' />
                <ErrorMessage name='fullName' />
                {/* {touched.fullName && errors.fullName ? errors.fullName : null} */}
              </FormGroup>
            </Box>
            <Box marginBottom={2}>
              <FormGroup>
                <Field
                  name='initialInvestment'
                  type='number'
                  as={TextField}
                  label='Initial Investment'
                />
                <ErrorMessage name='initialInvestment' />
              </FormGroup>
            </Box>

            <Box marginBottom={2}>
              <FormGroup>
                <MyCheckbox name='investmentRisk' value='high' label='High' />
                <MyCheckbox name='investmentRisk' value='low' label='Low' />
                <MyCheckbox
                  name='investmentRisk'
                  value='medium'
                  label='Medium'
                />
                <MyCheckbox
                  name='investmentRisk'
                  value='very low'
                  label='Very Low'
                />
              </FormGroup>
              <ErrorMessage name='investmentRisk' />
            </Box>

            <Box marginBottom={2}>
              <FormGroup>
                <Field
                  name='commentAboutInvestmentRisk'
                  as={TextField}
                  multiline
                  rows={3}
                  rowsMax={10}
                />
                <ErrorMessage name='commentAboutInvestmentRisk' />
              </FormGroup>
            </Box>

            <Box marginBottom={2}>
              <FormGroup>
                <Field name='dependents' as={TextField} select>
                  <MenuItem value={-1}>Select...</MenuItem>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Field>
                <ErrorMessage name='dependents' />
              </FormGroup>
            </Box>

            <Box marginBottom={2}>
              <FormGroup>
                <MyCheckbox
                  name='acceptedTermsAndConditions'
                  type='checkbox'
                  label='Accept Terms And Conditions'
                />
                <ErrorMessage name='acceptedTermsAndConditions' />
              </FormGroup>
            </Box>
            <Button type='submit' disabled={isSubmitting || isValidating}>
              Submit
            </Button>
            <pre>{JSON.stringify(errors, null, 4)}</pre>
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;

export function MyCheckbox(props) {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  });
  return (
    <FormControlLabel control={<Checkbox {...field} />} label={props.label} />
  );
}
