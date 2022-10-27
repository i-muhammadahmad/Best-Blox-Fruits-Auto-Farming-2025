import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToSetupFloorPlanList,
  deleteSetupFloorPlan,
  getSetupFloorPlanById
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
  const setupFloorPlanState = useSelector(state => state.setupFloorPlanState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (setupFloorPlanState.showUpdateForm) {
      router.history.push('/setup-floor-plan/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupFloorPlanState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteSetupFloorPlan(setupFloorPlanState.setupFloorPlansRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getSetupFloorPlanById(setupFloorPlanState.setupFloorPlansRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToSetupFloorPlanList())
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
            Asset Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Setup Floor Plan
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            closeView={closeView}
            updateRecord={updateRecord}
            deleteRecord={showDeleteModal}
            currentRecord={setupFloorPlanState.setupFloorPlansRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Floor Plan Delete"
        alertText="Are you sure, You want delete this Floor Plan?"
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
