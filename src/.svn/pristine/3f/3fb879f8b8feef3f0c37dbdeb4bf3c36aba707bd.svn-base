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

const CourseCategoryView = () => {
  const classes = useStyles();
  const router = useRouter();
  const courseCategoryState = useSelector(state => state.courseCategoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(courseCategoryState.redirect_to_list){
      router.history.push('/course-category');
    } 
  }, [courseCategoryState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!courseCategoryState.showUpdateForm && !courseCategoryState.showViewPage){
      router.history.push('/course-category');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[courseCategoryState.showUpdateForm, courseCategoryState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Course Category View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Course Category View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Course Category Name </TableCell>
                  <TableCell>{courseCategoryState.courseCategoryRecord.opt_display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Course Category Parent </TableCell>
                  <TableCell>{
                    !isEmpty(courseCategoryState.courseCategoryRecord.parent_category)?
                    courseCategoryState.courseCategoryRecord.parent_category.opt_display:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(courseCategoryState.courseCategoryRecord.created_by_user)?
                    courseCategoryState.courseCategoryRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{courseCategoryState.courseCategoryRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(courseCategoryState.courseCategoryRecord.updated_by_user)?
                    courseCategoryState.courseCategoryRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{courseCategoryState.courseCategoryRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Course Category Description" />
        <CardContent>
          <div 
            className="ck-content" dangerouslySetInnerHTML={{ __html: courseCategoryState.courseCategoryRecord.description }} 
          />  
        </CardContent>  
      </Card>   
    </Page>  
  );
}

export default CourseCategoryView;