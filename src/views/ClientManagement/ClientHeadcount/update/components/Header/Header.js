import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToClientHeadcountList,
  deleteClientHeadcount,
  getClientHeadcountById
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
  const clientHeadcountState = useSelector(state => state.clientHeadcountState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (clientHeadcountState.showViewPage) {
      router.history.push('/client-headcount/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientHeadcountState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteClientHeadcount(clientHeadcountState.clientHeadcountRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getClientHeadcountById(clientHeadcountState.clientHeadcountRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToClientHeadcountList())
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
            CLIENT MANAGEMENT
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Client Headcount
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete', 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={clientHeadcountState.clientHeadcountRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Client Headcount Delete"
        alertText="Are you sure, You want delete this Client Headcount?"
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
