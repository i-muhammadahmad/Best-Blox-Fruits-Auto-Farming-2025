import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components';
import moment from 'moment';
import { Header, Results, ExtraFilters } from './components';
import { getClientWiseHeadcountReport } from 'actions';
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


const CostCalculator = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [headcountReportList, setHeadcountReportList] = useState({
    'theader': [],
    'header': [],
    'rows': [],
    'footer': []
  });

  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const headcountReportState = useSelector(state => state.headcountReportState);

  useEffect(() => {
    let headcount_report_list = {
      'theader': [],
      'header': [],
      'rows': [],
      'footer': []
    };

    if (!isEmpty(headcountReportState.clientHeadcountReport)) {
      let at_list = headcountReportState.clientHeadcountReport;
      headcount_report_list = {
        'theader': at_list.theader,
        'header': at_list.header,
        'rows': at_list.rows,
        'footer': at_list.footer
      }
    }
    setHeadcountReportList(headcount_report_list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headcountReportState.clientHeadcountReport]);

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
    dispatch(getClientWiseHeadcountReport(extraFiltersState.values));
  }

  return (
    <Page
      className={classes.root}
      title="Client Headcount Report"
    >
      <Header />
      <ExtraFilters
        className={classes.extraFeilds}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        filterRecords={filterRecords}
      />
      <Results
        className={classes.results}
        theaderData={headcountReportList.theader}
        headerData={headcountReportList.header}
        rowsData={headcountReportList.rows}
        footerData={headcountReportList.footer}
      />

    </Page>
  );
};

export default CostCalculator;
