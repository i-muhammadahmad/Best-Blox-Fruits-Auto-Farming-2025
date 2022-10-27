/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import MicrosoftLogin from "react-microsoft-login";
import {
  AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID,
  AZURE_ACTIVE_DIRECTORY_APP_REDIRECT_URI
} from 'configs';
import { showMsalError, loginWithMsal } from 'actions';

const useStyles = makeStyles(theme => ({
  root: {},
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const MsalLogin = props => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const authHandler = (err, data) => {
    //console.log(err, data);
    if (!err && data) {
      dispatch(loginWithMsal(data));
    }
    else if(err){
      dispatch(showMsalError(err.name+": "+err.errorMessage));
    }
    else{
      dispatch(showMsalError('Enable to login. Something went wrong'));
    }
  };

  return (
    
    <div className={classes.fields}>
      {<MicrosoftLogin 
        clientId={AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID} 
        authCallback={(err, data) => { authHandler(err, data)}}
        redirectUri={AZURE_ACTIVE_DIRECTORY_APP_REDIRECT_URI}
        withUserData={true}
      />}
    </div>
  );
};

export default React.memo(MsalLogin);
