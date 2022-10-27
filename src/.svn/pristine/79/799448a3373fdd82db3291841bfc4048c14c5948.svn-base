import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip, StyledButton } from 'components';
import { Header, Results } from './components';
import {
  deleteLeaveSchedule,
  getLeaveScheduleById,
  submitLeave
} from 'actions';
import { forEach } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useRouter from 'utils/useRouter';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
}));

const LeaveScheduleList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [leaveScheduleId, setLeaveScheduleId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const [openLeaveSubmitModel, setOpenLeaveSubmitModel] = React.useState(false);
  const leaveScheduleState = useSelector(state => state.leaveScheduleState);
  const session = useSelector(state => state.session);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (leaveScheduleState.showUpdateForm) {
      router.history.push('/leave-schedule/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveScheduleState.showUpdateForm]);

  useEffect(() => {
    if (leaveScheduleState.showViewPage) {
      router.history.push('/leave-schedule/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveScheduleState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteLeaveSchedule(leaveScheduleId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setLeaveScheduleId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setLeaveScheduleId('')
  }

  const submitLeaveRecord = async () => {
    await dispatch(submitLeave(leaveScheduleId, session.current_page_permissions.object_id));
    hideLeaveSubmitModel();
    setRefershDataTable(true);
  }

  const showLeaveSubmitModal = (id) => {
    setLeaveScheduleId(id);
    setOpenLeaveSubmitModel(true);
  }

  const hideLeaveSubmitModel = () => {
    setOpenLeaveSubmitModel(false);
    setLeaveScheduleId('');
  }

  const updateRecord = (id) => {
    dispatch(getLeaveScheduleById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getLeaveScheduleById(id, 'view'))
  }

  const getActions = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(session.current_page_permissions.rights_edit == '1' && value.leave_status === 'draft') ?
          <>
            <StyledButton
              color="bprimary"
              size="small"
              type="submit"
              variant="contained"
              onClick={() => showLeaveSubmitModal(value.id)}
            >
              Submit
            </StyledButton>&nbsp;&nbsp;&nbsp;
            <StyledFab
              color="bprimary"
              aria-label="Edit"
              size="small"
              onClick={() => updateRecord(value.id)}
            >
              <EditIcon />
            </StyledFab>&nbsp;
          </>
          : ''
        }
        {(session.current_page_permissions.rights_view == '1') ?
          <><StyledFab
            color="bwarning"
            aria-label="View"
            size="small"
            onClick={() => viewRecord(value.id)}
          >
            <VisibilityIcon />
          </StyledFab>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
          : ''
        }
        {(session.current_page_permissions.rights_delete == '1' && value.leave_status === 'draft') ?
          <StyledFab
            color="bdanger"
            aria-label="edit"
            size="small"
            onClick={() => showDeleteModal(value.id)}
          >
            <DeleteIcon size="small" />
          </StyledFab>
          : ''
        }
      </div>
    )
  }

  const getLeaveStatus = value => {
    if (value.leave_status === 'approved') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bsuccess" label="Approved" />
        </div>
      )
    }
    else if (value.leave_status === 'rejected') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bdanger" label="Rejected" />
        </div>
      )
    }
    else if (value.leave_status === 'draft') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bdefault" label="Draft" />
        </div>
      )
    }
    else if (value.leave_status === 'submitted') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bprimary" label="Submitted" />
        </div>
      )
    }
  }

  return (
    <Page
      className={classes.root}
      title="Schedule Leaves List"
    >
      <Header />
      <Results
        className={classes.results}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
        leaveStatusCol={getLeaveStatus}
      />
      <DeleteAlert
        title="Leave Delete"
        alertText="Are you sure, You want delete this Leave?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
      <div>
        <Dialog
          open={openLeaveSubmitModel}
          onClose={hideLeaveSubmitModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Submit Leave'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {'Are you sure you want to submit this leave for approval?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={hideLeaveSubmitModel}   >
              Cancel
            </StyledButton>
            <StyledButton 
              variant="contained"
              color="bprimary"
              onClick={submitLeaveRecord}  
              autoFocus={true}
            >
              Submit
            </StyledButton>
          </DialogActions>
        </Dialog>
      </div>
    </Page>
  );
};

export default LeaveScheduleList;
