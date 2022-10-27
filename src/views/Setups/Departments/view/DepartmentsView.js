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

const DepartmentsView = () => {
  const classes = useStyles();
  const router = useRouter();
  const departmentsState = useSelector(state => state.departmentsState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (departmentsState.redirect_to_list) {
      router.history.push('/departments');
    }
  }, [departmentsState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!departmentsState.showUpdateForm && !departmentsState.showViewPage) {
      router.history.push('/departments');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentsState.showUpdateForm], departmentsState.showViewPage);

  const getDepHeadName = value => {
    let emp_name = ''
    if (!isEmpty(value.deparment_head)) {
      emp_name = value.deparment_head.firstname + ' ' + value.deparment_head.lastname;
    }
    return emp_name;
  }

  return (
    <Page
      className={classes.root}
      title="Departments View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Departments View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Name </TableCell>
                  <TableCell>{departmentsState.departmentsRecord.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Email </TableCell>
                  <TableCell>{departmentsState.departmentsRecord.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Office </TableCell>
                  <TableCell>{
                    !isEmpty(departmentsState.departmentsRecord.office) ?
                      departmentsState.departmentsRecord.office.name : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Department Head </TableCell>
                  <TableCell>{getDepHeadName(departmentsState.departmentsRecord)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(departmentsState.departmentsRecord.created_by_user) ?
                      departmentsState.departmentsRecord.created_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{departmentsState.departmentsRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(departmentsState.departmentsRecord.updated_by_user) ?
                      departmentsState.departmentsRecord.updated_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{departmentsState.departmentsRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Departments Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: departmentsState.departmentsRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default DepartmentsView;