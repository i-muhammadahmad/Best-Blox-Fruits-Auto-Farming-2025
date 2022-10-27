import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Page } from 'components';
import {
  Header,
  BasicInfo,
  UserTimezone,
  UserPassword,
  ProfileImage
} from './components';
import {
  Grid
} from '@material-ui/core';


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

const UsersProfile = () => {
  const classes = useStyles();
 
  return (
    <Page
      className={classes.root}
      title="User Profile"
    >
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <BasicInfo />
          <UserPassword />
        </Grid>
        <Grid item xs={12} sm={5}>
          <ProfileImage />
          <UserTimezone />
        </Grid>
      </Grid>  
    </Page>
  );
};

export default UsersProfile;
