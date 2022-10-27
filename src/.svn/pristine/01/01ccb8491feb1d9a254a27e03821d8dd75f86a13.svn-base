import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToHolidayCategoryList,
  deleteHolidayCategory,
  getHolidayCategoryById
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
  const holidayCategoryState = useSelector(state => state.holidayCategoryState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (holidayCategoryState.showUpdateForm) {
      router.history.push('/holiday-category/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holidayCategoryState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteHolidayCategory(holidayCategoryState.holidayCategoryRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getHolidayCategoryById(holidayCategoryState.holidayCategoryRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToHolidayCategoryList())
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
            Holiday Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Holiday Category
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            updateRecord={updateRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
            currentRecord={holidayCategoryState.holidayCategoryRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Holiday Category Delete"
        alertText="Are you sure, You want delete this Holiday Category?"
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
