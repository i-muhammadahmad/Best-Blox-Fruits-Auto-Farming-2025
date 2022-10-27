import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToUsersList,
  deleteUsers,
  getUsersById
} from 'actions';
import { ViewActionButtons, DeleteAlert } from 'components';
import useRouter from 'utils/useRouter';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const usersState = useSelector(state => state.usersState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [btnToShow, setBtnToShow] = useState(['close']); 

  useEffect(() => {
    if (usersState.showUpdateForm) {
      router.history.push('/users/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersState.showUpdateForm]);

  useEffect(() => {
    if (!isEmpty(usersState.usersRecord) && usersState.usersRecord.is_active == 'y') {
      setBtnToShow(['edit', 'delete', 'close']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersState.usersRecord]);

  const deleteRecord = async () => {
    await dispatch(deleteUsers(usersState.usersRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getUsersById(usersState.usersRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToUsersList())
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
            Users
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={btnToShow}
            updateRecord={updateRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
            currentRecord={usersState.usersRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Users Delete"
        alertText="Are you sure, You want delete this Users?"
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
