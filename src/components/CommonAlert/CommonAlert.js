
import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StyledButton } from 'components';

const CommonAlert = (props) => {

  const { submitCallback, modalOpen, handleModalOpen, onModelClose, title, alertText, submitButton } = props;
  
  const handleClose = () => {
    handleModalOpen(false);
    onModelClose()
  };

  const handleSubmit = () => {
    handleClose()
    submitCallback()
  }

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent >
          {(typeof alertText === 'function')?
            <>{alertText()}</>
          :
            <DialogContentText id="alert-dialog-description">
              {alertText}
            </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}   >
            Cancel
          </StyledButton>
          {(submitButton === '')?
            <StyledButton 
              variant="contained"
              color="bprimary"
              
              startIcon={<SaveIcon />}
              onClick={handleSubmit}  
              autoFocus={true}
              
            >
              Submit
            </StyledButton>
            :
            <>{submitButton()}</>
          }  
        </DialogActions>
      </Dialog>
    </div>
  );
}

CommonAlert.defaultProps = {
  submitButton: '',
};

export default CommonAlert;