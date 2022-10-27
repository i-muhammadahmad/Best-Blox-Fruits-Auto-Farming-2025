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

const RolesView = () => {
  const classes = useStyles();
  const router = useRouter();
  const rolesState = useSelector(state => state.rolesState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rolesState.redirect_to_list) {
      router.history.push('/roles');
    }
  }, [rolesState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!rolesState.showViewPage && !rolesState.showUpdateForm) {
      router.history.push('/roles');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesState.showViewPage, rolesState.showUpdateForm]);

  return (
    <Page
      className={classes.root}
      title="Roles View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Roles View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Name </TableCell>
                  <TableCell>{rolesState.rolesRecord.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(rolesState.rolesRecord.created_by_user) ?
                      rolesState.rolesRecord.created_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{rolesState.rolesRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(rolesState.rolesRecord.updated_by_user) ?
                      rolesState.rolesRecord.updated_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{rolesState.rolesRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Roles Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: rolesState.rolesRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default RolesView;