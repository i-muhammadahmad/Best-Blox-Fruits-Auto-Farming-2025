import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { StyledButton } from 'components';
import PublishIcon from '@material-ui/icons/Publish';

function PublishModel(props) {
    const { openPublishModel, showPublishModel, hidePublishModel, publishRecord, ...rest } = props; 
  return (
    <>
      <Dialog
        open={openPublishModel}
        onClose={hidePublishModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Publish Audit Form</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to publish this Audit Form? <br />
            You will not be able to edit a published Form.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={hidePublishModel}>Cancel</StyledButton>
          <StyledButton
            variant="contained"
            color="bsuccess"
            startIcon={<PublishIcon />}
            onClick={publishRecord}
            autoFocus={true}>
            Publish
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PublishModel;
