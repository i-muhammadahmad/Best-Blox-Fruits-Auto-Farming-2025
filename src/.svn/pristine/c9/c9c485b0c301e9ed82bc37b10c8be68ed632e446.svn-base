import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToContactBoardList,
  deleteContactBoard,
  getContactBoardById
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
  const contactBoardState = useSelector(state => state.contactBoardState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (contactBoardState.showViewPage) {
      router.history.push('/contact-board/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactBoardState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteContactBoard(contactBoardState.contactBoardRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getContactBoardById(contactBoardState.contactBoardRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToContactBoardList())
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
            Advisory Board
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete', 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={contactBoardState.contactBoardRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Advisory Board Delete"
        alertText="Are you sure, You want delete this Advisory Board?"
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
