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
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, find } from 'lodash';

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

const ClientHeadcountView = () => {
  const classes = useStyles();
  const router = useRouter();
  const clientHeadcountState = useSelector(state => state.clientHeadcountState);
  const shiftsState = useSelector(state => state.shiftsState);
  const designationState = useSelector(state => state.designationState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (clientHeadcountState.redirect_to_list) {
      router.history.push('/client-headcount');
    }
  }, [clientHeadcountState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!clientHeadcountState.showUpdateForm && !clientHeadcountState.showViewPage) {
      router.history.push('/client-headcount');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientHeadcountState.showUpdateForm, clientHeadcountState.showViewPage]);

  const getClientName = value => {
    let client_name = '';
    if (!isEmpty(value.client)) {
      client_name = value.client.client_name;
    }
    return client_name;
  }

  const getOfficeName = value => {
    let office_name = '';
    if (!isEmpty(value.office)) {
      office_name = value.office.name;
    }
    return office_name;
  }

  const getDesignationName = hrecord => {
    let designation_name = '';
    const item = find(designationState.designationList, ['id', hrecord['designation_id']]);
    if (!isEmpty(item)) {
      designation_name = item.name;
    }
    return designation_name;
  }

  const getShiftName = hrecord => {
    let shift_name = '';
    const item = find(shiftsState.shiftsByClientList, ['id', hrecord['shift_id']]);
    if (!isEmpty(item)) {
      shift_name = item.name;
    }
    return shift_name;
  }

  return (
    <Page
      className={classes.root}
      title="Client Headcount View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Client Headcount View" />
        <CardContent>
          <Grid container spacing={3}  >
            <Grid item xs={12} sm={6} >
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > From Date </TableCell>
                      <TableCell>{clientHeadcountState.clientHeadcountRecord.from_date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > To Date </TableCell>
                      <TableCell>{clientHeadcountState.clientHeadcountRecord.to_date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Office </TableCell>
                      <TableCell>{getClientName(clientHeadcountState.clientHeadcountRecord)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Client </TableCell>
                      <TableCell>{getClientName(clientHeadcountState.clientHeadcountRecord)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} sm={6} >
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > Created By </TableCell>
                      <TableCell>{
                        !isEmpty(clientHeadcountState.clientHeadcountRecord.created_by_user) ?
                          clientHeadcountState.clientHeadcountRecord.created_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Created At </TableCell>
                      <TableCell>{clientHeadcountState.clientHeadcountRecord.date_created}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated By </TableCell>
                      <TableCell>{
                        !isEmpty(clientHeadcountState.clientHeadcountRecord.updated_by_user) ?
                          clientHeadcountState.clientHeadcountRecord.updated_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated At </TableCell>
                      <TableCell>{clientHeadcountState.clientHeadcountRecord.date_last_modified}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Client Headcount Details" />
        <CardContent>
          {!isEmpty(clientHeadcountState.clientHeadcountRecord.headcount_details) ?
            <Grid container spacing={3}  >
              <Grid item xs={12} sm={12} >
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Designation </TableCell>
                        <TableCell> Shift </TableCell>
                        <TableCell> Billables </TableCell>
                        <TableCell> Primary Count </TableCell>
                        <TableCell> Backfill Count </TableCell>
                        <TableCell> Notes </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {clientHeadcountState.clientHeadcountRecord.headcount_details.map((hcount, index) => (
                        <TableRow key={index}>
                          <TableCell > {getDesignationName(hcount)} </TableCell>
                          <TableCell>{getShiftName(hcount)}</TableCell>
                          <TableCell>{hcount.billables}</TableCell>
                          <TableCell>{hcount.primary_count}</TableCell>
                          <TableCell>{hcount.backfill_count}</TableCell>
                          <TableCell>
                            <div
                              style={{ padding: '20px' }}
                              className="ck-content" dangerouslySetInnerHTML={{ __html: hcount.description }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            : ''}
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Client Headcount Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: clientHeadcountState.clientHeadcountRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default ClientHeadcountView;