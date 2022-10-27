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

const ClientActivityPieChart = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [chartData, setChartData] = useState([]);
  const dashboardProductionState = useSelector(state => state.dashboardProductionState);

  useEffect(() => {
    //if(!isEmpty(dashboardProductionState.clientProductionSummary) && !isEmpty(dashboardProductionState.clientProductionSummary.productivity_by_client_activity) ){
      
      let c_data = [["Activity","Hours"], ...dashboardProductionState.clientProductionSummary.productivity_by_client_activity];
      setChartData(c_data);
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
          Client Production Summary
        </Typography>
        <div className={classes.details}>
          {(!isEmpty(chartData)) ?
            <Chart
              width={"100%"}
              height={'400px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={chartData}
              options={{
                is3D: true,
                title: 'Client Production Summary',
                
              }}
            />
            : ''
          }
        </div>
      </div>
    </Card>
  );
};

ClientActivityPieChart.propTypes = {
  className: PropTypes.string
};

export default ClientActivityPieChart;
