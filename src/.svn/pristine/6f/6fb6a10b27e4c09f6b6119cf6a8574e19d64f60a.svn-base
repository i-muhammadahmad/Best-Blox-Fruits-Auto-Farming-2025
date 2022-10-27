
import React, {useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StyledButton } from 'components';
import { isEmpty } from 'lodash';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CK_CONFIGS } from 'configs';

const RejectionModel = (props) => {

  const { submitCallback, modalOpen, handleModalOpen, onModelClose, title, alertText, rejectionButtonTxt } = props;
  
  const [rejectReason, setRejectReason] = React.useState('');

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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertText}
          </DialogContentText>
          <CKEditor
            editor={ClassicEditor}
            data={''}
            config={CK_CONFIGS(localStorage.getItem("token"))}
            onChange={(event, editor) => {
              const data = editor.getData();
              setRejectReason(data);
            }}
          />
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}   >
            Cancel
          </StyledButton>
          <StyledButton 
            variant="contained"
            color="bdanger"
            startIcon={<DeleteIcon />}
            onClick={handleSubmit}  
            autoFocus={true}
            disabled={isEmpty(rejectReason.replace(/<\/?[^>]+(>|$)/g, ""))}
          >
            {rejectionButtonTxt}
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

RejectionModel.defaultProps = {
  rejectionButtonTxt: 'Delete',
};

export default RejectionModel;