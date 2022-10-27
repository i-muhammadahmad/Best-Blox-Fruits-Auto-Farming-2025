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
import { isEmpty, join } from 'lodash';

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

const AuditFormCategoryView = () => {
  const classes = useStyles();
  const router = useRouter();
  const auditFormCategoryState = useSelector(state => state.auditFormCategoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(auditFormCategoryState.redirect_to_list){
      router.history.push('/audit-form-category');
    } 
  }, [auditFormCategoryState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!auditFormCategoryState.showViewPage && !auditFormCategoryState.showUpdateForm){
      router.history.push('/audit-form-category');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auditFormCategoryState.showViewPage, auditFormCategoryState.showUpdateForm]);

  const getAuditFormSetup = () => {
		let setupsArr = [];

		if (!isEmpty(auditFormCategoryState.auditFormCategoryRecord.category_setups)) {
			Object.values(auditFormCategoryState.auditFormCategoryRecord.category_setups).map(camp => {
				setupsArr.push(camp['setup'].name);
			});
			return <span>{join(setupsArr, [', '])}</span>;
		}
	};

  return (
    <Page
      className={classes.root}
      title="Audit Form Category View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Form Category View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Audit Form Category Name </TableCell>
                  <TableCell>{auditFormCategoryState.auditFormCategoryRecord.opt_display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Audit Form Category Parent </TableCell>
                  <TableCell>{
                    !isEmpty(auditFormCategoryState.auditFormCategoryRecord.parent_category)?
                    auditFormCategoryState.auditFormCategoryRecord.parent_category.opt_display:''
                  }</TableCell>
                </TableRow>
                <TableRow>
									<TableCell variant="head"> Audit Form </TableCell>
									<TableCell>{getAuditFormSetup()}</TableCell>
								</TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(auditFormCategoryState.auditFormCategoryRecord.created_by_user)?
                    auditFormCategoryState.auditFormCategoryRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{auditFormCategoryState.auditFormCategoryRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(auditFormCategoryState.auditFormCategoryRecord.created_by_user)?
                    auditFormCategoryState.auditFormCategoryRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{auditFormCategoryState.auditFormCategoryRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Form Category Description" />
        <CardContent>
          <div 
            className="ck-content" dangerouslySetInnerHTML={{ __html: auditFormCategoryState.auditFormCategoryRecord.description }} 
          />  
        </CardContent>  
      </Card>   
    </Page>  
  );
}

export default AuditFormCategoryView;