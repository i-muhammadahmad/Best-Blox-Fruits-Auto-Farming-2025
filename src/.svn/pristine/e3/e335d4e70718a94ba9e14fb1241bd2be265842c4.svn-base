import React, { useRef, useEffect, useState } from 'react';
import { render } from 'react-dom';
import './swatch.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red, orange } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import TimerOffRoundedIcon from '@material-ui/icons/TimerOffRounded';
import { useSelector, useDispatch } from 'react-redux';
import { handleStartTimer, handlePauseTimer, handleStopTimer, handleUpdateTimer, handleEndTimer, getLoggedEntries, startTimer } from 'actions';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import validate from 'validate.js';
import { isEmpty } from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
} from '@material-ui/core';
import {StyledChip} from 'components';
import { StyledButton } from 'components';
import getInitials from 'utils/getInitials';
import { object } from 'prop-types';

// const dispatch = useDispatch();
const getfomatedhours = (timestamp) => {
  var hours = leftPad(Math.floor(timestamp / 60 / 60));
  return hours;
}
// const dispatch = useDispatch();
const getfomatedminuts = (timestamp) => {
  var hours = leftPad(Math.floor(timestamp / 60 / 60));
  var minutes = leftPad(Math.floor(timestamp / 60) - (hours * 60));
  return minutes;
}
// const dispatch = useDispatch();
const getfomatedseconds = (timestamp) => {
  var seconds = leftPad(timestamp % 60);
  return seconds;
}

const leftPad = (val) => {
  if (val < 10) { return `0${val}` }
  return `${val}`
}

