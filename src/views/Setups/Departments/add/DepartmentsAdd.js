import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  addDepartments,
  hideDepartmentsValidationError,
  redirectToDepartmentsList,
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';
import { OfficesDropdown, EmployeeDropdown } from 'commonDropdowns';

const schema = {
  name: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  office_id: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  head_id: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const DepartmentsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const departmentsState = useSelector(state => state.departmentsState);
  const session = useSelector(state => state.session);

  const [OfficeValue, setOfficeValue] = useState(null);
  const [DepartmentHeadValue, setDepartmentHeadValue] = useState(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState([]);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
    },
    touched: {
      'object_viewed_id': true,
    },
    errors: {}
  });


  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(departmentsState.validation_error)) {
      const errors = departmentsState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [departmentsState.validation_error]);

  useEffect(() => {
    if (departmentsState.redirect_to_list) {
      router.history.push('/departments');
    }
  }, [departmentsState.redirect_to_list, router.history]);

  const officeOnChange = (event, newValue) => {

    if (newValue) {
      setOfficeValue(newValue)
      setOfficeId(newValue.id)
    }
    else {
      setOfficeValue(newValue)
      setOfficeId('')
    }
    setDepartmentHeadValue(null)
    setDepartmentHeadId('')
  }

  const setOfficeId = office_id => {
    setSelectedOfficeId([office_id]);
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'office_id': office_id
      },
      touched: {
        ...formState.touched,
        'office_id': true
      }
    }));
    dispatch(hideDepartmentsValidationError('office_id'))
  }

  const departmentHeadOnChange = (event, newValue) => {
    if (newValue) {
      setDepartmentHeadValue(newValue)
      setDepartmentHeadId(newValue.id)
    }
    else {
      setDepartmentHeadValue(newValue)
      setDepartmentHeadId('')
    }
  }

  const setDepartmentHeadId = head_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'head_id': head_id
      },
      touched: {
        ...formState.touched,
        'head_id': true
      }
    }));
    dispatch(hideDepartmentsValidationError('head_id'))
  }

  const setDescription = description => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'description': description
      },
      touched: {
        ...formState.touched,
        'description': true
      }
    }));
    dispatch(hideDepartmentsValidationError('description'))
  }

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    dispatch(hideDepartmentsValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(addDepartments(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Add Departments"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Add Departments" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('name')}
                    fullWidth
                    helperText={hasError('name') ? formState.errors.name[0] : null}
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    value={formState.values.name || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('email')}
                    fullWidth
                    helperText={hasError('email') ? formState.errors.email[0] : null}
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    value={formState.values.email || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <OfficesDropdown
                    OfficeValue={OfficeValue}
                    setOfficeValue={setOfficeValue}
                    id="office_id"
                    name="office_id"
                    officeOnChange={officeOnChange}
                    renderInput={(params) => <TextField {...params} size="small" label="Select Office" variant="outlined" error={hasError('office_id')} helperText={hasError('office_id') ? formState.errors.office_id[0] : null} />}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <EmployeeDropdown
                    EmployeeValue={DepartmentHeadValue}
                    setEmployeeValue={setDepartmentHeadValue}
                    id="head_id"
                    name="head_id"
                    employeeOnChange={departmentHeadOnChange}
                    officesIds={selectedOfficeId}
                    renderInput={(params) => <TextField {...params} size="small" label="Select Department Head" variant="outlined" error={hasError('head_id')} helperText={hasError('head_id') ? formState.errors.head_id[0] : null} />}
                  />
                </Grid>
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={formState.values.description || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data)
                }}
              />
              <FormControl error={hasError('description')} >
                <FormHelperText id="component-error-text">{hasError('description') ? formState.errors.description[0] : null}</FormHelperText>
              </FormControl>
            </div>
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Create Departments
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToDepartmentsList()) }}
              startIcon={<CancelIcon />}
            >
              CLOSE
          </StyledButton>

          </form>

        </CardContent>
      </Card>

    </Page>
  );
};

export default DepartmentsAdd;
