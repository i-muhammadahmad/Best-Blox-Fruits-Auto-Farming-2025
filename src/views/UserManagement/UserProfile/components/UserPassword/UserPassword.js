import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import useRouter from 'utils/useRouter';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
  updateProfilePassword,
  hideProfilePasswordValidationError,
  profileEmailVerificationCode,
  hideProfilePasswordVerifyScreen,
  profileEmailVerifyCode
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
  old_password: {
    presence: { allowEmpty: false, message: '^Password is required' },
  },
  password: {
    presence: { allowEmpty: false, message: '^Password is required' },
  },
  password_confirmation: {
    presence: { allowEmpty: false, message: '^Confirm Password is required' },
    equality: "password"
  },
}

const UserPassword = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const userProfileState = useSelector(state => state.userProfileState);
  const session = useSelector(state => state.session);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    let record = session.user;
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'user_id': session.user.id,
      },
      touched: {
        ...formState.touched,
        'user_id': true,
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
    if (!isEmpty(userProfileState.profile_password_validation_error)) {
      const errors = userProfileState.profile_password_validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [userProfileState.profile_password_validation_error]);

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
    dispatch(hideProfilePasswordValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    await dispatch(updateProfilePassword(formState.values));
    
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const [counter, setCounter] = useState(30);
  const timer = useRef(null); // we can save timer in useRef and pass it to child
  useEffect(() => {
    if (userProfileState.profile_show_verify_code) {
      dispatch(profileEmailVerificationCode(session.user.id, false));
      // useRef value stored in .current property
      timer.current = setInterval(() => setCounter((v) => v - 1), 1000);

      // clear on component unmount
      return () => {
        clearInterval(timer.current);
      };
    }
    else{
      backToPasswordScreen();
    }
  }, [userProfileState.profile_show_verify_code]);

  useEffect(() => {
    if (counter <= 0) {
      clearInterval(timer.current);
      
    }
  }, [counter]);

  //verify code
  const emailVerification = async event => {
    event.preventDefault();
    if (!isEmpty(formState.values.verification_code)) {
      //await verifyEmailCode(sessionReducer.verify_user.id, formState.values.verification_code);
      let data = {
        id: session.user.id,
        verification_code: formState.values.verification_code,
        password: formState.values.password,
        password_confirmation: formState.values.password_confirmation,
        old_password: formState.values.old_password,
      }
      await dispatch(profileEmailVerifyCode(data));
    }
  }

  const resendVerification = async event => {
    event.preventDefault();
    await dispatch(profileEmailVerificationCode(session.user.id));
    await setCounter(30);
    timer.current = setInterval(() => setCounter((v) => v - 1), 1000);
  }

  const backToPasswordScreen = async () => {
    await setFormState({
      isValid: false,
      values: {
        'user_id': session.user.id,
      },
      touched: {
        'user_id': true,
      },
      errors: {}
    });

    await setCounter(30);
    await dispatch(hideProfilePasswordVerifyScreen());
  }

  return (
    <Card
      className={classes.projectDetails}
    >
      <CardHeader title="Change Password" />
      <CardContent>
        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.formGroup}>
            {(!userProfileState.profile_show_verify_code)?
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    error={hasError('old_password')}
                    fullWidth
                    helperText={hasError('old_password') ? formState.errors.old_password[0] : null}
                    label="Old Password"
                    name="old_password"
                    onChange={handleChange}
                    value={formState.values.old_password || ''}
                    variant="outlined"
                    size="small"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="subtitle2">
                    <b>Note: </b> <br />
                    <ul style={{padding: 'revert'}}> 
                      <li> The password must be between 6 and 15 characters long </li>
                      <li>
                        The password must contains at least one character from the following categories:
                        <ul style={{padding: 'revert'}}>
                          <li>English uppercase characters (A – Z) </li>
                          <li>English lowercase characters (a – z) </li>
                          <li>Base 10 digits (0 – 9) </li>
                          <li>Non-alphanumeric (For example: !, $, #, or % etc) </li>
                        </ul>
                      </li>
                      
                    </ul>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
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
              </Grid>
            : 
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Typography
                  gutterBottom
                  variant="h3"
                >
                  Verify your identity
                </Typography>
                <Typography variant="subtitle2">
                  We have send code to <b>{session.user.email}</b>. Please enter the code to sign in.
                  <br /><b>Note</b>: Code is valid for 15 minutes.
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <TextField
                      error={hasError('verification_code')}
                      fullWidth
                      helperText={hasError('verification_code') ? formState.errors.verification_code[0] : null}
                      label="Verification Code"
                      name="verification_code"
                      onChange={handleChange}
                      value={formState.values.verification_code || ''}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <StyledButton
                      color="bprimary"
                      disabled={isEmpty(formState.values.verification_code)}
                      size="small"
                      type="button"
                      variant="contained"
                      onClick={(e) => {emailVerification(e)}}
                    >
                      Verify Code
                    </StyledButton>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton
                      color="bprimary"
                      disabled={counter !== 0}
                      size="small"
                      type="button"
                      variant="contained"
                      onClick={(e) => {resendVerification(e) }}
                    >
                      Resend Code {(counter !== 0) ? "in " + counter : ""}
                    </StyledButton>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton
                      color="bdefault"
                      size="small"
                      type="button"
                      variant="contained"
                      onClick={(e) => {backToPasswordScreen()}}
                    >
                      Back
                    </StyledButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
    
          } 
          </div>
          <Grid 
            container
            alignItems="flex-start"
            direction="row"
            justify="flex-end"
            spacing={3}
          >
            {(!userProfileState.profile_show_verify_code)?
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
              :''
            }  
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserPassword;