const Stopwatch = (props) => {
  const dispatch = useDispatch();
  const clockInState = useSelector(state => state.clockInState);
  let interval = useRef(null);
  let clockinterval = '';//props.interRefrence;

  useEffect(() => {
    dispatch(getLoggedEntries());
  }, [clockInState.running]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  let iconStyles = {
    fontSize: '2rem'
  };
  const classes = useStyles();
  // Table Code
  const columns = [
    { id: 'date_created', label: 'Date/Time', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },
  ];

  //break status functinality
  const session = useSelector(state => state.session);

  const schema = {
    break_status: {
      presence: { allowEmpty: false, message: '^Please Select Break Satus' }
      /*equality: {
        attribute: "break_status",
        message: "Custom status is required",
        comparator: function(v1, v2) {
          alert(v1);alert(v2);
          if(v1 === 'Oher'){

          }
          return JSON.stringify(v1) === JSON.stringify(v2);
        }
      }*/
    },
    custom_status: {
      length: {
        maximum: 40,
      }
    },
  }

  const [breakStatusformState, setBreakStatusformState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
      'break_status': 'Lunch (1 hr)',
    },
    touched: {
      'object_viewed_id': true,
      'break_status': true,
    },
    errors: {}
  });

  const handleBreakStatusFormChange = event => {
    event.persist();
    setBreakStatusformState(breakStatusformState => ({
      ...breakStatusformState,
      values: {
        ...breakStatusformState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...breakStatusformState.touched,
        [event.target.name]: true
      }
    }));
  }

  useEffect(() => {
    const errors = validate(breakStatusformState.values, schema);

    setBreakStatusformState(breakStatusformState => ({
      ...breakStatusformState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [breakStatusformState.values]);

  const hasError = field =>
  breakStatusformState.touched[field] && breakStatusformState.errors[field] ? true : false;

  const handleSubmit = async event => {
    event.preventDefault();
    if(breakStatusformState.values.break_status === 'Other'){
      await props.handlestopfunction(breakStatusformState.values.custom_status);
    }
    else{
      await props.handlestopfunction(breakStatusformState.values.break_status);
    }
    props.closeBreakModel();
  }

  function createData(datetime, status) {
    return { datetime, status };
  }
  const rows = clockInState.loggedEntries.data;

  const weekDays = {sunday: 'S', monday: 'M', tuesday: 'T', wednesday: 'W', thursday: 'T', friday: 'F', saturday: 'S'};

  const convertTimeTo12hr = (time) => {
    if(!isEmpty(time))
    {
      const convertedTime = new Date("February 04, 2011 " + time).toLocaleTimeString('en-US',{hour12:true,hour:'numeric',minute:'numeric'});
      return(convertedTime);
    }
    else
    {
      return('N/A');
    }
  }

  function moveArrayItemToNewIndex(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; 
  };

  const getActiveDays = (details) => {
    let shift_details = JSON.parse(details);
    moveArrayItemToNewIndex(shift_details, 6, 0);
    return(shift_details.map(detail => (<StyledChip size="small" color={(detail.rest_day === true) ? 'bgrey' : 'bprimary'} label={getInitials(detail.day)} style={{marginRight: '5px'}}/>)))
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <h1 className="time"> {getfomatedhours(clockInState.seconds)}:{getfomatedminuts(clockInState.seconds)}:<span className="seconds_class">{getfomatedseconds(clockInState.seconds)}</span> </h1>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <div className="controls">
            <Paper className={classes.paper}>
              {(clockInState.running
                ? <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<PauseCircleOutlineIcon style={iconStyles} />}
                  onClick={props.openBreakModel}
                  style={{ backgroundColor: 'orange', marginBottom: '10px' }}
                >
                  Break
                </Button>
                : <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<PlayCircleOutlineIcon style={iconStyles} />}
                  onClick={props.handlestartfunction}
                  style={{ backgroundColor: 'green', marginBottom: '10px' }}
                >
                  At Desk
                </Button>

              )}


              {(clockInState.running || clockInState.seconds > 0
                ? <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<TimerOffRoundedIcon style={iconStyles} />}
                  onClick={props.openEndShiftModel}
                  style={{ backgroundColor: 'red' }}
                >
                  End Shift
                </Button>
                : null
              )}
            </Paper>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={4} style={{marginTop: '10px', fontSize:'14px'}}><b>Your Schedule:</b></Grid>
              <Grid item xs={8}>
                <Grid container style={{border:'1px solid #ededed'}}>
                  <Grid item xs={6}>
                    <div style={{backgroundColor:'#C4DFAA', fontSize: '14px'}}>
                      In
                    </div>
                    <div style={{padding: '3px',fontSize: '14px'}}>{!isEmpty(session.shift_time.shift_start) && session.shift_time.shift_start !== 'N/A' ? convertTimeTo12hr(session.shift_time.shift_start) : 'N/A'}</div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{backgroundColor:'#CDF0EA', fontSize: '14px'}}>
                      Out
                    </div>
                    <div style={{padding: '3px',fontSize: '14px'}}>{!isEmpty(session.shift_time.shift_end) && session.shift_time.shift_end !== 'N/A' ? convertTimeTo12hr(session.shift_time.shift_end) : 'N/A'}</div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <b style={{fontSize:'14px'}}>Working Days:</b>
              </Grid>
              <Grid item xs={8} style={{padding: '7px'}}>{(session.shift_time.shift_detail !== 'N/A') ? getActiveDays(session.shift_time.shift_detail) : Object.values(weekDays).map((day, i) => (<StyledChip size="small" color={(i > 0 && i < 6) ? 'bprimary' : 'bgrey'} label={day} style={{marginRight: '3px'}}/>))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id+'_h'}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isEmpty(rows) ? '' :
                    rows.map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code+'_r'}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            // default
                            let color = 'black';

                            if (value == 'On Break') {
                              color = 'orange';
                            } else if (value == 'End Timer') {
                              color = 'red';
                            } else if (value == 'At Desk') {
                              color = 'green';
                            }
                            else {
                              color = 'orange';
                            }
                            return (
                              <TableCell key={column.id+'rc'} align={column.align} style={{ color }} >
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <div>
        <Dialog
          open={props.openClockInBreakModel}
          onClose={props.closeBreakModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Select Break status'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Break status"
                  name="break_status"
                  onChange={handleBreakStatusFormChange}
                  value={breakStatusformState.values.break_status || ''}
                  error={hasError('break_status')}
                  helperText={hasError('break_status') ? breakStatusformState.errors.break_status[0] : null}
                  select
                  variant="outlined"
                  size="small"
                  style={{minWidth: '300px'}}
                >
                  <MenuItem key={'lunch'} value={'Lunch (1 hr)'}>{'Lunch (1 hr)'}</MenuItem>
                  <MenuItem key={'tea_break'} value={'Tea break (0.25 hr)'}>{'Tea break (0.25 hr)'}</MenuItem>
                  <MenuItem key={'other'} value={'Other'}>{'Other'}</MenuItem>
                </TextField>
              </Grid>
            </Grid>  
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                {(breakStatusformState.values.break_status === 'Other')?
                  <TextField
                    fullWidth
                    label="Custom Status"
                    name="custom_status"
                    onChange={handleBreakStatusFormChange}
                    value={breakStatusformState.values.custom_status || ''}
                    error={hasError('custom_status')}
                    helperText={hasError('custom_status') ? breakStatusformState.errors.custom_status[0] : null}
                    variant="outlined"
                    size="small"
                    style={{minWidth: '300px'}}
                  />
                  :''
                }
              </Grid>
            </Grid>  
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={props.closeBreakModel}   >
              Cancel
            </StyledButton>
            <StyledButton
              variant="contained"
              color="bprimary"
              autoFocus={true}
              disabled={!breakStatusformState.isValid}
              onClick={ handleSubmit }
            >
              Submit
            </StyledButton>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={props.openClockInEndShiftModel}
          onClose={props.closeEndShiftModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'End Shift'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {'Are you sure you want end shift'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={props.closeEndShiftModel}   >
              No
            </StyledButton>
            <StyledButton 
              variant="contained"
              color="bdanger"
              onClick={props.endShift}
              autoFocus={true}
            >
              Yes
            </StyledButton>
          </DialogActions>
        </Dialog>
      </div>
      
    </div>
  );
}

export default Stopwatch;
