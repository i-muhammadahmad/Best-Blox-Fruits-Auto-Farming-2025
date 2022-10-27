import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip } from 'components';
import { Header, Results } from './components';
import {
  deleteBreakTypes,
  getBreakTypesById,
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
  },
}));

const BreakTypesList = () => {
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
  const [breakTypesId, setBreakTypesId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const breakTypesState = useSelector(state => state.breakTypesState);
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
    if (breakTypesState.showUpdateForm) {
      router.history.push('/break-types/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakTypesState.showUpdateForm]);

  useEffect(() => {
    if (breakTypesState.showViewPage) {
      router.history.push('/break-types/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakTypesState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteBreakTypes(breakTypesId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setBreakTypesId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setBreakTypesId('')
  }

  const updateRecord = (id) => {
    dispatch(getBreakTypesById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getBreakTypesById(id, 'view'))
  }

  const getActions = (value) => {
    return (
      <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
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
      title="Break Types List"
    >
      <Header />
      <Results
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        getDeletedStatus={getDeletedStatus}
      />
      <DeleteAlert
        title="Break Type Delete"
        alertText="Are you sure, You want delete this Break Type?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default BreakTypesList;
