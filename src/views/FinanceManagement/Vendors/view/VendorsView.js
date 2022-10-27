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

const VendorsView = () => {
  const classes = useStyles();
  const router = useRouter();
  const vendorsState = useSelector(state => state.vendorsState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendorsState.redirect_to_list) {
      router.history.push('/vendors');
    }
  }, [vendorsState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!vendorsState.showUpdateForm && !vendorsState.showViewPage) {
      router.history.push('/vendors');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorsState.showUpdateForm, vendorsState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Vendors View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Vendors View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Name </TableCell>
                  <TableCell>{vendorsState.vendorsRecord.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Phone No </TableCell>
                  <TableCell>{vendorsState.vendorsRecord.phone_no}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Email </TableCell>
                  <TableCell>{vendorsState.vendorsRecord.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Address </TableCell>
                  <TableCell>{vendorsState.vendorsRecord.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(vendorsState.vendorsRecord.created_by_user) ?
                      vendorsState.vendorsRecord.created_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{vendorsState.vendorsRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(vendorsState.vendorsRecord.created_by_user) ?
                      vendorsState.vendorsRecord.updated_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{vendorsState.vendorsRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Vendors Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: vendorsState.vendorsRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default VendorsView;