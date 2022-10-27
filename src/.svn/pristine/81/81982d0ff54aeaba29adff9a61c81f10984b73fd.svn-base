import React, {useEffect} from 'react';
import { Page } from 'components';
import useRouter from 'utils/useRouter';
import {
  Header
} from './components'; 
import { 
  makeStyles,
  Paper,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardHeader,
  CardContent,
  Grid
} from '@material-ui/core';
import moment from 'moment';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

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

const UsersView = () => {
  const classes = useStyles();
  const router = useRouter();
  const usersState = useSelector(state => state.usersState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(usersState.redirect_to_list){
      router.history.push('/users');
    } 
  }, [usersState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!usersState.showViewPage && !usersState.showUpdateForm){
      router.history.push('/users');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[usersState.showViewPage, usersState.showUpdateForm]);

  return (
    <Page
      className={classes.root}
      title="Users View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Users View" />
        <CardContent>
          {(!isEmpty(usersState.usersRecord.employee) && usersState.usersRecord.employee.is_active == 'n')?
            <Grid container spacing={3} style={{marginTop: '-37px', marginBottom: '23px'}}>
              <Grid item xs={8} sm={6}>
              <MuiAlert elevation={6} variant="filled" severity="warning" style={{borderRadius: '20px'}} >
                  Employee is separated from PremierBPO! &nbsp; <b>Separation Date: </b> 
                  {moment(usersState.usersRecord.employee.end_date).format('MMM DD, YYYY')}
                </MuiAlert>
              </Grid>
            </Grid>   
            :''
          }   
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Employee </TableCell>
                  <TableCell>{
                    !isEmpty(usersState.usersRecord.employee)?
                    usersState.usersRecord.employee.firstname
                    +' '+usersState.usersRecord.employee.middlename
                    +' '+usersState.usersRecord.employee.lastname:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Email </TableCell>
                  <TableCell>{usersState.usersRecord.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Timezone </TableCell>
                  <TableCell>{
                    !isEmpty(usersState.usersRecord.user_timezone)?
                    usersState.usersRecord.user_timezone.offset:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > User Roles </TableCell>
                  <TableCell>{
                    !isEmpty(usersState.usersRecord.roles)?
                    <div> {
                      usersState.usersRecord.roles.map(role => (
                        <div key={role.id}>
                          {role.name}
                        </div> 
                      ))
                    }</div> 
                    :''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Is Super Admin </TableCell>
                  <TableCell>{
                    (usersState.usersRecord.is_super_admin === 'y')? 
                    'Yes':'No'
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Is Loked </TableCell>
                  <TableCell>{
                    (usersState.usersRecord.is_locked === 'y')? 
                    'Yes':'No'
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(usersState.usersRecord.created_by_user)?
                    usersState.usersRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{usersState.usersRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(usersState.usersRecord.created_by_user)?
                    usersState.usersRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{usersState.usersRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Users Description" />
        <CardContent>
          <div 
            className="ck-content" dangerouslySetInnerHTML={{ __html: usersState.usersRecord.description }} 
          />  
        </CardContent>  
      </Card>   
    </Page>  
  );
}

export default UsersView;