import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { isEmpty } from 'lodash';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { withStyles } from '@material-ui/styles';
import { yellow } from '@material-ui/core/colors';
import UserTimeLineComponent from '../UserTimeLineComponent';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 15
  },
  table: {
    minWidth: 700,
    borderCollapse: 'collapse'
  },
  tableCol: {
    border: '1px solid #eeeeee',
    borderCollapse: 'collapse',
    lineHeight: '1',
    padding: '2px'
  },
  textCol: {
    fontSize: '10px'
  },
  tableVerticalCol: {
    border: '1px solid #eeeeee',
    borderCollapse: 'collapse',
    lineHeight: '50px',
    padding: '10px',
    width: '6px',
    height: '62px'
  },
  textVerticalltCol: {
    transform: 'rotate(270deg)',
    fontSize: '10px',
    whiteSpace: 'nowrap',
    width: '0px',
    position: 'absolute'
  },
  tableContainer: {
    maxHeight: 440
  },
  stickyCol: {
    position: '-webkit-sticky',
    position: 'sticky',
    left: '0'
  },
}));
const YellowSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: yellow[600]
    },
    "&$checked + $track": {
      backgroundColor: yellow[600]
    }
  },
  checked: {},
  track: {}
})(Switch);

const Results = props => {
  const { className, userClockRecords, tIntervals, highlightShift, setHighlightShift,imageViewOnClick,  ...rest } = props;
  const classes = useStyles();

  const handleHighlightShiftChange = e => {
    setHighlightShift(e.target.checked);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"></Typography>
      <Card>
        <CardHeader
          title="VIEW Report"
          action={
            <FormControlLabel
              control={
                <YellowSwitch
                  checkedIcon={<WbIncandescentIcon style={{transform:"rotate(180deg)",position:"relative",bottom:"7px",fontSize:"1.7rem"}}/>}
                  checked={highlightShift}
                  onChange={handleHighlightShiftChange}
                  name="chkHighlightShift"
                  color="primary"
                />
              }
              label="Highlight Shift"
            />
          }
        />
        <Divider />
        <CardContent className={classes.content}>
          {!isEmpty(userClockRecords) ? (
            <TableContainer
              className={classes.tableContainer}
              component={Paper}>
              <Table
                stickyHeader
                className={classes.table}
                size="small"
                aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.stickyCol}></TableCell>
                    {tIntervals.map((timeInterval, key) => (
                      <TableCell
                        className={classes.tableVerticalCol}
                        key={'h' + key}>
                        <p className={classes.textVerticalltCol}>
                          {timeInterval.interval_str}
                        </p>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userClockRecords.map((userRecord, id) => (
                    <TableRow key={'b_' + id}>
                      {/* {userRecord.user_timeline_html} */}
                      <UserTimeLineComponent
                        userTimeline={userRecord}
                        tIntervals={tIntervals}
                        imageViewOnClick={imageViewOnClick}
                        highlightShift={highlightShift}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            ''
          )}
        </CardContent>
      </Card>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  userClockRecords: PropTypes.array.isRequired
};

Results.defaultProps = {
  userClockRecords: []
};

export default Results;
