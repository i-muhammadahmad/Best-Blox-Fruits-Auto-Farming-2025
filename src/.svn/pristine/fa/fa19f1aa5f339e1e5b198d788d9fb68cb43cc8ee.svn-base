import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import useRouter from 'utils/useRouter';
import clsx from 'clsx';
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
  Switch,
  Typography
} from '@material-ui/core';
import {
  updateProfileInfo,
  hideProfileInfoValidationError,
} from 'actions';
import { StyledButton } from 'components';
import { makeStyles } from '@material-ui/styles';
import { isEmpty, find, forEach } from 'lodash';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  root: {},
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const schema = {
  dob: {
    presence: { allowEmpty: false, message: '^ date of birth is required' },
  },
}


const BasicInfo = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const userProfileState = useSelector(state => state.userProfileState);
  const session = useSelector(state => state.session);
  const [TimezoneValue, setTimezoneValue] = useState([]); 
  const [employeeValue, setEmployeeValue] = useState({});  

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    let record = session.user.employee;
    setEmployeeValue(record);
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'sudo_name': record.sudo_name,
        'employee_id': record.id,
        'dob': record.dob,
        'user_id': session.user.id,
        'office_ext': record.office_ext,
        'office_phone_no': record.office_phone_no,
        'personal_phone_no': record.personal_phone_no,
      },
      touched: {
        ...formState.touched,
        'sudo_name': true,
        'employee_id': true,
        'user_id': true,
        'dob': true,
        'office_ext': true,
        'office_phone_no': true,
        'personal_phone_no': true
      }
    }));
  }, [])

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(userProfileState.profile_info_validation_error)) {
      const errors = userProfileState.profile_info_validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [userProfileState.profile_info_validation_error]);

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
    dispatch(hideProfileInfoValidationError('timezone_id'))
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
    dispatch(hideProfileInfoValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(updateProfileInfo(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Card
      className={classes.projectDetails}
    >
      <CardHeader title="Update Information" />
      <CardContent>
        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.formGroup}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Typography variant="p" component="p">
                  <b>Full Name: </b> {employeeValue.firstname+' '+employeeValue.lastname}
                </Typography><br />
                <Typography variant="p" component="p">
                  <b>Email: </b> {employeeValue.email}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  error={hasError('office_phone_no')}
                  fullWidth
                  helperText={hasError('office_phone_no') ? formState.errors.office_phone_no[0] : null}
                  label="Office Phone No"
                  name="office_phone_no"
                  onChange={handleChange}
                  value={formState.values.office_phone_no || ''}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={4} sm={2}>
                <TextField
                  error={hasError('office_ext')}
                  fullWidth
                  helperText={hasError('office_ext') ? formState.errors.office_ext[0] : null}
                  label="Extention"
                  name="office_ext"
                  onChange={handleChange}
                  value={formState.values.office_ext || ''}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={hasError('personal_phone_no')}
                  fullWidth
                  helperText={hasError('personal_phone_no') ? formState.errors.personal_phone_no[0] : null}
                  label="Personal Phone No"
                  name="personal_phone_no"
                  onChange={handleChange}
                  value={formState.values.personal_phone_no || ''}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={hasError('sudo_name')}
                  fullWidth
                  helperText={hasError('sudo_name') ? formState.errors.sudo_name[0] : null}
                  label="Pseudonym (Alias)"
                  name="sudo_name"
                  onChange={handleChange}
                  value={formState.values.sudo_name || ''}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.field}
                  value={formState.values.dob || ''}
                  fullWidth
                  label="Date Of Brith"
                  name="dob"
                  onChange={handleChange}
                  type="date"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={hasError('dob')}
                  helperText={hasError('dob') ? formState.errors.dob[0] : null}
                />
              </Grid>

            </Grid>
            
          </div>
          <Grid 
            container
            alignItems="flex-start"
            direction="row"
            justify="flex-end"
            spacing={3}
          >
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              save
            </StyledButton> 
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
