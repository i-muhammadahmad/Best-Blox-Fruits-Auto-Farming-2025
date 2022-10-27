import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToShiftBreaksList,
  deleteShiftBreaks,
  getShiftBreaksById,
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
  const shiftBreaksState = useSelector(state => state.shiftBreaksState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (shiftBreaksState.showUpdateForm) {
      router.history.push('/shift-breaks/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftBreaksState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteShiftBreaks(shiftBreaksState.shiftBreaksRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getShiftBreaksById(shiftBreaksState.shiftBreaksRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToShiftBreaksList())
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
            Employee Managment
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Shift Breaks
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
        title="Shift Breaks Delete"
        alertText="Are you sure, You want delete this Shift Breaks?"
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
