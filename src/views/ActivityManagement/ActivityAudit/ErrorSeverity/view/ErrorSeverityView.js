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
  CardContent
} from '@material-ui/core';
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

const ErrorSeverityView = () => {
  const classes = useStyles();
  const router = useRouter();
  const auditErrorSeverityState = useSelector(state => state.auditErrorSeverityState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auditErrorSeverityState.redirect_to_list){
      router.history.push('/activity-audit/error-severity');
    } 
  }, [auditErrorSeverityState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!auditErrorSeverityState.showViewPage){
      router.history.push('/activity-audit/error-severity');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auditErrorSeverityState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Audit Error Severity View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Error Severity View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Audit Error Severity Name </TableCell>
                  <TableCell>{auditErrorSeverityState.errorSeverityRecord.opt_display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(auditErrorSeverityState.errorSeverityRecord.created_by_user)?
                    auditErrorSeverityState.errorSeverityRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{auditErrorSeverityState.errorSeverityRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(auditErrorSeverityState.errorSeverityRecord.created_by_user)?
                    auditErrorSeverityState.errorSeverityRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{auditErrorSeverityState.errorSeverityRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Error Severity Description" />
        <CardContent>
          <div 
            className="ck-content" dangerouslySetInnerHTML={{ __html: auditErrorSeverityState.errorSeverityRecord.description }} 
          />  
        </CardContent>  
      </Card>           
    </Page>
  );
}

export default ErrorSeverityView;