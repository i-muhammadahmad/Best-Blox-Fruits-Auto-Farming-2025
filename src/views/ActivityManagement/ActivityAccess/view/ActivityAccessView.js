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

const ActivityAccessView = () => {
  const classes = useStyles();
  const router = useRouter();
  const activityAccessState = useSelector(state => state.activityAccessState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(activityAccessState.redirect_to_list){
      router.history.push('/activity-access');
    } 
  }, [activityAccessState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!activityAccessState.showViewPage && !activityAccessState.showUpdateForm){
      router.history.push('/activity-access');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activityAccessState.showUpdateForm, activityAccessState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Activity Access View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Access View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Activity </TableCell>
                  <TableCell>{
                    !isEmpty(activityAccessState.activityAccessRecord.activity)?
                    activityAccessState.activityAccessRecord.activity.name:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Role </TableCell>
                  <TableCell>{
                    !isEmpty(activityAccessState.activityAccessRecord.role)?
                    activityAccessState.activityAccessRecord.role.name:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(activityAccessState.activityAccessRecord.created_by_user)?
                    activityAccessState.activityAccessRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{activityAccessState.activityAccessRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(activityAccessState.activityAccessRecord.created_by_user)?
                    activityAccessState.activityAccessRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{activityAccessState.activityAccessRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Access Description" />
        <CardContent>            
            <div 
              className="ck-content" dangerouslySetInnerHTML={{ __html: activityAccessState.activityAccessRecord.description }} />
        </CardContent>
      </Card>      
    </Page>
  );
}

export default ActivityAccessView;