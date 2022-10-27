import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  updateUsers,
  hideUsersValidationError,
  timeZonesListFetch,
  rolesListFetch,
  redirectToUsersList
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, map, find, forEach } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';
import { EmployeeDropdown } from 'commonDropdowns';

const schema = {
  name: {
    presence: { allowEmpty: false, message: '^Name is required' },
  },
  email: {
    presence: { allowEmpty: false, message: '^Email is required' },
    email: true
  },
  roles_ids: {
    presence: { allowEmpty: false, message: '^Please Select At least One Role' },
  },
  timezone_id: {
    presence: { allowEmpty: false, message: '^Timezone is required' },
  },
  employee_id: {
    presence: { allowEmpty: false, message: '^Employee is required' },
  },
  password_confirmation: {
    equality: "password"
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

const useRadioStyles = makeStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.bprimary.main,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.bprimary.main,
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));

const UsersUpdate = () => {
  const classes = useStyles();
  const radio_classes = useRadioStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const usersState = useSelector(state => state.usersState);
  const timeZonesState = useSelector(state => state.timeZonesState);
  const rolesState = useSelector(state => state.rolesState);
  const session = useSelector(state => state.session);

  const [TimezoneValue, setTimezoneValue] = useState(null);
  const [EmployeeValue, setEmployeeValue] = useState(null);
  const [RolesValue, setRolesValue] = useState([]);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
      'is_super_admin': false
    },
    touched: {
      'object_viewed_id': true,
      'is_super_admin': true
    },
    errors: {}
  });

  useEffect(() => {
    dispatch(timeZonesListFetch(session.current_page_permissions.object_id))
  }, []);

  useEffect(() => {
    dispatch(rolesListFetch(session.current_page_permissions.object_id))
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(usersState.validation_error)) {
      const errors = usersState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [usersState.validation_error]);

  useEffect(() => {
    let record = usersState.usersRecord
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'description': record.description,
        'timezone_id': record.timezone_id,
        'employee_id': record.employee_id,
        'name': record.name,
        'email': record.email,
        'is_super_admin': (record.is_super_admin == 'y')? true:false,
        'id': record.id,
        'roles_ids': map(record.roles, 'id')
      },
      touched: {
        ...formState.touched,
        'description': true,
        'timezone_id': true,
        'employee_id': true,
        'name': true,
        'email': true,
        'is_super_admin': true,
        'id': true,
        'roles_ids': true
      }
    }));
  }, [usersState.usersRecord])

  useEffect(() => {
    let record = usersState.usersRecord
    const item = find(timeZonesState.timeZonesList, ['id', record.timezone_id])
    setTimezoneValue(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZonesState.timeZonesList]);

  /*useEffect(() => {
    let record = usersState.usersRecord
    const item = find(employeesState.employeesList, ['id', record.employee_id])
    setEmployeeValue(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesState.employeesList]);*/

  useEffect(() => {
    let record = usersState.usersRecord
    let items = [];
    if (!isEmpty(record.roles) && !isEmpty(rolesState.rolesList)) {
      forEach(record.roles, function (value, key) {
        let item1 = find(rolesState.rolesList, ['id', value.id]);
        items.push(item1);
      })
    }
    setRolesValue(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesState.rolesList]);

  useEffect(()=> {
    if(!usersState.showViewPage && !usersState.showUpdateForm){
      router.history.push('/users');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[usersState.showViewPage, usersState.showUpdateForm]);

  useEffect(() => {
    if (usersState.redirect_to_list) {
      router.history.push('/users');
    }
  }, [usersState.redirect_to_list, router.history]);

  const setTimezoneId = timezone_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'timezone_id': timezone_id
      },
      touched: {
        ...formState.touched,
        'timezone_id': true
      }
    }));
    dispatch(hideUsersValidationError('timezone_id'))
  }

  const employeeOnChange = (event, newValue) => {
    if (newValue) {
      setEmployeeValue(newValue)
      //setEmployeeId(newValue.id)
      handleEmployeeChange(newValue)
    }
    else {
      setEmployeeValue(newValue)
      //setEmployeeId('')
      handleEmployeeChange('')
    }
  }

  const handleEmployeeChange = employee => {
    if(!isEmpty(employee)){
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          'employee_id': employee.id,
          'name': employee.firstname+' '+employee.middlename+' '+employee.lastname,
          'email': employee.email
        },
        touched: {
          ...formState.touched,
          'employee_id': true,
          'name': true,
          'email': true
        }
      }));
    }
    else{
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          'employee_id': '',
          'name': '',
          'email': ''
        },
        touched: {
          ...formState.touched,
          'employee_id': true,
          'name': true,
          'email': true
        }
      }));
    }
    dispatch(hideUsersValidationError('employee_id'))
    dispatch(hideUsersValidationError('name'))
    dispatch(hideUsersValidationError('email'))
  }

  const setRolesIds = roles_ids => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'roles_ids': roles_ids
      },
      touched: {
        ...formState.touched,
        'roles_ids': true
      }
    }));
    dispatch(hideUsersValidationError('roles_ids'))
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
    dispatch(hideUsersValidationError('description'))
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
    dispatch(hideUsersValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(updateUsers(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Update Users"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update Users" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <EmployeeDropdown
                    EmployeeValue={EmployeeValue}
                    setEmployeeValue={setEmployeeValue}
                    id="employee_id"
                    name="employee_id"
                    employeeOnChange={employeeOnChange}
                    selectedId={formState.values.employee_id}
                    renderInput={(params) => <TextField {...params} size="small" label="Select Employee" variant="outlined" error={hasError('employee_id')} helperText={hasError('employee_id') ? formState.errors.employee_id[0] : null} />}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
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
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  {!isEmpty(rolesState.rolesList) ?
                    <Autocomplete
                      multiple
                      limitTags={2}
                      id="roles_ids"
                      value={RolesValue}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setRolesValue(newValue)
                          let roles_ids = map(newValue, 'id')
                          setRolesIds(roles_ids)
                        }
                        else {
                          setRolesValue(newValue)
                          setRolesIds([])
                        }
                      }}
                      options={rolesState.rolesList}
                      getOptionLabel={(option) => option.name}
                      size="small"
                      renderInput={(params) => <TextField {...params} label="Select Roles" variant="outlined" />}
                    />
                    : ''}
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Autocomplete
                    id="timezone_id"
                    value={TimezoneValue}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setTimezoneValue(newValue)
                        setTimezoneId(newValue.id)
                      }
                      else {
                        setTimezoneValue(newValue)
                        setTimezoneId('')
                      }

                    }}
                    options={timeZonesState.timeZonesList}
                    getOptionLabel={(option) => '(' + option.offset + ') ' + option.name}
                    size="small"
                    renderInput={(params) => <TextField {...params} size="small" label="Select Timezone" variant="outlined" error={hasError('timezone_id')} helperText={hasError('timezone_id') ? formState.errors.timezone_id[0] : null} />}
                  />
                </Grid>

              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    error={hasError('password')}
                    fullWidth
                    helperText={hasError('password') ? formState.errors.password[0] : null}
                    label="New Password"
                    name="password"
                    onChange={handleChange}
                    value={formState.values.password || ''}
                    variant="outlined"
                    size="small"
                    type="password"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    error={hasError('password_confirmation')}
                    fullWidth
                    helperText={hasError('password_confirmation') ? formState.errors.password_confirmation[0] : null}
                    label="New Confirm Password"
                    name="password_confirmation"
                    onChange={handleChange}
                    value={formState.values.password_confirmation || ''}
                    variant="outlined"
                    size="small"
                    type="password"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  {(session.user.is_super_admin === 'y')?
                  <FormGroup >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formState.values.is_super_admin}
                          onChange={handleChange}
                          name="is_super_admin"
                          color="primary"
                          classes={{
                            root: radio_classes.root,
                            switchBase: radio_classes.switchBase,
                            thumb: radio_classes.thumb,
                            track: radio_classes.track,
                            checked: radio_classes.checked,
                          }}
                        />
                      }
                      label="Is Super Admin"
                    />
                  </FormGroup>
                  :""}
                </Grid>
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={usersState.usersRecord.description || ''}
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
              Update Users
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToUsersList()) }}
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

export default UsersUpdate;
