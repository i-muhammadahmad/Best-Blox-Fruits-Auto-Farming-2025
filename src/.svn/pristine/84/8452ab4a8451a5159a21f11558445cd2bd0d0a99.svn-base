import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, colors, Tooltip } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import { isEmpty } from 'lodash';
import { Label } from 'components';
import gradients from 'utils/gradients';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundImage: gradients.green,
    height: 48,
    width: 48
  }
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const ProductiveEmployees = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dashboardProductionState = useSelector(state => state.dashboardProductionState);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <BootstrapTooltip title="Employees who are logged in and logging their production">
        <div>
          <Typography
            component="h3"
            gutterBottom
            variant="overline"
          >
            Productive Employees
          </Typography>
          <div className={classes.details}>
            <Typography variant="h3">
              {!isEmpty(dashboardProductionState.clientProductionSummary) ?
                dashboardProductionState.clientProductionSummary.total_productive_employees
                : 0
              }
            </Typography>
          </div>
        </div>
      </BootstrapTooltip>  
      <Avatar className={classes.avatar}>
        <GroupIcon />
      </Avatar>
    </Card>
  );
};

ProductiveEmployees.propTypes = {
  className: PropTypes.string
};

export default ProductiveEmployees;
