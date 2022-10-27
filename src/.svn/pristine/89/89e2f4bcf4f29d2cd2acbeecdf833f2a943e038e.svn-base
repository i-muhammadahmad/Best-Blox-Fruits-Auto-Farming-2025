import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToTicketsList,
  deleteTickets,
  getTicketsById
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
  const ticketsState = useSelector(state => state.ticketsState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (ticketsState.showViewPage) {
      router.history.push('/all-tickets/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketsState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteTickets(ticketsState.ticketsRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getTicketsById(ticketsState.ticketsRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToTicketsList())
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
            Tickets Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Tickets
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={[/* 'delete', */ 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={ticketsState.ticketsRecord}
          />
        </Grid>
      </Grid>   
      {/* <DeleteAlert
        title="Ticket Delete"
        alertText="Are you sure, You want delete this Ticket?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      /> */}
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
