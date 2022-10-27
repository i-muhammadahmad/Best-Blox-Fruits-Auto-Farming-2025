import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip } from 'components';
import { Header, Results } from './components';
import {
  Avatar
} from '@material-ui/core'
import {
  deleteEmployees,
  getEmployeesById,
} from 'actions';
import { forEach, isEmpty } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useRouter from 'utils/useRouter';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessRights from 'utils/AccessRights';
import { API_URL } from 'configs'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const EmployeesList = () => {
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
  const [employeesId, setEmployeesId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const employeesState = useSelector(state => state.employeesState);
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
    if (employeesState.showUpdateForm) {
      router.history.push('/employees/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesState.showUpdateForm]);

  useEffect(() => {
    if (employeesState.showViewPage) {
      router.history.push('/employees/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesState.showViewPage]);


  const getProfilePicAvator = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(value.profile_pic) ?
          <Avatar alt="Avator" src={API_URL + value.profile_pic} className={classes.large} />
          :
          ''
        }
      </div>
    );
  }

  const deleteRecord = async () => {
    await dispatch(deleteEmployees(employeesId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setEmployeesId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setEmployeesId('')
  }

  const updateRecord = (id) => {
    dispatch(getEmployeesById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getEmployeesById(id, 'view'))
  }

  const getEmployeeStatus = value => {
    if (value.is_deleted === 'y') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bdanger" label="Deleted" />
        </div>
      )
    }
    else if (value.is_active === 'y') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bsuccess" label="Active" />
        </div>
      )
    }
    else {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bwarning" label="Separated" />
        </div>
      )
    }
  }

  const getActions = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(AccessRights(session.current_page_permissions, 'edit', value.created_by) && value.is_deleted == 'n' && value.is_active === 'y') ?
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
        {(AccessRights(session.current_page_permissions, 'delete', value.created_by) && value.is_deleted == 'n' && value.is_active === 'y') ?
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
      title="Employees List"
    >
      <Header />
      <Results
        className={classes.results}
        getProfilePicAvator={getProfilePicAvator}
        getEmployeeStatus={getEmployeeStatus}
        actionsCol={getActions}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
      />
      <DeleteAlert
        title="Employees Delete"
        alertText="Are you sure, You want delete this Employees?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default EmployeesList;
