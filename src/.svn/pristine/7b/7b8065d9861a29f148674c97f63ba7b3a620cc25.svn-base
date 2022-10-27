import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToDocumentsCategoryList,
  deleteDocumentsCategory,
  getDocumentsCategoryById
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
  const documentsCategoryState = useSelector(state => state.documentsCategoryState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (documentsCategoryState.showUpdateForm) {
      router.history.push('/documents-category/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentsCategoryState.showUpdateForm]);

  const deleteRecord = async () => {
    await dispatch(deleteDocumentsCategory(documentsCategoryState.documentsCategoryRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const updateRecord = () => {
    dispatch(getDocumentsCategoryById(documentsCategoryState.documentsCategoryRecord.id, 'update'))
  }

  const closeView = () => {
    dispatch(redirectToDocumentsCategoryList())
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
            Documents Category
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            closeView={closeView}
            updateRecord={updateRecord}
            deleteRecord={showDeleteModal}
            currentRecord={documentsCategoryState.documentsCategoryRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Document Category Delete"
        alertText="Are you sure, You want delete this Document Category?"
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
