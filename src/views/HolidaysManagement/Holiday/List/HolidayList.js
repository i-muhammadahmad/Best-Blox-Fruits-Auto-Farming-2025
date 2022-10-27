import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip } from 'components';
import { Header, Results } from './components';
import {
  deleteHoliday,
  getHolidayById,
  toggleViewHolidayModel
} from 'actions';
import { forEach, isEmpty, split } from 'lodash';
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
  fab: {

  }
}));

const HolidayList = () => {
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
  const [holidayId, setHolidayId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const holidayState = useSelector(state => state.holidayState);
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
    if (holidayState.showUpdateForm) {
      router.history.push('/holiday/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holidayState.showUpdateForm]);

  useEffect(() => {
    if (holidayState.showViewPage) {
      router.history.push('/holiday/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holidayState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteHoliday(holidayId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setHolidayId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setHolidayId('')
  }

  const updateRecord = (id) => {
    dispatch(getHolidayById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getHolidayById(id, 'view'))
  }

  const getHolidayClients = (value) => {
    let camps = split(value.holiday_clients, ',');
    return(
      <>
        {!isEmpty(camps)?
        <>
          {Object.values(camps).map((camp, i) => (
            <div key={i}>
              {camp}
            </div> 
          ))}
        </> 
        :''}
      </> 
    )   
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
      title="Holiday List"
    >
      <Header />
      <Results
        className={classes.results}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
        getHolidayClients={getHolidayClients}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        getDeletedStatus={getDeletedStatus}
      />
      <DeleteAlert
        title="Holiday Delete"
        alertText="Are you sure, You want delete this Holiday?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default HolidayList;
