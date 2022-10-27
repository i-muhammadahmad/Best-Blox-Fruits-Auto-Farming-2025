import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToAssetsList,
  deleteAssets,
  getAssetsById
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
  const assetsState = useSelector(state => state.assetsState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (assetsState.showViewPage) {
      router.history.push('/assets/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsState.showViewPage]);

  useEffect(() => {
    if (!assetsState.showUpdateForm && !assetsState.showViewPage) {
      router.history.push('/assets');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsState.showViewPage, assetsState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteAssets(assetsState.assetsRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getAssetsById(assetsState.assetsRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToAssetsList())
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
            Assets
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete','close', 'view']}
            viewRecord={viewRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
            currentRecord={assetsState.assetsRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Assets Delete"
        alertText="Are you sure, You want delete this Assets?"
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
