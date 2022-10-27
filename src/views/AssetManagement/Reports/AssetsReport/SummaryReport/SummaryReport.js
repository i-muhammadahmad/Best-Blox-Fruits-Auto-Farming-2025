import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { StyledFab } from 'components';
import {
  Results,
  ExtraFilters,
} from './components';
import {
  getAssetsSummaryReportList,
} from 'actions';
import { forEach, join, isEmpty, find } from 'lodash'
import VisibilityIcon from '@material-ui/icons/Visibility'

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

const SummaryReport = props => {
  const { displayView, setDisplayView, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [assetsSummaryReportRecords, setAssetsSummaryReportRecords] = useState([]);
  const [officesRecords, setOfficesRecords] = useState([]);
  const [extraFiltersState, setExtraFiltersState] = useState({});

  const AssetsReportState = useSelector(state => state.AssetsReportState);
  const session = useSelector(state => state.session);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getAssetsSummaryReportList(extraFiltersState))
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAssetsSummaryReportRecords(Object.values(AssetsReportState.assetsSummaryReportList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AssetsReportState.assetsSummaryReportList]);

  useEffect(() => {
    setOfficesRecords(Object.values(AssetsReportState.officesList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AssetsReportState.officesList]);

  const filterRecords = () => {
    dispatch(getAssetsSummaryReportList(extraFiltersState))
  }

  return (
    <div>
      <ExtraFilters
        className={classes.extraFeilds}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        filterRecords={filterRecords}
      /> 
      {assetsSummaryReportRecords && (
        <Results
          className={classes.results}
          assetsSummaryReportRecords={assetsSummaryReportRecords}
          officesRecords={officesRecords}
        />
      )}
        

    </div>
  );
};

export default SummaryReport;
