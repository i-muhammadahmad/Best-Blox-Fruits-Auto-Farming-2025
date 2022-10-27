import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToEmployeesList,
  deleteEmployees,
  getEmployeesById
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
  const employeesState = useSelector(state => state.employeesState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 
  const [btnToShow, setBtnToShow] = useState([]);

  useEffect(() => {
    if (!isEmpty(employeesState.employeesRecord) && employeesState.employeesRecord.is_active == 'y') {
      setBtnToShow(['delete', 'view']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesState.employeesRecord]);

  useEffect(() => {
    if (employeesState.redirect_to_list) { 
      router.history.push('/employees');
    }
  }, [employeesState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!employeesState.showViewPage && !employeesState.showUpdateForm) { 
      router.history.push('/employees');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesState.showViewPage, employeesState.showUpdateForm]);

  useEffect(() => {
    if (employeesState.showViewPage) { 
      router.history.push('/employees/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteEmployees(employeesState.employeesRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getEmployeesById(employeesState.employeesRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToEmployeesList())
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
            Employees Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Employees
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={btnToShow}  
            deleteRecord={showDeleteModal}
            viewRecord={viewRecord}
          />
        </Grid>
      </Grid>
      <DeleteAlert
        title="Employees Delete"
        alertText="Are you sure, You want delete this Employees?"
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
