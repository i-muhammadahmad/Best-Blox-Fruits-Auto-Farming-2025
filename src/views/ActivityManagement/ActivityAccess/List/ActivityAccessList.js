import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip } from 'components';
import { Header, Results } from './components';
import { 
  deleteActivityAccess,
  getActivityAccessById,
} from 'actions';
import { forEach } from 'lodash';
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
  }
}));

const ActivityAccessList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [activityAccessId, setActivityAccessId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const activityAccessState = useSelector(state => state.activityAccessState);
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

  useEffect(()=> {
    if(activityAccessState.showUpdateForm){
      router.history.push('/activity-access/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activityAccessState.showUpdateForm]);

  useEffect(()=> {
    if(activityAccessState.showViewPage){
      router.history.push('/activity-access/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activityAccessState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteActivityAccess(activityAccessId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setActivityAccessId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setActivityAccessId('')
  }

  const updateRecord = (id) => {
    dispatch(getActivityAccessById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getActivityAccessById(id, 'view'))
  }

  const getActions = value => {
    return(
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
          :''
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
          :''
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
      title="Activity Access List"
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
        title="Activity Access Delete" 
        alertText="Are you sure, You want delete this Activity Access?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel} 
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}  
      />
    </Page>
  );
};

export default ActivityAccessList;
