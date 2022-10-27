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
  Typography
} from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
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

const AuditFormSetupView = () => {
  const classes = useStyles();
  const router = useRouter();
  const auditFormSetupState = useSelector(state => state.auditFormSetupState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auditFormSetupState.redirect_to_list) {
      router.history.push('/audit-form-setup');
    }
  }, [auditFormSetupState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!auditFormSetupState.showViewPage && !auditFormSetupState.showUpdateForm) {
      router.history.push('/audit-form-setup');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditFormSetupState.showViewPage, auditFormSetupState.showUpdateForm]);

  const getClientName = value => {
    let client_name = '';
    if(!isEmpty(value.client)){
      client_name = value.client.client_name;
    }
    return client_name;
  }

  return (
    <Page
      className={classes.root}
      title="Audit Form Setup View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Form Setup View" />
        <CardContent>
          <Grid container spacing={3}  >
            <Grid item xs={12} sm={6} >
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > Name </TableCell>
                      <TableCell>{auditFormSetupState.auditFormSetupRecord.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Client </TableCell>
                      <TableCell>{getClientName(auditFormSetupState.auditFormSetupRecord)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Passing Score </TableCell>
                      <TableCell>{auditFormSetupState.auditFormSetupRecord.passing_score}</TableCell>
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
                        !isEmpty(auditFormSetupState.auditFormSetupRecord.created_by_user) ?
                          auditFormSetupState.auditFormSetupRecord.created_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Created At </TableCell>
                      <TableCell>{auditFormSetupState.auditFormSetupRecord.date_created}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated By </TableCell>
                      <TableCell>{
                        !isEmpty(auditFormSetupState.auditFormSetupRecord.updated_by_user) ?
                          auditFormSetupState.auditFormSetupRecord.updated_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated At </TableCell>
                      <TableCell>{auditFormSetupState.auditFormSetupRecord.date_last_modified}</TableCell>
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
        <CardHeader title="Audit Form Setup Checkpoints" />
        <CardContent>
          {!isEmpty(auditFormSetupState.auditFormSetupRecord.checkpoints)?
            <>
              {auditFormSetupState.auditFormSetupRecord.checkpoints.map((chkpoint, index) => (
                <>
                  <Typography variant="h3" component="h3">
                    <CheckBoxOutlinedIcon 
                      style={{paddingTop: '4px', color: 'green'}}
                    />
                    {chkpoint.title}
                  </Typography>
                  <div
                    style={{padding: '20px'}}
                    className="ck-content" dangerouslySetInnerHTML={{ __html: chkpoint.description }}
                  />
                </>  
              ))} 
            </>
          : ''}
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Form Setup Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: auditFormSetupState.auditFormSetupRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default AuditFormSetupView;