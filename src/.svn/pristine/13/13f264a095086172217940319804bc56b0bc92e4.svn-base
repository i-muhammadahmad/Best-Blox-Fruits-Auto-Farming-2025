import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab } from 'components';
import { Header, Results } from './components';
import {
  deleteActivityCategory,
  getActivityCategoryById,
} from 'actions';
import { forEach } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useRouter from 'utils/useRouter';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
}));

const ActivityCategoryList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [activityCategoryId, setActivityCategoryId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const activityCategoryState = useSelector(state => state.activityCategoryState);
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
    if (activityCategoryState.showUpdateForm) {
      router.history.push('/activity-category/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityCategoryState.showUpdateForm]);

  useEffect(() => {
    if (activityCategoryState.showViewPage) {
      router.history.push('/activity-category/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityCategoryState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteActivityCategory(activityCategoryId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setActivityCategoryId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setActivityCategoryId('')
  }

  const updateRecord = (id) => {
    dispatch(getActivityCategoryById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getActivityCategoryById(id, 'view'))
  }

  const getActions = (value) => {
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
      title="Activity Category List"
    >
      <Header />
      <Results
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
      />
      <DeleteAlert
        title="Activity Category Delete"
        alertText="Are you sure, You want delete this Activity Category?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default ActivityCategoryList;
