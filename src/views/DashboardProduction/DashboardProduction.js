import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components';
import moment from 'moment';
import {
  clientProductionSummaryFetch,
} from 'actions'
import {
  Header,
  ExtraFilters,
  ClientProductionChart,
  ClientProductionByTimeChart,
  ProductionUnits,
  ProductionHours,
  ProductiveEmployees,
  LoggedInEmployees,
  ClientProductionByActivity,
  ClientProductionByActivityTimeChart,
  ClientActivityPieChart
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const ApiReport = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showReport, setShowReport] = useState(false);
  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {
      from_date: moment(moment().toDate()).format('YYYY-MM-DD'),
    },
    touched: {
      from_date: true,
    },
    errors: {}
  });
  const dashboardProductionState = useSelector(state => state.dashboardProductionState);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const filterRecords = async () => {
    await dispatch(clientProductionSummaryFetch(extraFiltersState.values));
    setShowReport(true);
  }

  return (
    <Page
      className={classes.root}
      title="Production Dashboard"
    >
      <Header />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid item sm={12} xs={12}>
          <ExtraFilters
            className={classes.extraFeilds}
            extraFiltersState={extraFiltersState}
            setExtraFiltersState={setExtraFiltersState}
            filterRecords={filterRecords}
          />
        </Grid>
      </Grid>
      
      {(showReport === true) ?
        <Grid
          className={classes.container}
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            {<ProductionUnits />}
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            {<ProductionHours />}
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            {<ProductiveEmployees />}
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xs={12}
          >
            {<LoggedInEmployees />}
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xs={12}
          >
            {<ClientProductionChart />}
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xs={12}
          >
            {<ClientProductionByTimeChart />}
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
          >
            {<ClientActivityPieChart />}
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
          >
            {<ClientProductionByActivity />}
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
          >
            {<ClientProductionByActivityTimeChart />}
          </Grid>
        </Grid>
        : ''}
    </Page>
  );
};

export default ApiReport;
