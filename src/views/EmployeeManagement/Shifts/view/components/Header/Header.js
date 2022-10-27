import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  deleteShifts,
  getShiftsById,
  redirectToShiftsList 
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
  const shiftsState = useSelector(state => state.shiftsState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (shiftsState.showUpdateForm) {
      router.history.push('/shifts/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftsState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteShifts(shiftsState.shiftsRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getShiftsById(shiftsState.shiftsRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToShiftsList())
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
            Shifts Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Shifts
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            updateRecord={updateRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
          />
        </Grid>
      </Grid>
      <DeleteAlert
        title="Shifts Delete"
        alertText="Are you sure, You want delete this Shifts?"
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
