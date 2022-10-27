import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToApprovalProfilesList,
  deleteApprovalProfiles,
  getApprovalProfilesById
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
  const approvalProfilesState = useSelector(state => state.approvalProfilesState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  useEffect(() => {
    if (approvalProfilesState.showUpdateForm) {
      router.history.push('/approval-profile/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalProfilesState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteApprovalProfiles(approvalProfilesState.approvalProfilesRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getApprovalProfilesById(approvalProfilesState.approvalProfilesRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToApprovalProfilesList())
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
            Administrator
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Approval Profiles
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            updateRecord={updateRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
            currentRecord={approvalProfilesState.approvalProfilesRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Approval Profile Delete"
        alertText="Are you sure, You want delete this Approval Profile?"
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
