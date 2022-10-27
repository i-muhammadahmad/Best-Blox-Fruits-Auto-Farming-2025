import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip } from 'components';
import { Header, Results } from './components';
import {
  deleteAssets,
  getAssetsById,
} from 'actions';
import { forEach, isEmpty, join } from 'lodash';
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

const AssetsList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [assets, setAssets] = useState([]);
  const [assetsId, setAssetsId] = useState('');
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const assetsState = useSelector(state => state.assetsState);
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


  const getAllocatedToHTML = (value) => {
    let alloc_to_arr = [];
    if (!isEmpty(value.employee)) {
      let emp_name = value.employee.firstname + " " + value.employee.middlename + " " + value.employee.lastname
      alloc_to_arr.push(emp_name);
    }
    if (!isEmpty(value.office)) {
      alloc_to_arr.push(value.office.name);
    }
    if (!isEmpty(value.workstation)) {
      alloc_to_arr.push(value.workstation.name);
    }
    return (
      <span>
        {join(alloc_to_arr, [', '])}
      </span>
    );
  }

  useEffect(() => {
    if (assetsState.showUpdateForm) {
      router.history.push('/assets/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsState.showUpdateForm]);

  useEffect(() => {
    if (assetsState.showViewPage) {
      router.history.push('/assets/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteAssets(assetsId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setAssetsId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setAssetsId('')
  }

  const updateRecord = (id) => {
    dispatch(getAssetsById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getAssetsById(id, 'view'))
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
      title="Assets List"
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
        title="Assets Delete"
        alertText="Are you sure, You want delete this Assets?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default AssetsList;
