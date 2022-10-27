import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { CustomDataGrid } from 'components';
import Columns from '../Columns';
import ServerSideRequest from 'utils/ServerSideRequest';
import { API_URL } from 'configs';
import {
  assetApprovalsServerListSuccess,
  showCommonLoader,
  hideCommonLoader,
  tokenError,
  showGeneralError
} from 'actions';
import { useDispatch } from 'react-redux';
import { isEmpty, forEach } from 'lodash';

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
  const { className, refershDataTable, setRefershDataTable, actionsCol, getCheckBoxCol, ...rest } = props;
  const dispatch = useDispatch();

  //handle custom response for employees
  const handleApprovalNotificationSuccessResponse = (responseObject) => {

    if (
      !isEmpty(responseObject)
      && !isEmpty(responseObject.payload)
      && (typeof actionsCol === 'function')
    ) {
      forEach(responseObject.payload, function (value, key) {
        // appling action in try-catch block. so if any error occure it will not effect table rendring
        try {
          responseObject.payload[key]['Actions'] = actionsCol(value);
          responseObject.payload[key]['chechbox_col'] = getCheckBoxCol(value);
        }
        catch (e) {
          console.error(e);
        }
      });
    }

    return responseObject;
  }

  const call_backs = {
    'serverSideSuccess': () => { dispatch(assetApprovalsServerListSuccess()); },
    'showLoding': () => { dispatch(showCommonLoader()); },
    'hideLoding': () => { dispatch(hideCommonLoader()); setRefershDataTable(false); },
    'tokenError': (errMsg) => { dispatch(tokenError(errMsg)) },
    'genralError': (errMsg) => { dispatch(showGeneralError(errMsg)) },
    'customResponse': (responseObject) => { return handleApprovalNotificationSuccessResponse(responseObject) }
  }

  const server_side_request = new Request(API_URL + "asset_approval_notifications/getAllServerSide", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Accept': 'application/json'
    }
  });

  const classes = useStyles();

  return (

    <div className={classes.inner}>

      <CustomDataGrid
        columns={Columns}
        dataSource={
          new ServerSideRequest(server_side_request, actionsCol, call_backs)
        }
        gridName="AssetApprovalsNotificationsGrid"
      />
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
