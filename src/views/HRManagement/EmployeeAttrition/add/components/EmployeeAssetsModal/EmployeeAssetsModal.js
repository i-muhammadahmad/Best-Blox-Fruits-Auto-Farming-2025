import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  Paper,
  Avatar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { StyledButton } from 'components';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { isEmpty, join, find } from 'lodash';
import { API_URL } from 'configs';

const useStyles = makeStyles(theme => ({
  content: {
    padding: 0
  },
  inner: {
    margin: '10px'
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const EmployeeAssetsModal = (props) => {
  const classes = useStyles();
  const {
    showAssetsPopup,
    setShowAssetsPopup,
    handleSubmit,
    ...rest
  } = props;

  const employeesState = useSelector(state => state.employeesState);

  const handleModalClose = () => {
    setShowAssetsPopup(false);
  };

  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      fullWidth
      maxWidth="md"
      open={showAssetsPopup}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <DialogTitle id="form-dialog-title">Employee Assets</DialogTitle>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" > 
              Are you sure you want to add attrition? <br />
              There are assets binded with employee. 
            </Typography>
            <Typography variant="subtitle1" > <b>Note:</b> All assets binded with employee will be marked as unreturned </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="Assets Binded With Employee">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Assets Name</TableCell>
                    <TableCell>Assets Type</TableCell>
                    <TableCell>Assign From</TableCell>
                    <TableCell>Assign To</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isEmpty(employeesState.employeeAssetsList) ? (
                    employeesState.employeeAssetsList.map((asset, index) => (
                      <TableRow key={index}>
                      
                        <TableCell>
                          <Avatar
                            alt="Asset Image"
                            src={
                              !isEmpty(asset.asset_type)? API_URL + asset.asset_type.assets_type_image : ''
                            }
                          />
                        </TableCell>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{!isEmpty(asset.asset_type)? asset.asset_type.name: ''}</TableCell>
                        <TableCell>{asset.asset_assigned_from}</TableCell>
                        <TableCell>{asset.asset_assigned_to}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        No Assets Are Binded With Employee
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <StyledButton
          color="bprimary"
          size="small"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Create Employee Attrition
        </StyledButton>  &nbsp; &nbsp;
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
export default EmployeeAssetsModal;
