import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components';
import moment from 'moment';
import { Header, Results, ExtraFilters } from './components';
import { getSeatsUtilizationReport } from 'actions';
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

const SeatUtilizationReport = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [seatsUtilizationReportList, setSeatsUtilizationReportList] = useState([]);
  const [officeDataList, setOfficeDataList] = useState([]);
  const [totalSeats, setTotalseats] = useState('');

  

  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const headcountReportState = useSelector(state => state.headcountReportState);

  useEffect(() => {
    dispatch(getSeatsUtilizationReport());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(!isEmpty(headcountReportState.seatsUtilizationReport)){
      setSeatsUtilizationReportList(headcountReportState.seatsUtilizationReport.main_data);
      setOfficeDataList(headcountReportState.seatsUtilizationReport.office_data)
      setTotalseats(headcountReportState.seatsUtilizationReport.total_seats)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headcountReportState.seatsUtilizationReport]);

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
    dispatch(getSeatsUtilizationReport(extraFiltersState.values));
  };


  return (
    <Page className={classes.root} title="Seats Utilization Report">
      <Header />
      <ExtraFilters
        className={classes.extraFeilds}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        filterRecords={filterRecords}
        officeDataList={officeDataList}
        totalSeats={totalSeats}
      />
      <Results
        className={classes.results}
        seatsData={seatsUtilizationReportList}
      />
      
    </Page>
  );
};

export default SeatUtilizationReport;
