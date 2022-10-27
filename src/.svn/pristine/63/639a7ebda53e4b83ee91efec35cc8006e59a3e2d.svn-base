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

const ActivityCategoryStatusView = () => {
  const classes = useStyles();
  const router = useRouter();
  const activityCategoryStatusState = useSelector(state => state.activityCategoryStatusState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(activityCategoryStatusState.redirect_to_list){
      router.history.push('/activity-category-status');
    } 
  }, [activityCategoryStatusState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!activityCategoryStatusState.showViewPage){
      router.history.push('/activity-category-status');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activityCategoryStatusState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Activity Status View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Status View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Activity Category Status Name </TableCell>
                  <TableCell>{activityCategoryStatusState.activityCategoryStatusRecord.opt_display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Status Parent Category </TableCell>
                  <TableCell>{
                    !isEmpty(activityCategoryStatusState.activityCategoryStatusRecord.parent_category)?
                    activityCategoryStatusState.activityCategoryStatusRecord.parent_category.opt_display:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(activityCategoryStatusState.activityCategoryStatusRecord.created_by_user)?
                    activityCategoryStatusState.activityCategoryStatusRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{activityCategoryStatusState.activityCategoryStatusRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(activityCategoryStatusState.activityCategoryStatusRecord.created_by_user)?
                    activityCategoryStatusState.activityCategoryStatusRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{activityCategoryStatusState.activityCategoryStatusRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Category Status Description" />
        <CardContent> 
            <div 
              className="ck-content" dangerouslySetInnerHTML={{ __html: activityCategoryStatusState.activityCategoryStatusRecord.description }} />
        </CardContent>  
      </Card>   
    </Page>
  );
}

export default ActivityCategoryStatusView;