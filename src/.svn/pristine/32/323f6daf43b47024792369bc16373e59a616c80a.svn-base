import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToObjectsList,
  deleteObjects,
  getObjectsById
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

  const objectsState = useSelector(state => state.objectsState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (objectsState.showUpdateForm) {
      router.history.push('/objects/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteObjects(objectsState.objectsRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getObjectsById(objectsState.objectsRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToObjectsList())
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
            Users Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Objects
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            updateRecord={updateRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
            currentRecord={objectsState.objectsRecord}
          />
        </Grid>
      </Grid>
      <DeleteAlert
        title="Objects Delete"
        alertText="Are you sure, You want delete this Objects?"
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
