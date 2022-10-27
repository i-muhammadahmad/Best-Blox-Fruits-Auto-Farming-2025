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

const AuditErrorCategoryView = () => {
  const classes = useStyles();
  const router = useRouter();
  const auditErrorCategoryState = useSelector(state => state.auditErrorCategoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auditErrorCategoryState.redirect_to_list){
      router.history.push('/activity-audit/error-category');
    } 
  }, [auditErrorCategoryState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!auditErrorCategoryState.showUpdateForm && !auditErrorCategoryState.showViewPage) {
      router.history.push('/activity-audit/error-category');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditErrorCategoryState.showUpdateForm, auditErrorCategoryState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Audit Error Category View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Error Category" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Audit Error Category Name </TableCell>
                  <TableCell>{auditErrorCategoryState.auditErrorCategoryRecord.opt_display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Audit Error Category Parent </TableCell>
                  <TableCell>{
                    !isEmpty(auditErrorCategoryState.auditErrorCategoryRecord.parent_category)?
                    auditErrorCategoryState.auditErrorCategoryRecord.parent_category.opt_display:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(auditErrorCategoryState.auditErrorCategoryRecord.created_by_user)?
                    auditErrorCategoryState.auditErrorCategoryRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{auditErrorCategoryState.auditErrorCategoryRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(auditErrorCategoryState.auditErrorCategoryRecord.created_by_user)?
                    auditErrorCategoryState.auditErrorCategoryRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{auditErrorCategoryState.auditErrorCategoryRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Error Category Description" />
        <CardContent>    
            <div 
              className="ck-content" dangerouslySetInnerHTML={{ __html: auditErrorCategoryState.auditErrorCategoryRecord.description }} />
        </CardContent>
      </Card>         
    </Page>
  );
}

export default AuditErrorCategoryView;