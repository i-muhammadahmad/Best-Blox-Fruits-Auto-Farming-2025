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

const ObjectTypesView = () => {
  const classes = useStyles();
  const router = useRouter();
  const objectTypesState = useSelector(state => state.objectTypesState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (objectTypesState.redirect_to_list) {
      router.history.push('/object-types');
    }
  }, [objectTypesState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!objectTypesState.showUpdateForm && !objectTypesState.showViewPage) {
      router.history.push('/object-types');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectTypesState.showUpdateForm, objectTypesState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Object Types View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Object Types View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Object Type Name </TableCell>
                  <TableCell>{objectTypesState.objectTypesRecord.opt_display}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(objectTypesState.objectTypesRecord.created_by_user) ?
                      objectTypesState.objectTypesRecord.created_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{objectTypesState.objectTypesRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(objectTypesState.objectTypesRecord.created_by_user) ?
                      objectTypesState.objectTypesRecord.updated_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{objectTypesState.objectTypesRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="ObjectTypes Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: objectTypesState.objectTypesRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default ObjectTypesView;