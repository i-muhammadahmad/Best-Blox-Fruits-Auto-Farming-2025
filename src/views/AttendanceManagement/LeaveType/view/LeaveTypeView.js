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

const LeaveTypeView = () => {
  const classes = useStyles();
  const router = useRouter();
  const leaveTypeState = useSelector(state => state.leaveTypeState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (leaveTypeState.redirect_to_list) {
      router.history.push('/leave-type');
    }
  }, [leaveTypeState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!leaveTypeState.showViewPage) {
      router.history.push('/leave-type');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveTypeState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Leave Type View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Leave Type View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Leave Type </TableCell>
                  <TableCell>{leaveTypeState.leaveTypeRecord.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Office </TableCell>
                  <TableCell>{
                    !isEmpty(leaveTypeState.leaveTypeRecord.office_record)?
                    leaveTypeState.leaveTypeRecord.office_record.name : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(leaveTypeState.leaveTypeRecord.created_by_user) ?
                      leaveTypeState.leaveTypeRecord.created_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{leaveTypeState.leaveTypeRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(leaveTypeState.leaveTypeRecord.updated_by_user) ?
                      leaveTypeState.leaveTypeRecord.updated_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{leaveTypeState.leaveTypeRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Leave Type Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: leaveTypeState.leaveTypeRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default LeaveTypeView;