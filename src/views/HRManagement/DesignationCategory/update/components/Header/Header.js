import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToDesignationCategoryList,
  deleteDesignationCategory,
  getDesignationCategoryById
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
  const designationCategoryState = useSelector(state => state.designationCategoryState);
  const session = useSelector(state => state.session);

  const [openDeleteModel, setOpenDeleteModel] = useState(false); 

  useEffect(() => {
    if (designationCategoryState.showViewPage) {
      router.history.push('/designation-category/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designationCategoryState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteDesignationCategory(designationCategoryState.designationCategoryRecord.id, session.current_page_permissions.object_id));
    closeView();
  }

  const showDeleteModal = () => {
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
  }

  const viewRecord = () => {
    dispatch(getDesignationCategoryById(designationCategoryState.designationCategoryRecord.id, 'view'))
  }

  const closeView = () => {
    dispatch(redirectToDesignationCategoryList())
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
            HR Managmnet
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Designation Category
          </Typography>
        </Grid>
        <Grid item>
          <ViewActionButtons  
            btnToShow={['delete', 'view']}
            viewRecord={viewRecord}
            deleteRecord={showDeleteModal}
            currentRecord={designationCategoryState.designationCategoryRecord}
          />
        </Grid>
      </Grid>   
      <DeleteAlert
        title="Designation Category Delete"
        alertText="Are you sure, You want delete this Designation Category?"
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
