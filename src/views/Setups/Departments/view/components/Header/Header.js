import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToDepartmentsList,
  deleteDepartments,
  getDepartmentsById,
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
  const departmentsState = useSelector(state => state.departmentsState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (departmentsState.showUpdateForm) {
      router.history.push('/departments/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentsState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteDepartments(departmentsState.departmentsRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getDepartmentsById(departmentsState.departmentsRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToDepartmentsList())
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
            Departments
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            updateRecord={updateRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
            currentRecord={departmentsState.departmentsRecord}
          />
        </Grid>
      </Grid>  
      <DeleteAlert
        title="Departments Delete"
        alertText="Are you sure, You want delete this Departments?"
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
