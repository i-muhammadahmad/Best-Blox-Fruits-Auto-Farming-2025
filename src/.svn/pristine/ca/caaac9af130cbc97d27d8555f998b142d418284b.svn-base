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
  CardContent,
  Grid,
  ButtonBase
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { API_URL } from 'configs';

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
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const EmployeesView = () => {
  const classes = useStyles();
  const router = useRouter();
  const employeesState = useSelector(state => state.employeesState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (employeesState.redirect_to_list) {
      router.history.push('/unreturned-assets-employees');
    }
  }, [employeesState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!employeesState.showViewPage) {
      router.history.push('/unreturned-assets-employees');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Employees View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Employees View" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={8} sm={8}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > Employee Code </TableCell>
                      <TableCell>{employeesState.employeesRecord.employee_code}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Email </TableCell>
                      <TableCell>{employeesState.employeesRecord.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Sudo Name </TableCell>
                      <TableCell>{employeesState.employeesRecord.sudo_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > First Name </TableCell>
                      <TableCell>{employeesState.employeesRecord.firstname}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Middle Name </TableCell>
                      <TableCell>{employeesState.employeesRecord.middlename}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Name </TableCell>
                      <TableCell>{employeesState.employeesRecord.lastname}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Office Phone No </TableCell>
                      <TableCell>{employeesState.employeesRecord.office_phone_no}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Office Phone Extention </TableCell>
                      <TableCell>{employeesState.employeesRecord.office_ext}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Personal Phone No </TableCell>
                      <TableCell>{employeesState.employeesRecord.personal_phone_no}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Office </TableCell>
                      <TableCell>{
                        !isEmpty(employeesState.employeesRecord.office) ?
                          employeesState.employeesRecord.office.name : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Clients </TableCell>
                      <TableCell>
                        <div style={{whiteSpace: 'nowrap'}}> {
                          !isEmpty(employeesState.employeesRecord.employee_clients)?
                          <div> 
                          {Object.values(employeesState.employeesRecord.employee_clients).map(camp => (
                            <div key={camp.id}>
                              {camp.client_name}
                              {' ('+((camp.is_primary == true)?'Primary':'Secondary')+')'}
                            </div> 
                          ))}
                          </div> 
                          :''
                        }</div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Workstation </TableCell>
                      <TableCell>{
                        !isEmpty(employeesState.employeesRecord.workstation) ?
                          employeesState.employeesRecord.workstation.name : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Date of Brith </TableCell>
                      <TableCell>{employeesState.employeesRecord.dob}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Joining Date </TableCell>
                      <TableCell>{employeesState.employeesRecord.start_date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Show In Premier Directory </TableCell>
                      <TableCell>{
                        (employeesState.employeesRecord.show_in_premier_directory == true)?'Yes':'No'
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Created By </TableCell>
                      <TableCell>{
                        !isEmpty(employeesState.employeesRecord.created_by_user) ?
                          employeesState.employeesRecord.created_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Created At </TableCell>
                      <TableCell>{employeesState.employeesRecord.date_created}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated By </TableCell>
                      <TableCell>{
                        !isEmpty(employeesState.employeesRecord.updated_by_user) ?
                          employeesState.employeesRecord.updated_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated At </TableCell>
                      <TableCell>{employeesState.employeesRecord.date_last_modified}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={4} sm={4}>
              {(employeesState.employeesRecord.profile_pic)?
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={API_URL+employeesState.employeesRecord.profile_pic} />
              </ButtonBase>
              :''}
            </Grid>
          </Grid>   
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Employees Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: employeesState.employeesRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default EmployeesView;