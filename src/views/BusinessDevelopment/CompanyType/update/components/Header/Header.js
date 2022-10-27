import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToCompanyTypeList,
  deleteCompanyType,
  getCompanyTypeById
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
  const companyTypeState = useSelector(state => state.companyTypeState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (companyTypeState.showViewPage) {
      router.history.push('/company-type/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyTypeState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteCompanyType(companyTypeState.companyTypeRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getCompanyTypeById(companyTypeState.companyTypeRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToCompanyTypeList())
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
            Business Development
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Company Type
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete', 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={companyTypeState.companyTypeRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Company Type Delete"
        alertText="Are you sure, You want delete this Company Type?"
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
