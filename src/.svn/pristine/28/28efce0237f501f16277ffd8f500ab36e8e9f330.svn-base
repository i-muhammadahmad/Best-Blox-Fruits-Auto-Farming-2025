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
import JobDetailsColumns from '../JobDetailsColumns';
import { GenericMoreButton, TableEditBar } from 'components';
import ServerSideRequest from 'utils/ServerSideRequest';
import { API_URL } from 'configs';
import {
  showCommonLoader,
  hideCommonLoader,
  tokenError,
  showGeneralError
} from 'actions';
import { useDispatch } from 'react-redux';

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


const JobDetailsResults = props => {
  const { className, refershDataTable, setRefershDataTable, actionsCol, extraFilters, ...rest } = props;
  const dispatch = useDispatch();

  const call_backs = {
    'serverSideSuccess': () => { /* nothing to do */ },
    'showLoding': () => { dispatch(showCommonLoader()); },
    'hideLoding': () => { dispatch(hideCommonLoader()); setRefershDataTable(false); },
    'tokenError': (errMsg) => { dispatch(tokenError(errMsg)) },
    'genralError': (errMsg) => { dispatch(showGeneralError(errMsg)) },
  }

  const server_side_request = new Request(API_URL + "transcribe_job/getAllJobDetailsServerSide", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Accept': 'application/json'
    }
  });

  const classes = useStyles();

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
        <CardHeader title="Transcribe Job Details View" />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <CustomDataGrid
                columns={JobDetailsColumns}
                dataSource={
                  new ServerSideRequest(server_side_request, actionsCol, call_backs, extraFilters)
                }
                gridName="TranscribeJobDetailViewGrid"
              />
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  /* 
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return !nextProps.refershDataTable;
}

export default React.memo(JobDetailsResults, areEqual);
