import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab } from 'components';
import { Header, Results } from './components';
import {
  deleteActivityCategoryStatus,
  getActivityCategoryStatusById,
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

const ActivityCategoryStatusList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [activityCategoryStatusId, setActivityCategoryStatusId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const activityCategoryStatusState = useSelector(state => state.activityCategoryStatusState);
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
    if (activityCategoryStatusState.showUpdateForm) {
      router.history.push('/activity-category-status/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityCategoryStatusState.showUpdateForm]);

  useEffect(() => {
    if (activityCategoryStatusState.showViewPage) {
      router.history.push('/activity-category-status/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityCategoryStatusState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteActivityCategoryStatus(activityCategoryStatusId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setActivityCategoryStatusId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setActivityCategoryStatusId('')
  }

  const updateRecord = (id) => {
    dispatch(getActivityCategoryStatusById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getActivityCategoryStatusById(id, 'view'))
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
      title="Activity Category Status List"
    >
      <Header />
      <Results
        className={classes.results}
        actionsCol={getActions}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
      />
      <DeleteAlert
        title="Activity Category Status Delete"
        alertText="Are you sure, You want delete this Activity Category Status?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default ActivityCategoryStatusList;
