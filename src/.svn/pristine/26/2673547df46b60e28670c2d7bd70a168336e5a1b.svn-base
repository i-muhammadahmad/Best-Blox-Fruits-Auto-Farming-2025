import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Popover,
  CardHeader,
  CardActions,
  Divider,
  Button,
  colors
} from '@material-ui/core';
import Stopwatch from './Stopwatch';
import { getClockInSummary } from 'actions';

const useStyles = makeStyles(() => ({
  root: {
    width: 350,
    maxWidth: '100%'
  },
  actions: {
    backgroundColor: colors.grey[50],
    justifyContent: 'center'
  }
}));

const ClockInOutPopover = props => {
  const {
    notifications,
    anchorEl,
    startfunction,
    stopfunction,
    resetfunction,
    ...rest
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openClockInBreakModel, setOpenClockInBreakModel] = React.useState(false);
  const [openClockInEndShiftModel, setOpenClockInEndShiftModel] = React.useState(false);

  const openBreakModel = () => {
    setOpenClockInBreakModel(true);
  }

  const closeBreakModel = () => {
    setOpenClockInBreakModel(false);
  }

  const openEndShiftModel = () => {
    setOpenClockInEndShiftModel(true);
  }

  const closeEndShiftModel = () => {
    setOpenClockInEndShiftModel(false);
  }

  const endShift = async () => {
    await resetfunction();
    await closeEndShiftModel();
    setTimeout(function () {
      dispatch(getClockInSummary());
    }, 500);
    
  }

  return (
    <Popover
      {...rest}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
    >
      <div className={classes.root}>
        <CardHeader title="Clock In/Out" />
          <Divider />
            <Stopwatch
              handlestartfunction={startfunction}
              handlestopfunction={stopfunction}
              handleresetfunction={resetfunction}
              openBreakModel={openBreakModel}
              closeBreakModel={closeBreakModel}
              openClockInBreakModel={openClockInBreakModel}
              openEndShiftModel={openEndShiftModel}
              closeEndShiftModel={closeEndShiftModel}
              openClockInEndShiftModel={openClockInEndShiftModel}
              endShift={endShift}
            />
          <Divider />
        <CardActions className={classes.actions}>

        </CardActions>
      </div>
    </Popover>
  );
};

export default ClockInOutPopover;
