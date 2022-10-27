/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useRouter from 'utils/useRouter';
import { userLoginFetch, hideError, hideFeildValidationError } from 'actions';

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
  
  const { 
    className,
    sessionReducer,
    userLoginFetch,
    hideError,
    hideFeildValidationError,
     ...rest } = props;

  const classes = useStyles();
  const router = useRouter();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
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
    if(sessionReducer.error_type === 'validation'){
      const errors = sessionReducer.error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }  
  }, [sessionReducer.error_type, sessionReducer.error]);

  useEffect(() => {
    if(sessionReducer.loggedIn){
      router.history.push('/');
    } 
  }, [sessionReducer.loggedIn, router.history]);
  

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
    hideFeildValidationError(event.target.name)
  }

  const handleSubmit = async event => {
    event.preventDefault();
    userLoginFetch(formState.values);
    //router.history.push('/');
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideError()
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
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
      <Snackbar
        open={(sessionReducer.error !== '' && sessionReducer.error_type === 'general')?true:false} autoHideDuration={6000} onClose={handleAlertClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Alert onClose={handleAlertClose} severity="error">
          {sessionReducer.error}
        </Alert>
      </Snackbar>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    sessionReducer: state.session
  }
}

const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo)),
  hideError: () =>  dispatch(hideError()),
  hideFeildValidationError: feild_key =>  dispatch(hideFeildValidationError(feild_key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
//export default LoginForm;
