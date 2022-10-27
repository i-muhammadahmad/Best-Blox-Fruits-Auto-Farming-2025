import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { StyledButton } from 'components';
import FileCopyIcon from '@material-ui/icons/FileCopy';

function CloneModel(props) {
    const { openCloneModel, showCloneModel, hideCloneModel, cloneRecord, ...rest } = props; 
  return (
    <>
      <Dialog
        open={openCloneModel}
        onClose={hideCloneModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Clone Audit Form</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Clone this Audit Form? <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={hideCloneModel}>Cancel</StyledButton>
          <StyledButton
            variant="contained"
            color="bsuccess"
            startIcon={<FileCopyIcon />}
            onClick={cloneRecord}
            autoFocus={true}>
            Clone
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CloneModel;
