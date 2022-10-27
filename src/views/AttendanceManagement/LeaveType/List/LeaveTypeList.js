import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab } from 'components';
import { Header, Results } from './components';
import {
  deleteLeaveType,
  getLeaveTypeById,
} from 'actions';
import { forEach } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useRouter from 'utils/useRouter';
import VisibilityIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
}));

const LeaveTypeList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [leaveTypeId, setLeaveTypeId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const leaveTypeState = useSelector(state => state.leaveTypeState);
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
    if (leaveTypeState.showUpdateForm) {
      router.history.push('/leave-type/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveTypeState.showUpdateForm]);

  useEffect(() => {
    if (leaveTypeState.showViewPage) {
      router.history.push('/leave-type/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveTypeState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteLeaveType(leaveTypeId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setLeaveTypeId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setLeaveTypeId('')
  }

  const updateRecord = (id) => {
    dispatch(getLeaveTypeById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getLeaveTypeById(id, 'view'))
  }

  const getActions = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(session.current_page_permissions.rights_edit == '1') ?
          <><StyledFab
            color="bprimary"
            aria-label="Edit"
            size="small"
            onClick={() => updateRecord(value.id)}
          >
            <EditIcon />
          </StyledFab>&nbsp;</>
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
        {(session.current_page_permissions.rights_delete == '1') ?
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

  return (
    <Page
      className={classes.root}
      title="Leave Type List"
    >
      <Header />
      <Results
        className={classes.results}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
      />
      <DeleteAlert
        title="Leave Type Delete"
        alertText="Are you sure, You want delete this Leave Type?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default LeaveTypeList;
