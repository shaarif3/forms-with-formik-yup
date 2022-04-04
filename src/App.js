import { Form, Formik, Field, useField } from 'formik';
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box,
} from '@mui/material';

function App() {
  const initialValues = {
    fullName: '',
    initialInvestment: undefined,
    investmentRisk: [],
    commentAboutInvestmentRisk: '',
    dependents: -1,
    acceptedTermsAndConditions: false,
  };
  return (
    <div className='App' style={{ padding: '2rem' }}>
      <h1>New Account</h1>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values }) => (
          <Form>
            <Box marginBottom={2}>
              <FormGroup>
                <Field name='fullName' as={TextField} label='Full Name' />
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
              </FormGroup>
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
              </FormGroup>
            </Box>

            <Box marginBottom={2}>
              <FormGroup>
                <Field name='dependents' as={TextField} select>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Field>
              </FormGroup>
            </Box>

            <Box marginBottom={2}>
              <FormGroup>
                <MyCheckbox
                  name='acceptedTermsAndConditions'
                  type='checkbox'
                  label='Accept Terms And Conditions'
                />
              </FormGroup>
            </Box>

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
