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

const ActivityCategoryView = () => {
  const classes = useStyles();
  const router = useRouter();
  const activityCategoryState = useSelector(state => state.activityCategoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(activityCategoryState.redirect_to_list){
      router.history.push('/activity-category');
    } 
  }, [activityCategoryState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!activityCategoryState.showViewPage){
      router.history.push('/activity-category');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activityCategoryState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Activity Category View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Category View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Activity Category Name </TableCell>
                  <TableCell>{activityCategoryState.activityCategoryRecord.opt_display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Activity Category Parent </TableCell>
                  <TableCell>{
                    !isEmpty(activityCategoryState.activityCategoryRecord.parent_category)?
                    activityCategoryState.activityCategoryRecord.parent_category.opt_display:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(activityCategoryState.activityCategoryRecord.created_by_user)?
                    activityCategoryState.activityCategoryRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{activityCategoryState.activityCategoryRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(activityCategoryState.activityCategoryRecord.created_by_user)?
                    activityCategoryState.activityCategoryRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{activityCategoryState.activityCategoryRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Category Description" />
        <CardContent>
          <div 
            className="ck-content" dangerouslySetInnerHTML={{ __html: activityCategoryState.activityCategoryRecord.description }} 
          />  
        </CardContent>  
      </Card>   
    </Page>  
  );
}

export default ActivityCategoryView;