import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  deleteTimeZones,
  redirectToTimeZonesList,
  getTimeZonesById
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
  const timeZonesState = useSelector(state => state.timeZonesState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (timeZonesState.showViewPage) {
      router.history.push('/timeZones/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZonesState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteTimeZones(timeZonesState.timeZonesRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getTimeZonesById(timeZonesState.timeZonesRecord.id, 'view'))
  }
  
  const closeView = () => {
    dispatch(redirectToTimeZonesList())
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
            TimeZones Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            TimeZones
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete', 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={timeZonesState.timeZonesRecord}
          />
        </Grid>
      </Grid>
      <DeleteAlert
        title="TimeZones Delete"
        alertText="Are you sure, You want delete this TimeZones?"
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
