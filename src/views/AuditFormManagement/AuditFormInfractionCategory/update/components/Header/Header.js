import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToAuditFormInfractionCategoryList,
  deleteAuditFormInfractionCategory,
  getAuditFormInfractionCategoryById
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

  const auditFormInfractionCategoryState = useSelector(state => state.auditFormInfractionCategoryState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (auditFormInfractionCategoryState.showViewPage) {
      router.history.push('/audit-form-infraction-category/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditFormInfractionCategoryState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteAuditFormInfractionCategory(auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getAuditFormInfractionCategoryById(auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToAuditFormInfractionCategoryList())
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
            Audit Form Infraction Category
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            deleteRecord={showDeleteModal}
            viewRecord={viewRecord}
            btnToShow={['delete', 'view']}
            currentRecord={auditFormInfractionCategoryState.auditFormInfractionCategoryRecord}
          />
        </Grid>
      </Grid>  
      <DeleteAlert
        title="Infraction Category Delete"
        alertText="Are you sure, You want delete this Infraction Category?"
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
