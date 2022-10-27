import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToAuditErrorCategoryList,
  deleteAuditErrorCategory,
  getAuditErrorCategoryById
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
  const auditErrorCategoryState = useSelector(state => state.auditErrorCategoryState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (auditErrorCategoryState.showUpdateForm) {
      router.history.push('/activity-audit/error-category/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditErrorCategoryState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteAuditErrorCategory(auditErrorCategoryState.auditErrorCategoryRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getAuditErrorCategoryById(auditErrorCategoryState.auditErrorCategoryRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToAuditErrorCategoryList())
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
            Activity Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Audit Error Category
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            updateRecord={updateRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
            currentRecord={auditErrorCategoryState.auditErrorCategoryRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Audit Error Category Delete"
        alertText="Are you sure, You want delete this Audit Error Category?"
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
