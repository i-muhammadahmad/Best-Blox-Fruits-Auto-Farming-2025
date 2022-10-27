import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, colors } from '@material-ui/core';
import { isEmpty } from 'lodash';
import { Chart } from "react-google-charts";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  details: {
    display: 'flex',
  },
  label: {
    marginLeft: theme.spacing(1)
  },
}));

const ClientProductionByActivity = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [chartData, setChartData] = useState([]);
  const dashboardProductionState = useSelector(state => state.dashboardProductionState);

  useEffect(() => {
    //if(!isEmpty(dashboardProductionState.clientProductionSummary) && !isEmpty(dashboardProductionState.clientProductionSummary.productivity_by_activity_employee) ){
      setChartData(dashboardProductionState.clientProductionSummary.productivity_by_activity_employee);
    //}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardProductionState.clientProductionSummary]);


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
        >
          Production Summary
        </Typography>
        <div className={classes.details}>
          {(!isEmpty(chartData)) ?
            <Chart
              width={"100%"}
              height={'600px'}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                isStacked: true,
                title: 'Productivity - Activity Wise - In terms of avtivities performed',
                hAxis: { title: 'Activities', titleTextStyle: { color: '#333' } },
                vAxis: { title: 'Employees - Activities', minValue: 0 },
                chartArea: { width: '60%', height: '70%' },
              }}
            />
            : ''
          }
        </div>
      </div>
    </Card>
  );
};

ClientProductionByActivity.propTypes = {
  className: PropTypes.string
};

export default ClientProductionByActivity;
