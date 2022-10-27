import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToDocumentsList,
  deleteDocuments,
  getDocumentsById
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
  const documentsState = useSelector(state => state.documentsState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (documentsState.showUpdateForm) {
      router.history.push('/documents/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentsState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteDocuments(documentsState.documentsRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getDocumentsById(documentsState.documentsRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToDocumentsList())
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
            Document Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Documents
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            closeView={closeView}
            updateRecord={updateRecord}
            deleteRecord={showDeleteModal}
            currentRecord={documentsState.documentsRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Document Delete"
        alertText="Are you sure, You want to delete this Document?"
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
