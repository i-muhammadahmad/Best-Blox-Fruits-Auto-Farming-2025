/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Grid } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useRouter from 'utils/useRouter';
import { userLoginFetch, verifyEmailCode, resendVerificationCode, resetSessionState, hideError, hideFeildValidationError } from 'actions';
import { isEmpty } from 'lodash';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: false
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' }
  }
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const LoginForm = props => {

  const { className, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'verification_code': ''
    },
    touched: {
      'verification_code': true
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
    if (session.error_type === 'validation') {
      const errors = session.error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [session.error_type, session.error]);

  useEffect(() => {
    if (session.loggedIn && !isEmpty(localStorage.getItem("token"))) { 
      //router.history.push('/');
      setTimeout(function() { 
        window.location.replace("/");
      }, 500);
    }
  }, [session.loggedIn, localStorage.getItem("token")]);

  const [counter, setCounter] = useState(30);
  const timer = useRef(null); // we can save timer in useRef and pass it to child
  useEffect(() => {
    if (session.show_email_varification) {
      // useRef value stored in .current property
      timer.current = setInterval(() => setCounter((v) => v - 1), 1000);

      // clear on component unmount
      return () => {
        clearInterval(timer.current); 
      };
    }
  }, [session.show_email_varification]);

  useEffect(() => {
    if (counter <= 0) {
      clearInterval(timer.current);
      
    }
  }, [counter]);


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
    dispatch(hideFeildValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    await dispatch(userLoginFetch(formState.values));
    //router.history.push('/');
  }

  const emailVerification = async event => {
    event.preventDefault();
    if (!isEmpty(formState.values.verification_code)) {
      await dispatch(verifyEmailCode(session.verify_user.id, formState.values.verification_code));
    }
  }

  const resendVerification = async event => {
    event.preventDefault();
    if (!isEmpty(session.verify_user.id)) {

      await dispatch(resendVerificationCode(session.verify_user.id));
      await setCounter(30);
      timer.current = setInterval(() => setCounter((v) => v - 1), 1000);
    }
    else {
      backToLoginScreen();
    }
  }

  const backToLoginScreen = async event => {
    event.preventDefault();
    setCounter(30);
    await dispatch(resetSessionState());
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideError())
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      {(!session.show_email_varification) ?
        <>
          <div className={classes.fields}>
            <TextField
              error={hasError('email')}
              fullWidth
              helperText={hasError('email') ? formState.errors.email[0] : null}
              label="Email address"
              name="email"
              onChange={handleChange}
              value={formState.values.email || ''}
              variant="outlined"
            />
            <TextField
              error={hasError('password')}
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.values.password || ''}
              variant="outlined"
            />
          </div>
          <Button
            className={classes.submitButton}
            color="secondary"
            disabled={!formState.isValid}
            size="large"
            type="submit"
            variant="contained"
          >
            Sign in
          </Button>
        </>
        :
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
            <Button
              style={{ marginTop: '0px', padding: '6px 10px' }}
              className={classes.submitButton}
              color="secondary"
              disabled={isEmpty(formState.values.verification_code)}
              size="small"
              type="button"
              variant="contained"
              onClick={(e) => emailVerification(e)}
            >
              Verify Code
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ marginTop: '0px', padding: '6px 10px' }}
              className={classes.submitButton}
              disabled={counter !== 0}
              color="secondary"
              size="small"
              type="button"
              variant="contained"
              onClick={(e) => resendVerification(e)}
            >
              Resend Code {(counter !== 0) ? "in " + counter : ""}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ marginTop: '0px', padding: '6px 10px' }}
              className={classes.submitButton}
              color="secondary"
              size="small"
              type="button"
              variant="contained"
              onClick={(e) => backToLoginScreen(e)}
            >
              Back to login
            </Button>
          </Grid>
        </Grid>

      }
      <Snackbar
        open={(session.error !== '' && session.error_type === 'general') ? true : false} autoHideDuration={6000} onClose={handleAlertClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Alert onClose={handleAlertClose} severity="error">
          {session.error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={(session.error !== '' && session.error_type === 'message') ? true : false} autoHideDuration={6000} onClose={handleAlertClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Alert onClose={handleAlertClose} severity="success">
          {session.error}
        </Alert>
      </Snackbar>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

/*const mapStateToProps = state => {
  return {
    session: state.session
  }
}


const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo)),
  verifyEmailCode: (id, verification_code) => dispatch(verifyEmailCode(id, verification_code)),
  resendVerificationCode: (user_id) => dispatch(resendVerificationCode(user_id)),
  resetSessionState: () => dispatch(resetSessionState()),
  hideError: () => dispatch(hideError()),
  hideFeildValidationError: feild_key => dispatch(hideFeildValidationError(feild_key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);*/
export default LoginForm;
