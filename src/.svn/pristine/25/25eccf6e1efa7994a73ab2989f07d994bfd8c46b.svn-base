import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToWorkstationsList,
  deleteWorkstations,
  getWorkstationsById
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
  const workstationsState = useSelector(state => state.workstationsState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (workstationsState.showViewPage) {
      router.history.push('/workstations/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workstationsState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteWorkstations(workstationsState.workstationsRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getWorkstationsById(workstationsState.workstationsRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToWorkstationsList())
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
            Setup
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Workstations
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete', 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={workstationsState.workstationsRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Workstations Delete"
        alertText="Are you sure, You want delete this Workstations?"
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
