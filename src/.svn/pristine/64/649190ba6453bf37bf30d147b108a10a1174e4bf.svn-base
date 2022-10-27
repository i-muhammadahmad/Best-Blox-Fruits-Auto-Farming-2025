import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  TextField,
  makeStyles,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { addUpdateLeaveConfig, getLeaveConfigsList } from 'actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { StyledButton } from 'components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { find, remove, isEmpty } from 'lodash';
import { API_URL } from 'configs'

const schema = {
  apporavl_levels: {
    presence: { allowEmpty: false, message: '^Please select approval levels' },
  },
}

const useStylesModal = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const LeaveCreditsModel = (props) => {

  const {
    modalOpen,
    handleModalOpen,
    selectedOfficeId,
    setSelectedOfficeId,
    leaveTypeFormstate,
    officeApprovalLevels
  } = props;

  const classes = useStylesModal();
  const dispatch = useDispatch();
  const leaveConfigsState = useSelector(state => state.leaveConfigsState);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      office_id: selectedOfficeId,
      apporavl_levels: officeApprovalLevels,
      leave_configs: {}
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        leave_configs: leaveTypeFormstate
      }
    }));
  }, [leaveTypeFormstate]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleClose = () => {
    setFormState({
      isValid: false,
      values: {
        leave_configs: {}
      },
      touched: {},
      errors: {}
    });
    handleModalOpen(false);
    setSelectedOfficeId('');
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  }

  const handleLeaveCreditChange = (event, leave_type_id, field_name) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        leave_configs: {
          ...formState.values.leave_configs,
          [leave_type_id]: {
            ...formState.values.leave_configs[leave_type_id],
            [field_name]: event.target.value
          }
        }
      },
    }));
  }

  const handleSubmit = async event => {
    event.preventDefault();
    await dispatch(addUpdateLeaveConfig(formState.values));
    await handleClose();
    dispatch(getLeaveConfigsList());
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <form
          onSubmit={handleSubmit}
        >
          <DialogTitle id="form-dialog-title">Add Leaves Configs</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <p>Office: {!isEmpty(leaveConfigsState.leaveConfigList[selectedOfficeId]) ? leaveConfigsState.leaveConfigList[selectedOfficeId]['office_name'] : ''}</p>
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  id="apporavl_levels"
                  helperText={hasError('apporavl_levels') ? formState.errors.apporavl_levels[0] : null}
                  label="Apporavl Levels"
                  name="apporavl_levels"
                  select
                  fullWidth
                  onChange={handleChange}
                  value={formState.values.apporavl_levels || ''}
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Table size={"small"} sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell >Leave Type</TableCell>
                      <TableCell >Accrual Frequency</TableCell>
                      <TableCell >Leave Credits</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!isEmpty(Object.values(leaveTypeFormstate)) ?
                      <>
                        {Object.values(leaveTypeFormstate).map((val, i) => (
                          <TableRow key={val.leave_type_id}>
                            <TableCell >
                              {val.name}
                            </TableCell>
                            <TableCell >
                              <TextField
                                id="accrual_frequency"
                                select
                                fullWidth
                                name="accrual_frequency"
                                onChange={(e) => handleLeaveCreditChange(e, val.leave_type_id, 'accrual_frequency')}
                                value={!isEmpty(formState.values.leave_configs) ? formState.values.leave_configs[val.leave_type_id]['accrual_frequency'] : ''}
                                variant="outlined"
                                size="small"
                              >
                                <MenuItem aria-label="Monthly" value="monthly" key="m" >Monthly</MenuItem>
                                <MenuItem aria-label="Annual" value="annual" key="y" >Annual</MenuItem>
                              </TextField>
                            </TableCell>
                            <TableCell >
                              <TextField
                                fullWidth
                                name="leave_credits"
                                onChange={(e) => handleLeaveCreditChange(e, val.leave_type_id, 'leave_credits')}
                                value={!isEmpty(formState.values.leave_configs) ? formState.values.leave_configs[val.leave_type_id]['leave_credits'] : ''}
                                variant="outlined"
                                size="small"
                                type="number"
                                InputProps={{
                                  min: 0,
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                      : ''}
                  </TableBody>
                </Table>
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
              onClick={handleClose}
            >
              CLOSE
            </StyledButton>
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
            >
              Add Leave Credits
            </StyledButton>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}

export default LeaveCreditsModel;