import React, { useState, useEffect } from 'react';
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
import { isEmpty, join, find } from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles(theme => ({
  content: {
    padding: 0,
  },
  inner: {
    margin: '10px'
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  }
}));

function AssetDetailsModal(props) {
  const classes = useStyles();
  const {
    showAssetsDetailModal,
    setShowAssetsDetailModal,
    assetsModalDetail,
    ...rest
  } = props;

  const handleModalClose = () => {
    setShowAssetsDetailModal(false);
  };

  const getAssetAttributeValue = attr => {
    //getting asset detail
    let asset_dtl = find(assetsModalDetail.asset_details, [
      'attr_id',
      attr.id
    ]);
    return <span>{!isEmpty(asset_dtl) ? asset_dtl.attr_value : ''}</span>;
  };

  const getBinderWithHTML = value => {
    let binder_with_arr = [];
    if (value.is_binded_with_employee == 1) {
      binder_with_arr.push('Employee');
    }
    if (value.is_binded_with_office == 1) {
      binder_with_arr.push('Office');
    }
    if (value.is_binded_with_workstation == 1) {
      binder_with_arr.push('Workstation');
    }
    return <span>{join(binder_with_arr, [', '])}</span>;
  };

  const getAllocatedToHTML = value => {
    let alloc_to_arr = [];
    if (!isEmpty(value.employee)) {
      let emp_name =
        value.employee.firstname +
        ' ' +
        value.employee.middlename +
        ' ' +
        value.employee.lastname;
      alloc_to_arr.push(emp_name);
    }
    if (!isEmpty(value.office)) {
      alloc_to_arr.push(value.office.name);
    }
    if (!isEmpty(value.workstation)) {
      alloc_to_arr.push(value.workstation.name);
    }
    return <span>{join(alloc_to_arr, [', '])}</span>;
  };

  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      fullWidth
      maxWidth="md"
      open={showAssetsDetailModal}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <DialogTitle id="form-dialog-title">Assets Details</DialogTitle>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell variant="head"> Name </TableCell>
                    <TableCell>{assetsModalDetail.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head"> Asset Type </TableCell>
                    <TableCell>
                      {!isEmpty(assetsModalDetail.asset_type)
                        ? assetsModalDetail.asset_type.name
                        : ''}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head"> Bound With </TableCell>
                    <TableCell>
                      {!isEmpty(assetsModalDetail.asset_type)
                        ? getBinderWithHTML(assetsModalDetail.asset_type)
                        : ''}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head"> Allocated To </TableCell>
                    <TableCell>
                      {getAllocatedToHTML(assetsModalDetail)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head"> Assign From </TableCell>
                    <TableCell>
                      {assetsModalDetail.asset_assigned_from}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head"> Assign To </TableCell>
                    <TableCell>
                      {assetsModalDetail.asset_assigned_to}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head"> Created By </TableCell>
                    <TableCell>
                      {!isEmpty(assetsModalDetail.created_by_user)
                        ? assetsModalDetail.created_by_user.email
                        : ''}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head"> Created At </TableCell>
                    <TableCell>
                      {assetsModalDetail.date_created}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head"> Last Updated By </TableCell>
                    <TableCell>
                      {!isEmpty(assetsModalDetail.updated_by_user)
                        ? assetsModalDetail.updated_by_user.email
                        : ''}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head"> Last Updated At </TableCell>
                    <TableCell>
                      {assetsModalDetail.date_last_modified}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            {!isEmpty(assetsModalDetail.asset_type) &&
            !isEmpty(assetsModalDetail.asset_type.asset_attributes) ? (
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="Asset Attributes Tables">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assetsModalDetail.asset_type.asset_attributes.map(
                      (attr, index) => (
                        <TableRow key={attr.attr_id}>
                          <TableCell>
                            {attr.field_name}
                            <span style={{ color: 'red' }}>
                              {' '}
                              {attr.is_required == 1 ? '*' : ''}{' '}
                            </span>
                          </TableCell>
                          <TableCell>{getAssetAttributeValue(attr)}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              ''
            )}
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
export default AssetDetailsModal;
