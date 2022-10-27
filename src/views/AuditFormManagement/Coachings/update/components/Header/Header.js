import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import { 
  deleteAuditForm,
  redirectToAuditFormList,
  getAuditFormById
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

  const auditFormState = useSelector(state => state.auditFormState);
  const session = useSelector(state => state.session);

  const [btnToShow, setBtnToShow] = useState(['view']);
  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (auditFormState.showViewPage) {
      router.history.push('/coachings/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditFormState.showViewPage]);

  useEffect(() => {
    if (!isEmpty(auditFormState.auditFormRecord)) {
      setBtnToShow(['view']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditFormState.auditFormRecord]);

  const deleteRecord = async () => {
    await dispatch(deleteAuditForm(auditFormState.auditFormRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getAuditFormById(auditFormState.auditFormRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToAuditFormList())
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
            Coachings
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={btnToShow}
            viewRecord={viewRecord}
            currentRecord={auditFormState.auditFormRecord}
          />
        </Grid>
      </Grid>
      <DeleteAlert
        title="Audit Form Delete"
        alertText="Are you sure, You want delete this Audit Form?"
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
