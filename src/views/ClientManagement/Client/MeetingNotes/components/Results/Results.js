import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Grid
} from '@material-ui/core';
import { CustomDataGrid } from 'components';
import Columns from '../Columns';
import { GenericMoreButton, StyledButton, TableEditBar } from 'components';
import ServerSideRequest from 'utils/ServerSideRequest';
import { API_URL } from 'configs';
import {
  meetingNotesServerListSuccess,
  showCommonLoader,
  hideCommonLoader,
  tokenError,
  showGeneralError,
  showMeetingNoteAddForm
} from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { filter, isEmpty } from 'lodash';
import AccessRights from 'utils/AccessRights';

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
  const { className, refershDataTable, setRefershDataTable, actionsCol, extraFeilds, setFormAction, ...rest } = props;
  const dispatch = useDispatch();
  const session = useSelector(state => state.session);

  //finding meeting notes permissions against code
  const meeting_note_per = filter(session.user_permissions_raw, function (item) {
    if (!isEmpty(item.permission_object)) {
      return item.permission_object.object_code === 'meeting_notes';
    }
  });

  const call_backs = {
    'serverSideSuccess': () => { dispatch(meetingNotesServerListSuccess()); },
    'showLoding': () => { dispatch(showCommonLoader()); },
    'hideLoding': () => { dispatch(hideCommonLoader()); setRefershDataTable(false); },
    'tokenError': (errMsg) => { dispatch(tokenError(errMsg)) },
    'genralError': (errMsg) => { dispatch(showGeneralError(errMsg)) },
  }

  const server_side_request = new Request(API_URL + "meeting_notes/getAllServerSide", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem("token"),
      'Accept': 'application/json'
    }
  });

  const classes = useStyles();

  const handleAddBtnClick = () => {
    setFormAction('Add');
    dispatch(showMeetingNoteAddForm());
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          &nbsp;
        </Grid>
        <Grid item>
          {(AccessRights(meeting_note_per[0], 'add'))? 
            <StyledButton
              color="bsuccess"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => { handleAddBtnClick(); }}
            >

              Add Meeting Notes
            </StyledButton>
            : ''
          }
        </Grid>
      </Grid>
      <Card style={{ marginTop: '10px' }}>
        <CardHeader
          action={<GenericMoreButton />}
          title="Meeting Notes"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <CustomDataGrid
                columns={Columns}
                dataSource={
                  new ServerSideRequest(server_side_request, actionsCol, call_backs, extraFeilds)
                }
                gridName="MeetingNotesGrid"
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
