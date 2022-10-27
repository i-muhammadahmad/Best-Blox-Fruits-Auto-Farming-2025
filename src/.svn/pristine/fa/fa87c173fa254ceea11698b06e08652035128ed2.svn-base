
import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import {deleteHolidayCategor} from 'actions';

const Delete = ({activityCategorId, showHide}) => {

  const handleClose = () => {
    //showHideDeletePageModel();
  };

  const handleDelete = () => {
    deleteHolidayCategor(activityCategorId,activityCategorId)
  }

  return (
    <div>
      <Dialog
        open={}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Holiday Category Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, You want delete this Holiday Category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary"  >
            Cancel
          </Button>
          <Button 
            variant="contained"
            color="secondary"
            
            startIcon={<DeleteIcon />}
            onClick={handleDelete}  
            autoFocus={true}
            
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default Delete;