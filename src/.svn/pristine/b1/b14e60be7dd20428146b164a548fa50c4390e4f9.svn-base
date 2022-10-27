import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components';
import moment from 'moment';
import {
  campaignSummaryFetch,
} from 'actions'
import {
  Header,
  ExtraFilters,
  ProductionUnits,
  ProductionHours,
  ProductiveEmployees,
  LoggedInEmployees,
  EmailTemplates,
  LoggedInEmployeesDetail,
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
  const dashboardCampaignState = useSelector(state => state.dashboardCampaignState);

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
    await dispatch(campaignSummaryFetch(extraFiltersState.values));
    setShowReport(true);
  }

  return (
    <Page
      className={classes.root}
      title="Campaign Dashboard"
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
            lg={7}
            xl={6}
            xs={12}
          >
            <EmailTemplates />
          </Grid>
          <Grid
            item
            lg={5}
            xl={6}
            xs={12}
          >
            <LoggedInEmployeesDetail />
          </Grid>
        </Grid>
        : ''}
    </Page>
  );
};

export default ApiReport;
