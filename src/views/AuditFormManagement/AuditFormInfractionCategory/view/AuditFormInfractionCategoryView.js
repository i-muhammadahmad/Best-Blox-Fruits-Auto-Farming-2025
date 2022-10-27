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

const AuditFormInfractionCategoryView = () => {
  const classes = useStyles();
  const router = useRouter();
  const auditFormInfractionCategoryState = useSelector(state => state.auditFormInfractionCategoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auditFormInfractionCategoryState.redirect_to_list){
      router.history.push('/audit-form-infraction-category');
    } 
  }, [auditFormInfractionCategoryState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!auditFormInfractionCategoryState.showViewPage && !auditFormInfractionCategoryState.showUpdateForm){
      router.history.push('/audit-form-infraction-category');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auditFormInfractionCategoryState.showViewPage, auditFormInfractionCategoryState.showUpdateForm]);

  return (
    <Page
      className={classes.root}
      title="Audit Form Infraction Category View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Form Infraction Category View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Audit Form Infraction Category Name </TableCell>
                  <TableCell>{auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.opt_display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Audit Form Infraction Category Parent </TableCell>
                  <TableCell>{
                    !isEmpty(auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.parent_category)?
                    auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.parent_category.opt_display:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.created_by_user)?
                    auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.created_by_user)?
                    auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Form Infraction Category Description" />
        <CardContent>
          <div 
            className="ck-content" dangerouslySetInnerHTML={{ __html: auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.description }} 
          />  
        </CardContent>  
      </Card>   
    </Page>  
  );
}

export default AuditFormInfractionCategoryView;