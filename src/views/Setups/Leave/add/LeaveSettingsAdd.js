import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledFab } from 'components';
import {
  Header,
  LeaveCreditsModel
} from './components';
import {
  getLeaveConfigsList,
  getLeaveConfigByOfficeId
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { isEmpty, forEach, capitalize, random } from 'lodash';
import useRouter from 'utils/useRouter';
import EditIcon from '@material-ui/icons/Edit';
import { CK_CONFIGS } from 'configs';

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
  content: {
    padding: 0
  },
  table: {
    minWidth: 700,
		borderCollapse: 'collapse'
  },
  tableCol: {
    border: '1px solid #eeeeee',
    borderCollapse: 'collapse',
    lineHeight: '1',
    textAlign: 'center',
    padding: '5px'
  },
  textCol:{
    fontSize: '10px',
  },
  tableContainer:{
    maxHeight: 440,
  },
  stickyCol: {
    position: '-webkit-sticky',
    position: 'sticky',
    left: '0'
  },
  leaveType1:{
    backgroundColor: '#98FB98',
    fontSize: '13px',
    border: '1px solid #98FB98',
    borderCollapse: 'collapse',
    lineHeight: '1',
    textAlign: 'center',
    padding: '5px'
  },
  leaveType2:{
    backgroundColor: '#7FFFFF',
    fontSize: '13px',
    border: '1px solid #7FFFFF',
    borderCollapse: 'collapse',
    lineHeight: '1',
    textAlign: 'center',
    padding: '5px'
  },
  leaveType3:{
    backgroundColor: '#ADD8E6',
    fontSize: '13px',
    border: '1px solid #ADD8E6',
    borderCollapse: 'collapse',
    lineHeight: '1',
    textAlign: 'center',
    padding: '5px'
  },
  leaveType4:{
    backgroundColor: 'aliceblue',
    fontSize: '13px',
    border: '1px solid aliceblue',
    borderCollapse: 'collapse',
    lineHeight: '1',
    textAlign: 'center',
    padding: '5px'
  },
  leaveType5:{
    backgroundColor: '#B3CCF5',
    fontSize: '13px',
    border: '1px solid #B3CCF5',
    borderCollapse: 'collapse',
    lineHeight: '1',
    textAlign: 'center',
    padding: '5px'
  }
}));

const LeaveSettingsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const leaveConfigsState = useSelector(state => state.leaveConfigsState);
  const session = useSelector(state => state.session);

  const [openLeaveCreditModel, setOpenLeaveCreditModel] = React.useState(false);
  const [leaveTypeFormstate, setLeaveTypeFormstate] = React.useState({});
  const [selectedOfficeId, setSelectedOfficeId] = React.useState('');
  const [officeApprovalLevels, setOfficeApprovalLevels] = React.useState(1);

  useEffect(() => {
    dispatch(getLeaveConfigsList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(leaveConfigsState.leaveConfigByOfficeList)) {
      //setting approval levels
      setOfficeApprovalLevels(leaveConfigsState.leaveConfigByOfficeList[0].apporavl_levels);

      let leave_form_state = { ...leaveTypeFormstate };
      forEach(leaveConfigsState.leaveConfigByOfficeList, function (val, key) {

        leave_form_state[val.leave_type_id] = {
          'accrual_frequency': val.accrual_frequency,
          'leave_credits': val.leave_credits,
          'leave_type_id': val.leave_type_id,
          'name': val.name
        }
      });
      setLeaveTypeFormstate(leave_form_state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveConfigsState.leaveConfigByOfficeList]);

  const setLeaveConfigOfficeState = (office_id) => {
    if (!isEmpty(leaveConfigsState.leaveConfigList[office_id]['leave_types'])) {

      let leave_form_state = {...leaveTypeFormstate};
      let approval_level = 1;
      forEach(leaveConfigsState.leaveConfigList[office_id]['leave_types'], function (val, key) {
        approval_level = val.apporavl_levels;
        leave_form_state[val.leave_type_id] = {
          'accrual_frequency': val.accrual_frequency,
          'leave_credits': val.leave_credits,
          'leave_type_id': val.leave_type_id,
          'name': val.name
        }
      });
      //setting approval levels
      setOfficeApprovalLevels(approval_level);
      setLeaveTypeFormstate(leave_form_state);
    }
  }

  const leaveConfigByOfficeEdit = async (office_id) => {
    await setLeaveConfigOfficeState(office_id);
    await dispatch(getLeaveConfigByOfficeId(office_id));
    setSelectedOfficeId(office_id);
    setOpenLeaveCreditModel(true);
  }

  const getLeaveTypeCredit = (leave_types_summary, lt_key, lts_i) => {
    if (!isEmpty(leave_types_summary[lt_key])) {
      let lts = leave_types_summary[lt_key];
      return (
        <>
          <TableCell className={classes.tableCol} style={{color: 'black'}} key={'tbrc_2_' + lts_i} > <p className={classes.textCol}>{!isEmpty(lts) ? capitalize(lts.accrual_frequency) : ''} </p></TableCell>
          <TableCell className={classes.tableCol} style={{color: 'black'}} key={'tbrc_3_' + lts_i} > <p className={classes.textCol}>{!isEmpty(lts) ? lts.leave_credits : ''} </p></TableCell>
        </>
      );
    }
    else {
      return (
        <>
          <TableCell className={classes.tableCol} style={{color: 'lightgray'}} key={'tbrc_2_' + lts_i} > <p className={classes.textCol}>{'N/A'} </p></TableCell>
          <TableCell className={classes.tableCol} style={{color: 'lightgray'}} key={'tbrc_3_' + lts_i} > <p className={classes.textCol}>{'N/A'} </p></TableCell>
        </>
      );
    }
  }

  const getLeaveTypeWiseSummary = (row_data, index) => {
    let leave_types_summary = Object.values(row_data.leave_types);
    return (
      <>
        <TableCell className={classes.stickyCol} style={{ whiteSpace: 'nowrap' }} key={'tbrc_' + index}  >{row_data.office_name}</TableCell>
        <TableCell className={classes.tableCol} key={'tbrc_1_' + index}  ><p className={classes.textCol}>{!isEmpty(leave_types_summary[0]) ? leave_types_summary[0]['apporavl_levels'] : '1'}</p></TableCell>
        {Object.values(leaveConfigsState.leaveTypeList).map((val, lts_i) => (
          <React.Fragment key={'tbrcp_' + lts_i}>
            {getLeaveTypeCredit(row_data.leave_types, val.lt_key, lts_i)}
          </React.Fragment>
        ))}
        <TableCell  >
          {(session.current_page_permissions.rights_edit == '1' || session.current_page_permissions.rights_add == '1') ?
            <StyledFab
              color="bprimary"
              aria-label="Edit"
              size="small"
              onClick={() => { leaveConfigByOfficeEdit(row_data.office_id); }}
            >
              <EditIcon />
            </StyledFab>
            :
            <>
            {!isEmpty(row_data.leave_types)?
              <StyledFab
                color="bprimary"
                aria-label="Edit"
                size="small"
                onClick={() => { leaveConfigByOfficeEdit(row_data.office_id); }}
              >
                <EditIcon />
              </StyledFab>
              : ''
            } 
            </> 
          }
        </TableCell>
      </>
    );
  }

  return (
    <Page
      className={classes.root}
      title="Add Leave Config"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Leaves Config" />
        <CardContent>
          <div className={classes.formGroup}>
            {!isEmpty(leaveConfigsState.leaveConfigList) ?
              <TableContainer className={classes.tableContainer} component={Paper}>
                <Table size={"small"} stickyHeader className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow key={'h_1'} >
                      <TableCell className={classes.stickyCol} > &nbsp; </TableCell>
                      <TableCell > &nbsp; </TableCell>
                      {Object.values(leaveConfigsState.leaveTypeList).map((val, i) => (
                        <TableCell className={classes['leaveType'+(random(1, 5))]} key={'p_' + i} colSpan={2} >
                          {val.name}
                        </TableCell>
                      ))}
                      <TableCell > &nbsp; </TableCell>
                    </TableRow>
                    <TableRow key={'h_1'} >
                      <TableCell className={classes.stickyCol} >Office</TableCell>
                      <TableCell className={classes.tableCol} > <p className={classes.textCol}>Approval Levels </p> </TableCell>
                      {Object.values(leaveConfigsState.leaveTypeList).map((val, i) => (
                        <React.Fragment key={'s_' + i}>
                          <TableCell className={classes.tableCol} >
                            <p className={classes.textCol}>Freq.</p>
                          </TableCell>
                          <TableCell className={classes.tableCol} >
                            <p className={classes.textCol}>Cr.</p>
                          </TableCell>
                        </React.Fragment>
                      ))}
                      <TableCell className={classes.tableCol} > &nbsp; </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!isEmpty(leaveConfigsState.leaveConfigList) ?
                      <>
                        {Object.values(leaveConfigsState.leaveConfigList).map((row, index) => (
                          <TableRow key={'tbr_' + index}>
                            {getLeaveTypeWiseSummary(row, index)}
                          </TableRow>
                        ))}
                      </>
                      : ''
                    }
                  </TableBody>
                </Table>
              </TableContainer>  
              : ''
            }
          </div>
          {!isEmpty(selectedOfficeId) ?
            <LeaveCreditsModel
              modalOpen={openLeaveCreditModel}
              handleModalOpen={setOpenLeaveCreditModel}
              leaveTypeFormstate={leaveTypeFormstate}
              selectedOfficeId={selectedOfficeId}
              setSelectedOfficeId={setSelectedOfficeId}
              officeApprovalLevels={officeApprovalLevels}
            />
            : ''
          }
        </CardContent>
      </Card>

    </Page>
  );
};

export default LeaveSettingsAdd;
