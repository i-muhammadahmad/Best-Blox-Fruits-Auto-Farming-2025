import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  deleteBreakTypes,
  getBreakTypesById,
  redirectToBreakTypesList
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
  const breakTypesState = useSelector(state => state.breakTypesState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (breakTypesState.showUpdateForm) {
      router.history.push('/break-types/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakTypesState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteBreakTypes(breakTypesState.breakTypesRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getBreakTypesById(breakTypesState.breakTypesRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToBreakTypesList())
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
            Employee Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Break Types
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
        title="Break Type Delete"
        alertText="Are you sure, You want delete this Break Type?"
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
