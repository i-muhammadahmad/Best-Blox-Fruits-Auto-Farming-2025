import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  documentsCategoryListFetch,
} from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(() => ({
  root: {}
}));

const DocumentsCategory = props => {

  const {clickForwardHandler, ...rest} = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const documentsCategoryState = useSelector(state => state.documentsCategoryState);
  const session = useSelector(state => state.session);

  useEffect(() => {
    dispatch(documentsCategoryListFetch(session.current_page_permissions.object_id));
  }, []);

  return (
    <>
    {!isEmpty(documentsCategoryState.documentsCategoryList) ? documentsCategoryState.documentsCategoryList.map(category => (
      <Grid item xs={1}>
        <div style={{textAlign: 'center', cursor:'pointer'}} onClick={() => clickForwardHandler(category.id)}>
          <img src='/images/folder-icon.png' alt="Folder" style={{width:'3rem', height:'auto'}} /><br />
          <span style={{fontSize: '14px'}}>{category.category_name}</span>
        </div>
        
      </Grid>
      )) : <></>}
    </>
  );
};

export default DocumentsCategory;
