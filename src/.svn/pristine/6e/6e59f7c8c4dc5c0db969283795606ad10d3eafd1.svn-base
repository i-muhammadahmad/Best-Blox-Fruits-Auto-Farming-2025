import React, { useEffect } from 'react';
import { Page } from 'components';
import useRouter from 'utils/useRouter';
import {
  Header
} from './components';
import {
  makeStyles,
  Paper,
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
import { isEmpty, capitalize } from 'lodash';
import moment from 'moment';

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

const LeaveScheduleView = () => {
  const classes = useStyles();
  const router = useRouter();
  const leaveScheduleState = useSelector(state => state.leaveScheduleState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (leaveScheduleState.redirect_to_list) {
      router.history.push('/leave-schedule');
    }
  }, [leaveScheduleState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!leaveScheduleState.showViewPage) {
      router.history.push('/leave-schedule');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveScheduleState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Schedule Leave View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Schedule Leave View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Leave Type </TableCell>
                  <TableCell>{
                    !isEmpty(leaveScheduleState.leaveScheduleRecord.leave_type)? 
                    leaveScheduleState.leaveScheduleRecord.leave_type.name : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Start Date </TableCell>
                  <TableCell>{moment(leaveScheduleState.leaveScheduleRecord.start_date).format('MM/DD/YYYY')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > End Date </TableCell>
                  <TableCell>{moment(leaveScheduleState.leaveScheduleRecord.end_date).format('MM/DD/YYYY')}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Status </TableCell>
                  <TableCell>{capitalize(leaveScheduleState.leaveScheduleRecord.leave_status)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > No of Approvals </TableCell>
                  <TableCell>{leaveScheduleState.leaveScheduleRecord.no_of_approvals}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > No of Days </TableCell>
                  <TableCell>{leaveScheduleState.leaveScheduleRecord.no_of_leaves}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(leaveScheduleState.leaveScheduleRecord.created_by_user) ?
                      leaveScheduleState.leaveScheduleRecord.created_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{leaveScheduleState.leaveScheduleRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(leaveScheduleState.leaveScheduleRecord.updated_by_user) ?
                      leaveScheduleState.leaveScheduleRecord.updated_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{leaveScheduleState.leaveScheduleRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="LeaveSchedule Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: leaveScheduleState.leaveScheduleRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default LeaveScheduleView;