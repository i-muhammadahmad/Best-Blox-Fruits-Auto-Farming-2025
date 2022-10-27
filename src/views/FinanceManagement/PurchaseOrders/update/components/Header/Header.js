import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToPurchaseOrdersList,
  deletePurchaseOrders,
  getPurchaseOrdersById
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
  const purchaseOrdersState = useSelector(state => state.purchaseOrdersState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(()=> {
    if(purchaseOrdersState.showViewPage){
      router.history.push('/purchase-orders/view');
    }
  },[purchaseOrdersState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deletePurchaseOrders(purchaseOrdersState.purchaseOrdersRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getPurchaseOrdersById(purchaseOrdersState.purchaseOrdersRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToPurchaseOrdersList())
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
            Finance Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Purchase Order
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete', 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={purchaseOrdersState.purchaseOrdersRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert 
        title="Purchase Order Delete"
        alertText="Are you sure, You want delete this Purchase Order?"
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
