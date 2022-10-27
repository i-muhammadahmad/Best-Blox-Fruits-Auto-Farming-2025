import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  updateShiftBreaks,
  hideShiftBreaksValidationError,
  redirectToShiftBreaksList,
  shiftBreaksDropdown,
  shiftsListFetch
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, map, find } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';
import { EmployeeDropdown } from 'commonDropdowns';

const schema = {
  shift_id: {
    presence: { allowEmpty: false, message: '^Please Select Shift' }
  },
  break_type_id: {
    presence: { allowEmpty: false, message: '^Please Select Break' }
  },
  start_time: {
    presence: { allowEmpty: false, message: '^Please Select Start Time' }
  },
  end_time: {
    presence: { allowEmpty: false, message: '^Please Select End Time' }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const ShiftBreaksUpdate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const shiftBreaksState = useSelector(state => state.shiftBreaksState);
  const shiftsState = useSelector(state => state.shiftsState);
  const session = useSelector(state => state.session);

  const [ShiftValue, setShiftValue] = useState(null);
  const [BreakTypeValue, setBreakTypeValue] = useState(null);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [EmployeeValue, setEmployeeValue] = useState([]);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
    },
    touched: {
      'object_viewed_id': true,
    },
    errors: {}
  });

  useEffect(() => {
    dispatch(shiftsListFetch(session.current_page_permissions.object_id));
    dispatch(shiftBreaksDropdown(session.current_page_permissions.object_id));
  }, []);

  useEffect(() => {
    let record = shiftBreaksState.shiftBreaksRecord
    let employee_ids = [];
    if (!isEmpty(record.shift_break_employees)){
      employee_ids = (map(record.shift_break_employees, 'employee_id'));
    }
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'shift_id': record.shift_id,
        'id': record.id,
        'description': record.description,
        'break_type_id': record.break_type_id,
        'start_time': record.start_time,
        'end_time': record.end_time,
        'employee_ids': employee_ids,
        'break_applied_to': record.break_applied_to,
      },
      touched: {
        ...formState.touched,
        'shift_id': true,
        'id': true,
        'description': true,
        'break_type_id':true,
        'break_type_id': true,
        'start_time': true,
        'end_time': true,
        'employee_ids': true,
        'break_applied_to': true,
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftBreaksState.shiftBreaksRecord])

  useEffect(() => {
    let record = shiftBreaksState.shiftBreaksRecord;
    const item = find(shiftsState.shiftsList, ['id', record.shift_id]);
    setShiftValue(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftsState.shiftsList])

  useEffect(() => {
    let record = shiftBreaksState.shiftBreaksRecord;
    const item = find(shiftBreaksState.breakTypesDropdownList, ['id', record.break_type_id]);
    setBreakTypeValue(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftBreaksState.breakTypesDropdownList])

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(shiftBreaksState.validation_error)) {
      const errors = shiftBreaksState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [shiftBreaksState.validation_error]);

  useEffect(() => {
    if (!shiftBreaksState.showViewPage && !shiftBreaksState.showUpdateForm) {
      router.history.push('/shift-breaks');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftBreaksState.showViewPage, shiftBreaksState.showUpdateForm]);

  useEffect(() => {
    if (shiftBreaksState.redirect_to_list) {
      router.history.push('/shift-breaks');
    }
  }, [shiftBreaksState.redirect_to_list, router.history]);

  const setShiftId = shift_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        shift_id: shift_id
      },
      touched: {
        ...formState.touched,
        shift_id: true
      }
    }));
    dispatch(hideShiftBreaksValidationError('shift_id'));
  };

  const setBreakTypeId = break_type_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        break_type_id: break_type_id
      },
      touched: {
        ...formState.touched,
        break_type_id: true
      }
    }));
    dispatch(hideShiftBreaksValidationError('break_type_id'));
  };

  const setDescription = description => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'description': description
      },
      touched: {
        ...formState.touched,
        'description': true
      }
    }));
    dispatch(hideShiftBreaksValidationError('description'))
  }

  const handleStartTimeChange = value => {
    if (!isEmpty(ShiftValue)) {
      let shiftStartTime = ShiftValue.start_time;
      let shiftEndTime = ShiftValue.end_time;
      let curStartTime = value;
      if(parseInt(shiftStartTime) > parseInt(shiftEndTime)){
        if (parseInt(shiftStartTime) > parseInt(curStartTime)){
          curStartTime = new Date('01/02/2000 ' + curStartTime);
        } else{
          curStartTime = new Date('01/01/2000 ' + curStartTime);
        }
        shiftStartTime = new Date('01/01/2000 ' + shiftStartTime);
        shiftEndTime = new Date('01/02/2000 ' + shiftEndTime);
      }
      else{
        shiftStartTime = new Date('01/01/2000 ' + shiftStartTime);
        shiftEndTime = new Date('01/01/2000 ' + shiftEndTime);
        curStartTime = new Date('01/01/2000 ' + curStartTime);
      }
      if (shiftStartTime > curStartTime || shiftEndTime < curStartTime) {
        setStartTimeError(true);
      } else {
        setStartTimeError(false);
      }
      setStartTime(curStartTime); 
    }
  };

  const setStartTime = (starttime) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'start_time': starttime
      },
      touched: {
        ...formState.touched,
        'start_time': true
      }
    }));
  }

  const handleEndTimeChange = value => {
    if (!isEmpty(ShiftValue)) {
      let shiftStartTime = ShiftValue.start_time;
      let shiftEndTime = ShiftValue.end_time;
      let curEndTime = value;
      if(parseInt(shiftStartTime) > parseInt(shiftEndTime)){
        if (parseInt(shiftStartTime) > parseInt(curEndTime)){
          curEndTime = new Date('01/02/2000 ' + curEndTime);
        } else{
          curEndTime = new Date('01/01/2000 ' + curEndTime);
        }
        shiftStartTime = new Date('01/01/2000 ' + shiftStartTime);
        shiftEndTime = new Date('01/02/2000 ' + shiftEndTime);
      }
      else{
        shiftStartTime = new Date('01/01/2000 ' + shiftStartTime);
        shiftEndTime = new Date('01/01/2000 ' + shiftEndTime);
        curEndTime = new Date('01/01/2000 ' + curEndTime);
      }
      if (shiftStartTime > curEndTime || shiftEndTime < curEndTime) {
        setEndTimeError(true);
      } else {
        setEndTimeError(false);
      }
      setEndTime(curEndTime);
    }
  };

  const setEndTime = (endtime) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'end_time': endtime
      },
      touched: {
        ...formState.touched,
        'end_time': true
      }
    }));
  }


  const employeeOnChange = (event, newValue) => {
    if (newValue) {
      setEmployeeValue(newValue)
      let employee_ids = (map(newValue, 'id'));
      setEmployeeIds(employee_ids)
    }
    else {
      setEmployeeValue(newValue)
      setEmployeeIds([])
    }
  }  

  const setEmployeeIds = employee_ids => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'employee_ids': employee_ids
      },
      touched: {
        ...formState.touched,
        'employee_ids': true
      }
    }));
    dispatch(hideShiftBreaksValidationError('employee_ids'))
  }

  const handleRadioChange = event => {
    let value = event.target.value;
    if (value === 'all_employees'){
      setEmployeeValue([]);
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          'break_applied_to': value,
          'employee_ids': []
        },
        touched: {
          ...formState.touched,
          'break_applied_to': true,
          'employee_ids': true
        }
      }));
    }
    else{
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          'break_applied_to': value
        },
        touched: {
          ...formState.touched,
          'break_applied_to': true
        }
      }));
    }
  }

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
    dispatch(hideShiftBreaksValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(updateShiftBreaks(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Update Shift Breaks"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update Shift Breaks" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                  <Autocomplete
                    id="shift_id"
                    name="shift_id"
                    value={ShiftValue}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setShiftValue(newValue);
                        setShiftId(newValue.id);
                        handleStartTimeChange(formState.values.start_time);
                        handleEndTimeChange(formState.values.end_time);
                      } else {
                        setShiftValue(newValue);
                        setShiftId('');
                      }
                    }}
                    options={shiftsState.shiftsList}
                    getOptionLabel={option => option.name}
                    size="small"
                    renderInput={params => (
                      <TextField
                        {...params}
                        size="small"
                        label="Select Shift"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        error={hasError('shift_id')}
                        helperText={
                          hasError('shift_id')
                            ? formState.errors.shift_id[0]
                            : null
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Autocomplete
                    id="break_type_id"
                    name="break_type_id"
                    value={BreakTypeValue}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setBreakTypeValue(newValue);
                        setBreakTypeId(newValue.id);
                      } else {
                        setBreakTypeValue(newValue);
                        setBreakTypeId('');
                      }
                    }}
                    options={shiftBreaksState.breakTypesDropdownList}
                    getOptionLabel={option => option.opt_display}
                    size="small"
                    renderInput={params => (
                      <TextField
                        {...params}
                        size="small"
                        label="Select Break Type"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        error={hasError('break_type_id')}
                        helperText={
                          hasError('break_type_id')
                            ? formState.errors.break_type_id[0]
                            : null
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    id="start_time"
                    label="Start Time"
                    type="time"
                    name="start_time"
                    fullWidth
                    onChange={e => {
                      handleStartTimeChange(e.target.value);
                      handleChange(e);
                    }}
                    value={formState.values.start_time || ''}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                    size="small"
                    helperText={
                      hasError('start_time')
                        ? formState.errors.start_time[0]
                        : null
                    }
                  />
                  <FormControl error={startTimeError}>
                    <FormHelperText id="start-time-error-text">
                      {startTimeError
                        ? 'Please Select Start Time In The Shift Time Range.'
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    id="end_time"
                    label="End Time"
                    type="time"
                    name="end_time"
                    fullWidth
                    onChange={e => {
                      handleEndTimeChange(e.target.value);
                      handleChange(e);
                    }}
                    value={formState.values.end_time || ''}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                    size="small"
                    helperText={
                      hasError('end_time') ? formState.errors.end_time[0] : null
                    }
                  />
                  <FormControl error={endTimeError}>
                    <FormHelperText id="end-time-error-text">
                      {endTimeError
                        ? 'Please Select End Time In The Shift Time Range.'
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormLabel component="legend">Break Applied To</FormLabel>
                  <RadioGroup
                    name="break_applied_to"
                    id="break_applied_to"
                    value={formState.values.break_applied_to || 'all_employees'}
                    onChange={handleRadioChange}>
                    <FormControlLabel
                      value="all_employees"
                      control={<Radio />}
                      label="All Employees"
                    />
                    <FormControlLabel
                      value="employees"
                      control={<Radio />}
                      label="Employees"
                    />
                  </RadioGroup>
                </Grid>
                {formState.values.break_applied_to === 'employees' ? 
                  <Grid item xs={6} sm={3}>
                    <EmployeeDropdown
                      EmployeeValue={EmployeeValue}
                      setEmployeeValue={setEmployeeValue}
                      id="employee_ids"
                      name="employee_ids"
                      multiple={true}
                      limitTags={2}
                      employeeOnChange={employeeOnChange}
                      showSelectAllOption={false}
                      selectedId={formState.values.employee_ids}
                      renderInput={(params) => <TextField {...params} size="small" label="Select Employee" variant="outlined" error={hasError('employee_ids')} helperText={hasError('employee_ids') ? formState.errors.employee_ids[0] : null} />}
                    />
                  </Grid> 
                : ''}
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={shiftBreaksState.shiftBreaksRecord.description || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data)
                }}
              />
              <FormControl error={hasError('description')} >
                <FormHelperText id="component-error-text">{hasError('description') ? formState.errors.description[0] : null}</FormHelperText>
              </FormControl>
            </div>
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Update ShiftBreaks
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToShiftBreaksList()) }}
              startIcon={<CancelIcon />}
            >
              CLOSE
          </StyledButton>

          </form>

        </CardContent>
      </Card>

    </Page>
  );
};

export default ShiftBreaksUpdate;
