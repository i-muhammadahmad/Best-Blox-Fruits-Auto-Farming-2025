import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import getInitials from 'utils/getInitials';
import { Label, GenericMoreButton } from 'components';
import { isEmpty } from 'lodash';
import { API_URL } from 'configs';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    // minWidth: 900
  },
  author: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  tags: {
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  }
}));

const LoggedInEmployeesDetail = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dashboardCampaignState = useSelector(state => state.dashboardCampaignState);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Logged In Employees"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar options={{ suppressScrollY: true }}>
          <div className={classes.inner} style={{maxHeight: 400, overflowY: 'scroll'}}>
            <Table>
              <TableBody>
                {!isEmpty(dashboardCampaignState.campaignSummary) ? 
                dashboardCampaignState.campaignSummary.logged_in_users.map(user => (
                  <TableRow
                    hover
                    key={user.id}
                  >
                    <TableCell>
                      <div className={classes.author}>
                        <Avatar
                          alt="Author"
                          className={classes.avatar}
                          src={API_URL + 'storage/media/Employees/' + user.profile_pic}
                        >
                          {getInitials(user.firstname)}
                        </Avatar>
                        {user.firstname +' '+ user.middlename +' '+ user.lastname}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                )) : ''}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

LoggedInEmployeesDetail.propTypes = {
  className: PropTypes.string
};

export default LoggedInEmployeesDetail;
