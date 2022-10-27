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
  Typography,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { CustomDataGrid } from 'components';
import Columns from '../Columns';
import { GenericMoreButton, TableEditBar } from 'components';
import ServerSideRequest from 'utils/ServerSideRequest';
import { API_URL } from 'configs';
import {
  bulkActivitySetupServerListSuccess,
  showCommonLoader,
  hideCommonLoader,
  tokenError,
  showGeneralError
} from 'actions';
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

const useRadioStyles = makeStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.bprimary.main,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.bprimary.main,
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));

const Results = props => {
  const { 
    className, 
    refershDataTable, 
    setRefershDataTable, 
    actionsCol, 
    getPassingScoreHTML, 
    getUnitProcessingTimeHTML, 
    setExtraFiltersState, 
    extraFiltersState, 
    getDeletedStatus,
    ...rest 
  } = props;

  const dispatch = useDispatch();
  const classes = useStyles();
  const radio_classes = useRadioStyles();
  const session = useSelector(state => state.session);

  //handle custom response for quizes
  const handleBulkActivitySetupSuccessResponse = (responseObject) => {

    if (
      !isEmpty(responseObject)
      && !isEmpty(responseObject.payload)
      && (typeof actionsCol === 'function')
    ) {
      forEach(responseObject.payload, function (value, key) {
        // appling action in try-catch block. so if any error occure it will not effect table rendring
        try {
          responseObject.payload[key]['Actions'] = actionsCol(value);
          responseObject.payload[key]['deleted_status'] = getDeletedStatus(value);
        }
        catch (e) {
          console.error(e);
        }
      });
    }

    return responseObject;
  }

  const call_backs = {
    'serverSideSuccess': () => { dispatch(bulkActivitySetupServerListSuccess()); },
    'showLoding': () => { dispatch(showCommonLoader()); },
    'hideLoding': () => { dispatch(hideCommonLoader()); setRefershDataTable(false); },
    'tokenError': (errMsg) => { dispatch(tokenError(errMsg)) },
    'genralError': (errMsg) => { dispatch(showGeneralError(errMsg)) },
    'customResponse': (responseObject) => { return handleBulkActivitySetupSuccessResponse(responseObject) }
  }

  const server_side_request = new Request(API_URL + "bulk_activity_setup/getAllServerSide", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Accept': 'application/json'
    }
  });

  const handleChange = async (event) => {
    event.persist();

    await setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...extraFiltersState.touched,
        [event.target.name]: true
      }
    }));
    setRefershDataTable(true);
  }

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
          title={
            <>All Activities Import Setup
              {(session.current_page_permissions.rights_view_deleted == 1)?
                <FormControlLabel
                  style={{marginLeft: '10px'}}
                  control={
                    <Switch
                      value={extraFiltersState.values.show_deleted}
                      onChange={handleChange}
                      name="show_deleted"
                      color="primary"
                      classes={{
                        root: radio_classes.root,
                        switchBase: radio_classes.switchBase,
                        thumb: radio_classes.thumb,
                        track: radio_classes.track,
                        checked: radio_classes.checked,
                      }}
                    />
                  }
                  label="Show Deleted"
                />
                :""
              }  
            </>    
          }
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
                gridName="BulkActivitySetupGrid"
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
