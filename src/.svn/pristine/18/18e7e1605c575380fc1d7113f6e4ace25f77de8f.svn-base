import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToAssetTypesList,
  deleteAssetTypes,
  getAssetTypesById
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
  const assetTypesState = useSelector(state => state.assetTypesState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (assetTypesState.showViewPage) {
      router.history.push('/asset-types/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetTypesState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteAssetTypes(assetTypesState.assetTypesRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getAssetTypesById(assetTypesState.assetTypesRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToAssetTypesList())
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
            Asset Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Asset Type
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete', 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={assetTypesState.assetTypesRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Asset Type Delete"
        alertText="Are you sure, You want delete this Asset Type?"
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
