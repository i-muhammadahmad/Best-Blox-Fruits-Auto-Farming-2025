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

const ActivitySetupView = () => {
  const classes = useStyles();
  const router = useRouter();
  const activitySetupState = useSelector(state => state.activitySetupState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(activitySetupState.redirect_to_list){
      router.history.push('/activity-setup');
    } 
  }, [activitySetupState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!activitySetupState.showViewPage && !activitySetupState.showUpdateForm){
      router.history.push('/activity-setup');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activitySetupState.showViewPage, activitySetupState.showUpdateForm]);

  return (
    <Page
      className={classes.root}
      title="Activity Setup View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Setup View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Name </TableCell>
                  <TableCell>{activitySetupState.activitySetupRecord.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Unit Processing Time (Seconds) </TableCell>
                  <TableCell>{activitySetupState.activitySetupRecord.unit_processing_time}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Passing Percentage(%) </TableCell>
                  <TableCell>{activitySetupState.activitySetupRecord.passing_score}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Client </TableCell>
                  <TableCell>{
                    !isEmpty(activitySetupState.activitySetupRecord.activity_client)?
                    activitySetupState.activitySetupRecord.activity_client.client_name:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Activity Category </TableCell>
                  <TableCell>{
                    !isEmpty(activitySetupState.activitySetupRecord.activity_category)?
                    activitySetupState.activitySetupRecord.activity_category.opt_display:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(activitySetupState.activitySetupRecord.created_by_user)?
                    activitySetupState.activitySetupRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{activitySetupState.activitySetupRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(activitySetupState.activitySetupRecord.created_by_user)?
                    activitySetupState.activitySetupRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{activitySetupState.activitySetupRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Setup Description" />
        <CardContent> 
            <div 
              className="ck-content" dangerouslySetInnerHTML={{ __html: activitySetupState.activitySetupRecord.description }} />
        </CardContent>  
      </Card>   
    </Page>
  );
}

export default ActivitySetupView;