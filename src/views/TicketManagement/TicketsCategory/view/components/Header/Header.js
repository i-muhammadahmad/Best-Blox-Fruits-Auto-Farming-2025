import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToTicketsCategoryList,
  deleteTicketsCategory,
  getTicketsCategoryById
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
  const ticketsCategoryState = useSelector(state => state.ticketsCategoryState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (ticketsCategoryState.showUpdateForm) {
      router.history.push('/tickets-category/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketsCategoryState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteTicketsCategory(ticketsCategoryState.ticketsCategoryRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getTicketsCategoryById(ticketsCategoryState.ticketsCategoryRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToTicketsCategoryList())
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
            Ticket Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Tickets Category
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            closeView={closeView}
            updateRecord={updateRecord}
            deleteRecord={showDeleteModal}
            currentRecord={ticketsCategoryState.ticketsCategoryRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Ticket Category Delete"
        alertText="Are you sure, You want delete this Ticket Category?"
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
