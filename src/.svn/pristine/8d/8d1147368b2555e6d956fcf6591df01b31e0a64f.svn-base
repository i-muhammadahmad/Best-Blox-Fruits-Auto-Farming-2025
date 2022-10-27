import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip } from 'components';
import { Header, Results } from './components';
import {
  Avatar
} from '@material-ui/core'
import {
  deleteSetupFloorPlan,
  getSetupFloorPlanById,
} from 'actions';
import { forEach } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useRouter from 'utils/useRouter';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { API_URL } from 'configs';
import AccessRights from 'utils/AccessRights';

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
  floor_plan_iamge:{
    width: '250px',
    height: '200px',
    marginLeft: '-20px',
  }
}));

const SetupFloorPlanList = () => {
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
  const [setupFloorPlanId, setSetupFloorPlanId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const setupFloorPlanState = useSelector(state => state.setupFloorPlanState);
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
    if (setupFloorPlanState.showUpdateForm) {
      router.history.push('/setup-floor-plan/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupFloorPlanState.showUpdateForm]);

  useEffect(() => {
    if (setupFloorPlanState.showViewPage) {
      router.history.push('/setup-floor-plan/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupFloorPlanState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteSetupFloorPlan(setupFloorPlanId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setSetupFloorPlanId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setSetupFloorPlanId('')
  }

  const updateRecord = (id) => {
    dispatch(getSetupFloorPlanById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getSetupFloorPlanById(id, 'view'))
  }

  const getFlagAvator = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(value.image_icon) ?
          <img alt="floor_plan" src={API_URL + value.image_icon} className={classes.floor_plan_iamge} />
          :
          ''
        }
      </div>
    );
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
      title="Setup Floor Plan List"
    >
      <Header />
      <Results
        className={classes.results}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        getFlagAvator={getFlagAvator}
        actionsCol={getActions}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        getDeletedStatus={getDeletedStatus}
      />
      <DeleteAlert
        title="Floor Plan Delete"
        alertText="Are you sure, You want delete this Floor Plan?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default SetupFloorPlanList;
