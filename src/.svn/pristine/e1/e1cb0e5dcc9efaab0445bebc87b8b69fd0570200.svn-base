import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components';
import moment from 'moment';
import { Header, Results, ExtraFilters } from './components';
import { getFloorPlan } from 'actions';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  extraFeilds: {
    marginTop: theme.spacing(3)
  }
}));

const FloorPlan = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [floorPlan, setFloorPlan] = useState('');
  

  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const floorPlanState = useSelector(state => state.floorPlanState);

  useEffect(() => {
    setFloorPlan(floorPlanState.floorPlan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floorPlanState.floorPlan]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterRecords = () => {
    dispatch(getFloorPlan(extraFiltersState.values));
  };

  return (
    <Page className={classes.root} title="Floor Plan">
      <Header />
      <ExtraFilters
        className={classes.extraFeilds}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        filterRecords={filterRecords}
      />
      <Results 
        className={classes.results}
        floorPlan={floorPlan}
      />
    </Page>
  );
};

export default FloorPlan;
