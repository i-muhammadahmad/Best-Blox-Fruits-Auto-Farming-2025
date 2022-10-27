import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToAuditFormCategoryList,
  deleteAuditFormCategory,
  getAuditFormCategoryById,
} from 'actions';
import { Page, StyledButton, ViewActionButtons, DeleteAlert } from 'components';
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

  const auditFormCategoryState = useSelector(state => state.auditFormCategoryState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (auditFormCategoryState.showUpdateForm) {
      router.history.push('/audit-form-category/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditFormCategoryState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteAuditFormCategory(auditFormCategoryState.auditFormCategoryRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getAuditFormCategoryById(auditFormCategoryState.auditFormCategoryRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToAuditFormCategoryList())
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
            AUDIT FORM MANAGEMENT
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Audit Form Category
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            updateRecord={updateRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
            currentRecord={auditFormCategoryState.auditFormCategoryRecord}
          />
        </Grid>
      </Grid>  
      <DeleteAlert
        title="Audit Form Category Delete"
        alertText="Are you sure, You want delete this Audit Form Category?"
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
