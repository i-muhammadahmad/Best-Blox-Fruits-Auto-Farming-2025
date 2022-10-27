import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip } from 'components';
import { Header, Results } from './components';
import {
  deleteApprovalProfiles,
  getApprovalProfilesById,
} from 'actions';
import { forEach, isEmpty } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useRouter from 'utils/useRouter';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessRights from 'utils/AccessRights';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
}));

const ApprovalProfilesList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [approvalProfilesId, setApprovalProfilesId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const approvalProfilesState = useSelector(state => state.approvalProfilesState);
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
    if (approvalProfilesState.showUpdateForm) {
      router.history.push('/approval-profile/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalProfilesState.showUpdateForm]);

  useEffect(() => {
    if (approvalProfilesState.showViewPage) {
      router.history.push('/approval-profile/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalProfilesState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteApprovalProfiles(approvalProfilesId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setApprovalProfilesId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setApprovalProfilesId('')
  }

  const updateRecord = (id) => {
    dispatch(getApprovalProfilesById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getApprovalProfilesById(id, 'view'))
  }

  const getDepHeadName = value => {
    let emp_name = ''
    if (!isEmpty(value.deparment_head)) {
      emp_name = value.deparment_head.firstname + ' ' + value.deparment_head.lastname;
    }
    return emp_name;
  }

  const getActions = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(AccessRights(session.current_page_permissions, 'edit', value.created_by) && value.is_deleted == 'n') ?
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
        {(AccessRights(session.current_page_permissions, 'view', value.created_by)) ?
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
        {(AccessRights(session.current_page_permissions, 'delete', value.created_by) && value.is_deleted == 'n') ?
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

  const getDeletedStatus = value => {
    if (value.is_deleted === 'n') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bsuccess" label="Active" />
        </div>
      )
    }
    else {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bdanger" label="Deleted" />
        </div>
      )
    }
  }

  return (
    <Page
      className={classes.root}
      title="Approval Profiles List"
    >
      <Header />
      <Results
        className={classes.results}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        getDeletedStatus={getDeletedStatus}
      />
      <DeleteAlert
        title="Approval Profile Delete"
        alertText="Are you sure, You want delete this Approval Profile?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default ApprovalProfilesList;
