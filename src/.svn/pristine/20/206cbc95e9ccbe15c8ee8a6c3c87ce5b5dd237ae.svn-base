import React, {useState,useEffect} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { StyledButton } from 'components';
import CancelIcon from '@material-ui/icons/Cancel';
import { isEmpty } from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles(theme => ({
  content: {
    padding: 0
  },
  inner: {
    margin: '10px',
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  }
}));

function SeatsDetailModal(props) {
  const classes = useStyles();
  const {
    showSeatsDetailModal,
    setShowSeatsDetailModal,
    seatsModalDetail,
    setSeatsModalDetail,
    ...rest
  } = props;

  const [clientDetails, setClientDetails] = useState(seatsModalDetail.client_detail);

  useEffect(() => {
    setClientDetails(seatsModalDetail.client_detail)
  }, [seatsModalDetail.client_detail]);

  const handleModalClose = () => {
    setShowSeatsDetailModal(false);
  };

  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={showSeatsDetailModal}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <DialogTitle id="form-dialog-title">
        {seatsModalDetail.title + ':00'}
      </DialogTitle>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <TableContainer component={Paper} style={{margin:'15px 0px'}}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Client Name</TableCell>
                        <TableCell>Headcounts</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!isEmpty(clientDetails) ? (
                        <>
                          {Object.values(clientDetails).map((cdata, cindex) => (
                              <TableRow key={cindex}>
                                <TableCell>{cdata['client_name']}</TableCell>
                                <TableCell>{cdata['total']}</TableCell>
                              </TableRow>
                          ))}
                        </>
                      ) : (
                        <TableRow>
                          <TableCell>No Working Client/Campaign</TableCell>
                          <TableCell>No Working Client/Campaign</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </PerfectScrollbar>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <StyledButton
          variant="contained"
          color="bsecondary"
          size="small"
          className={classes.button}
          startIcon={<CancelIcon />}
          onClick={handleModalClose}>
          CLOSE
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}
export default SeatsDetailModal;
