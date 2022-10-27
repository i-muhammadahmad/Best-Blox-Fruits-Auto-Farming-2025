import React, { useEffect } from 'react';
import { Page } from 'components';
import useRouter from 'utils/useRouter';
import {
  Header,
  InfractionDetails,
  NoteDetails,
  CoachingDetails,
  ImagePreviewModel
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
  Typography,
  Box
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

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

const AuditFormView = () => {
  const classes = useStyles();
  const router = useRouter();
  const auditFormState = useSelector(state => state.auditFormState);
  const dispatch = useDispatch();

  const [openImageViewModel, setOpenImageViewModel] = React.useState(false);
  const [imageRecord, setImageRecord] = React.useState([]);

  useEffect(() => {
    if (auditFormState.redirect_to_list) {
      router.history.push('/audit-form');
    }
  }, [auditFormState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!auditFormState.showViewPage && !auditFormState.showUpdateForm) {
      router.history.push('/audit-form');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditFormState.showViewPage, auditFormState.showUpdateForm]);

  const getClientName = value => {
    let client_name = '';
    if(!isEmpty(value.client)){
      client_name = value.client.client_name;
    }
    return client_name;
  }

  const getEmployeeName = value => {
    let emp_name = '';
    if(!isEmpty(value.employee)){
      emp_name = value.employee.emp_name;
    }
    return emp_name;
  }

  const getAuditFormSetupName = value => {
    let setup_name = '';
    if(!isEmpty(value.audit_form_setup)){
      setup_name = value.audit_form_setup.name;
    }
    return setup_name;
  }

  const getAuditFormCategoryName = value => {
    let category_name = '';
    if(!isEmpty(value.audit_form_category)){
      category_name = value.audit_form_category.opt_display;
    }
    return category_name;
  }

  return (
    <Page
      className={classes.root}
      title="Audit Form View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Form View" />
        <CardContent>
        <Grid container spacing={3}  >
            <Grid item xs={12} sm={6} >
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > Transaction Reference </TableCell>
                      <TableCell>{auditFormState.auditFormRecord.reference}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Category </TableCell>
                      <TableCell>{getAuditFormCategoryName(auditFormState.auditFormRecord)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Audit Form </TableCell>
                      <TableCell>{getAuditFormSetupName(auditFormState.auditFormRecord)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Employee </TableCell>
                      <TableCell>{getEmployeeName(auditFormState.auditFormRecord)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Client </TableCell>
                      <TableCell>{getClientName(auditFormState.auditFormRecord)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Date Processed </TableCell>
                      <TableCell>{auditFormState.auditFormRecord.date_processed}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Obtained Score (%) </TableCell>
                      <TableCell>{auditFormState.auditFormRecord.obtained_score + '/100'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Audit Status </TableCell>
                      <TableCell>{auditFormState.auditFormRecord.audit_result}</TableCell>
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
                        !isEmpty(auditFormState.auditFormRecord.created_by_user) ?
                          auditFormState.auditFormRecord.created_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Created At </TableCell>
                      <TableCell>{auditFormState.auditFormRecord.date_created}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated By </TableCell>
                      <TableCell>{
                        !isEmpty(auditFormState.auditFormRecord.updated_by_user) ?
                          auditFormState.auditFormRecord.updated_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated At </TableCell>
                      <TableCell>{auditFormState.auditFormRecord.date_last_modified}</TableCell>
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
        <CardHeader title="Audit Form Checkpoints" />
        <CardContent>
          {!isEmpty(auditFormState.auditFormRecord.cheackpoints)?
            <>
              {Object.values(auditFormState.auditFormRecord.cheackpoints).map((chkpoint, index) => (
                <>
                  <Typography variant="h6" component="h6" style={{display: 'flex'}} >
                    {(chkpoint.is_checked == 0)?
                    <CheckBoxOutlineBlankIcon 
                      style={{height: '20px', width: '20px', color: 'green'}}
                    />
                    :
                    <CheckBoxOutlinedIcon 
                      style={{height: '20px', width: '20px', color: 'green'}}
                    />
                    }
                    {chkpoint.title}
                  </Typography>
                  <Box>
                    <div
                      className="ck-content" dangerouslySetInnerHTML={{ __html: chkpoint.description }}
                    />
                  </Box> 
                  <Box mt={2}>
                    <Grid container>
                      <Grid item xs={12}>
                        {!isEmpty(chkpoint.details)?
                          <>
                          {Object.values(chkpoint.details).map((c_detail) => (
                            <>
                              {(c_detail.detail_type === 'infraction')?
                                <InfractionDetails
                                  infractionRecord={c_detail}
                                  setOpenImageViewModel={setOpenImageViewModel}
                                  setImageRecord={setImageRecord}
                                  key={c_detail.id}
                                />
                                : (c_detail.detail_type === 'notes')?
                                <NoteDetails
                                  noteRecord={c_detail}
                                  setOpenImageViewModel={setOpenImageViewModel}
                                  setImageRecord={setImageRecord}
                                  key={c_detail.id}
                                />
                                :
                                <CoachingDetails
                                  coachingRecord={c_detail}
                                  setOpenImageViewModel={setOpenImageViewModel}
                                  setImageRecord={setImageRecord}
                                  key={c_detail.id}
                                />
                              }
                            </>											
                          ))}
                          </>
                        :''
                        }
                      </Grid>
                    </Grid>
                  </Box> 
                </>  
              ))} 
            </>
          : ''}
          <ImagePreviewModel
            modalOpen={openImageViewModel}
            handleModalOpen={setOpenImageViewModel}
            imageRecord={imageRecord}
            setImageRecord={setImageRecord}
          />
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Form Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: auditFormState.auditFormRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default AuditFormView;