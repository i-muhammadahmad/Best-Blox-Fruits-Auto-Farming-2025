import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@material-ui/core';
import { CustomDataGrid } from 'components';
import { GridRequest, TubularHttpClientAbstract, TubularHttpClient, ShallowHttpClient } from "tubular-common"
import Columns from '../Columns';
import { GenericMoreButton, TableEditBar } from 'components';
import { API_URL } from 'configs'
import { getServerSideUserClockInImagesList } from 'actions'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

var token = localStorage.getItem("token");
const serversideRequest = new ShallowHttpClient(API_URL + "user_reports/getUserClockInImages",
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': 'Bearer ' + token
    },

  }
);

const Results = props => {
  const { className, userClockInImagesReportRecords, ...rest } = props;
  const classes = useStyles();

  var token = localStorage.getItem("token");
  const abcd = fetch(API_URL + "user_reports/getUserClockInImages", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': 'Bearer ' + token
    },

  });

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >

      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="User Clock In Images Report"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <CustomDataGrid
                columns={Columns}
                dataSource={serversideRequest}
                gridName="UserClockInGrid"
              />
            </div>
          </PerfectScrollbar>
        </CardContent>

      </Card>
      <TableEditBar selected={[]} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  userActivityTrackRecords: PropTypes.array.isRequired
};

Results.defaultProps = {
  userActivityTrackRecords: []
};

export default Results;
