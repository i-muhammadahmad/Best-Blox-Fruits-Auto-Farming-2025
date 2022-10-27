import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToClientList,
  deleteClient,
  getClientById
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
  const clientState = useSelector(state => state.clientState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(()=> {
    if(clientState.showUpdateForm){
      router.history.push('/client/update');
    }
  },[clientState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteClient(clientState.clientRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getClientById(clientState.clientRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToClientList())
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
            Client Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Client
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            updateRecord={updateRecord}
            closeView={closeView}
            deleteRecord={showDeleteModal}
            currentRecord={clientState.clientRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert 
        title="Client Delete"
        alertText="Are you sure, You want delete this Client?"
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
