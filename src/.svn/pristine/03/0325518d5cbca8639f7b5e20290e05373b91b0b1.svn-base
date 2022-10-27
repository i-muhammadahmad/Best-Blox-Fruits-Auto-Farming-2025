
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StyledButton } from 'components';

const DeleteAlert = (props) => {

  const { deleteCallback, modalOpen, handleModalOpen, onModelClose, title, alertText } = props;

  
  const handleClose = () => {
    handleModalOpen(false);
    onModelClose()
  };

  const handleDelete = () => {
    handleClose()
    deleteCallback()
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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}   >
            Cancel
          </StyledButton>
          <StyledButton 
            variant="contained"
            color="bdanger"
            
            startIcon={<DeleteIcon />}
            onClick={handleDelete}  
            autoFocus={true}
            
          >
            Delete
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default DeleteAlert;