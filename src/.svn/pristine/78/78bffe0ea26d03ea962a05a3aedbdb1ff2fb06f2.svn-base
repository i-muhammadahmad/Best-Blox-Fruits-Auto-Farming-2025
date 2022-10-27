import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToEmployeeAttritionReasonList,
  deleteEmployeeAttritionReason,
  getEmployeeAttritionReasonById
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
  const employeeAttritionReasonState = useSelector(state => state.employeeAttritionReasonState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (employeeAttritionReasonState.showViewPage) {
      router.history.push('/attrition-reasons/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionReasonState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteEmployeeAttritionReason(employeeAttritionReasonState.employeeAttritionReasonRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getEmployeeAttritionReasonById(employeeAttritionReasonState.employeeAttritionReasonRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToEmployeeAttritionReasonList())
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
            HR Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Employee Attrition Reason
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete', 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={employeeAttritionReasonState.employeeAttritionReasonRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Employee Attrition Reason Delete"
        alertText="Are you sure, You want delete this Employee Attrition Reason?"
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
