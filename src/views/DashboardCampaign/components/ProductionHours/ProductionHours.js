import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, colors, Tooltip } from '@material-ui/core';
import SpeedIcon from '@material-ui/icons/Speed';
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
    backgroundImage: gradients.blue,
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

const ProductionHours = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dashboardCampaignState = useSelector(state => state.dashboardCampaignState);

  /*const getColor = () => {
    if (!isEmpty(dashboardCampaignState.appUsageSummary)) {
      let api_calls_per = dashboardCampaignState.appUsageSummary.api_calls_per
      if (api_calls_per < 80) {
        return colors.green[600]
      }
      else if (api_calls_per >= 80 && api_calls_per < 95) {
        return colors.orange[600];
      }
    }

    return colors.red[600];
  }*/

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <BootstrapTooltip title="Showing the sum of activites processing time">
        <div>
          <Typography
            component="h3"
            gutterBottom
            variant="overline"
          >
            Total Production (Hours)
          </Typography>
          <div className={classes.details}>
            <Typography variant="h3">
              {!isEmpty(dashboardCampaignState.campaignSummary) ?
                dashboardCampaignState.campaignSummary.total_production
                : 0
              }
            </Typography>
            {/*<Label
              className={classes.label}
              color={getColor()}
              variant="outlined"
            >
              {!isEmpty(apiReportState.appUsageSummary) ? apiReportState.appUsageSummary.api_calls_per : 0}
            </Label>*/}
          </div>
        </div>
      </BootstrapTooltip>  
      <Avatar className={classes.avatar}>
        <SpeedIcon />
      </Avatar>
    </Card>
  );
};

ProductionHours.propTypes = {
  className: PropTypes.string
};

export default ProductionHours;
