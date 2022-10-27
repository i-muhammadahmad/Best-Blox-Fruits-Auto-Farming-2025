import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToActivityCategoryList,
  deleteActivityCategory,
  getActivityCategoryById
} from 'actions';
import { ViewActionButtons, DeleteAlert } from 'components';
import useRouter from 'utils/useRouter';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const activityCategoryState = useSelector(state => state.activityCategoryState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (activityCategoryState.showUpdateForm) {
      router.history.push('/activity-category/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityCategoryState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteActivityCategory(activityCategoryState.activityCategoryRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getActivityCategoryById(activityCategoryState.activityCategoryRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToActivityCategoryList())
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Activity Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Activity Category
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            closeView={closeView}
            updateRecord={updateRecord}
            deleteRecord={showDeleteModal}
            currentRecord={activityCategoryState.activityCategoryRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Activity Category Delete"
        alertText="Are you sure, You want delete this Activity Category?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
