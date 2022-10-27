import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  TableRow,
  TableCell
} from '@material-ui/core';
import { isEmpty, find } from 'lodash';
import FlagIcon from '@material-ui/icons/Flag';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3)
  },
  inner: {
    minWidth: 700
  },
  tableCol: {
    border: '1px solid #eeeeee',
    borderCollapse: 'collapse',
    lineHeight: '1',
    padding: '2px'
  },
  textCol: {
    fontSize: '10px',
  },
  textVerticalltCol: {
    textAlign: 'center',
    transform: 'rotate(270deg)',
    fontSize: '10px',
    whiteSpace: 'nowrap'
  },
  stickyCol: {
    position: '-webkit-sticky',
    position: 'sticky',
    backgroundColor: 'white',
    left: '0'
  }
}));

const UserTimeLineComponent = props => {
  const { userTimeline, tIntervals, imageViewOnClick, highlightShift, ...rest } = props;
  const classes = useStyles();
  
  const isRedFlag = (clock_in_images_org, timeInterval) => {
    if (!isEmpty(clock_in_images_org) && !isEmpty(clock_in_images_org['red'])) {
      if (!isEmpty(clock_in_images_org['red'][timeInterval])) {
        return true;
      }
    }
    return false;
  }

  const isOrangeFlag = (clock_in_images_org, timeInterval) => {
    if (!isEmpty(clock_in_images_org) && !isEmpty(clock_in_images_org['orange'])) {
      if (!isEmpty(clock_in_images_org['orange'][timeInterval])) {
        return true;
      }
    }
    return false;
  }

  const isYellowFlag = (clock_in_images_org, timeInterval) => {
    if (!isEmpty(clock_in_images_org) && !isEmpty(clock_in_images_org['yellow'])) {
      if (!isEmpty(clock_in_images_org['yellow'][timeInterval])) {
        return true;
      }
    }
    return false;
  }

  const isGreenFlag = (clock_in_images_org, timeInterval) => {
    if (!isEmpty(clock_in_images_org) && !isEmpty(clock_in_images_org['green'])) {
      if (!isEmpty(clock_in_images_org['green'][timeInterval])) {
        return true;
      }
    }
    return false;
  }

  const getFlags = (timeInterval) => {
    if (isRedFlag(userTimeline.clock_in_images_org, timeInterval.interval)) {
      return (
        <span className={classes.textCol} style={{ color: '#dc3545' }}>
          <FlagIcon
            onClick={() => imageViewOnClick(userTimeline, timeInterval.interval)}
          />
        </span>
      );
    }
    else if (isOrangeFlag(userTimeline.clock_in_images_org, timeInterval.interval)) {
      return (
        <span className={classes.textCol} style={{ color: '#ff6600' }}>
          <FlagIcon
            onClick={() => imageViewOnClick(userTimeline, timeInterval.interval)}
          />
        </span>
      );
    }
    else if (isYellowFlag(userTimeline.clock_in_images_org, timeInterval.interval)) {
      return (
        <span className={classes.textCol} style={{ color: '#fff200' }}>
          <FlagIcon
            onClick={() => imageViewOnClick(userTimeline, timeInterval.interval)}
          />
        </span>
      );
    }
    else if (isGreenFlag(userTimeline.clock_in_images_org, timeInterval.interval)) {
      return (
        <span className={classes.textCol} style={{ color: '#28a745' }}>
          <FlagIcon
            onClick={() => imageViewOnClick(userTimeline, timeInterval.interval)}
          />
        </span>
      );
    }
    else {
      return (
        <span className={classes.textCol} >
        </span>
      );
    }
  }

  const getEmployeeName = value => {
    if (!isEmpty(value.employee)) {
      return (
        <span className={classes.textCol}>{value.employee.firstname + ' ' + value.employee.middlename + ' ' + value.employee.lastname}</span>
      );
    }
    else {
      return (
        <span className={classes.textCol}></span>
      );
    }
  }

  const getShiftHighlight = (shiftTime, curTimeInterval) => {
    if (!isEmpty(shiftTime)){
      let {start_time, end_time} = shiftTime;
      let {interval, interval_str} = curTimeInterval;
      let format = "HH:mm:ss";
      let convertedTime = moment(interval_str, 'hh:mm A').format(format)
      if(moment(convertedTime,format).isSameOrAfter(moment(start_time,format)) && 
      moment(convertedTime,format).isSameOrBefore(moment(end_time,format))){
        return(true);
      }
      else
      {
        return(false);
      }
      
    }
    else{
      return(false);
    }
  }

  return (

    <>
      <TableCell className={classes.stickyCol} style={{ whiteSpace: 'nowrap' }} >{getEmployeeName(userTimeline)}</TableCell>
      {tIntervals.map((timeInterval, key) => (
        <TableCell 
          key={key} 
          className={classes.tableCol} 
          style={{backgroundColor: highlightShift && getShiftHighlight(userTimeline.shift, timeInterval) ? "#f3f388" : ""}}
        >
          {getFlags(timeInterval)}
        </TableCell>
      ))}
    </>
  )
}
export default UserTimeLineComponent;    
