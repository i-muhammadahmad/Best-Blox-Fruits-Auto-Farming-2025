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

const EmployeeAttritionReasonView = () => {
  const classes = useStyles();
  const router = useRouter();
  const employeeAttritionReasonState = useSelector(state => state.employeeAttritionReasonState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(employeeAttritionReasonState.redirect_to_list){
      router.history.push('/attrition-reasons');
    } 
  }, [employeeAttritionReasonState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!employeeAttritionReasonState.showUpdateForm && !employeeAttritionReasonState.showViewPage) {
      router.history.push('/attrition-reasons');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionReasonState.showUpdateForm, employeeAttritionReasonState.showViewPage]);

  useEffect(() => {
    if (employeeAttritionReasonState.redirect_to_list) {
      router.history.push('/attrition-reasons');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionReasonState.redirect_to_list]);

  return (
    <Page
      className={classes.root}
      title="Employee Attrition Reason View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Employee Attrition Reason View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Attrition Reason Name </TableCell>
                  <TableCell>{employeeAttritionReasonState.employeeAttritionReasonRecord.opt_display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Attrition Reason Type </TableCell>
                  <TableCell>{
                    !isEmpty(employeeAttritionReasonState.employeeAttritionReasonRecord.attrition_type)?
                    employeeAttritionReasonState.employeeAttritionReasonRecord.attrition_type.opt_display:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(employeeAttritionReasonState.employeeAttritionReasonRecord.created_by_user)?
                    employeeAttritionReasonState.employeeAttritionReasonRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{employeeAttritionReasonState.employeeAttritionReasonRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(employeeAttritionReasonState.employeeAttritionReasonRecord.created_by_user)?
                    employeeAttritionReasonState.employeeAttritionReasonRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{employeeAttritionReasonState.employeeAttritionReasonRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Employee Attrition Reason Description" />
        <CardContent> 
            <div 
              className="ck-content" dangerouslySetInnerHTML={{ __html: employeeAttritionReasonState.employeeAttritionReasonRecord.description }} />
        </CardContent>  
      </Card>   
    </Page>
  );
}

export default EmployeeAttritionReasonView;