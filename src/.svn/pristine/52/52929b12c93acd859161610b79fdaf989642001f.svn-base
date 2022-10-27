import React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
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
import Columns from '../Columns';
import { GenericMoreButton, TableEditBar } from 'components';
import ServerSideRequest from 'utils/ServerSideRequest';
import { API_URL } from 'configs';
import {
  activityCategoryServerListSuccess,
  showCommonLoader,
  hideCommonLoader,
  tokenError,
  showGeneralError
} from 'actions';

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


const Results = props => {
  const { className, actionsCol, refershDataTable, setRefershDataTable, extraFiltersState, ...rest } = props;

  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  const call_backs = {
    'serverSideSuccess': () => { dispatch(activityCategoryServerListSuccess()); },
    'showLoding': () => { dispatch(showCommonLoader()); },
    'hideLoding': () => { dispatch(hideCommonLoader()); setRefershDataTable(false); },
    'tokenError': (errMsg) => { dispatch(tokenError(errMsg)) },
    'genralError': (errMsg) => { dispatch(showGeneralError(errMsg)) }
  }

  const server_side_request = new Request(API_URL + "activity_reports/getAuditActivitiesServerSide", {
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
        <CardHeader
          action={<GenericMoreButton />}
          title="Audit Reviews"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <CustomDataGrid
                columns={Columns}
                dataSource={
                  new ServerSideRequest(server_side_request, actionsCol, call_backs, extraFiltersState.values, session.current_page_permissions.object_id)
                }
                gridName="AuditReviewGrid"
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

export default React.memo(Results, areEqual);
