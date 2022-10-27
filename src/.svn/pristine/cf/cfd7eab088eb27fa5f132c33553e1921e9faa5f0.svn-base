
import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
 
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000000,
    color: '#fff',
  },
}));

const MainLoader = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const commonState = useSelector(state => state.commonState);
  
  useEffect(() => {
    (commonState.show_common_loader) ?
        setOpen(true) : setOpen(false)
  },[commonState.show_common_loader])

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} >
        {(commonState.common_loder_label === '')?
          <CircularProgress color="inherit" />
          :
          <Box position="relative" display="inline-flex">
            <CircularProgress color="inherit"/>
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption" component="div" color="textSecondary">
              {parseFloat(commonState.common_loder_label)+'%'}
              </Typography>
            </Box>
          </Box>
        }  
      </Backdrop>
    </div>   
  );
};

export default MainLoader;