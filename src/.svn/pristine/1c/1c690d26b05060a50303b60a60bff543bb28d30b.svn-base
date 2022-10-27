import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, StyledChip } from 'components';
import moment from 'moment';
import { Header, Results, ExtraFilters } from './components';

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

const ComplianceReportList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {
      date_column: 'date_created',
      from_date: moment(moment().toDate()).format('YYYY-MM-DD') + 'T00:00',
      to_date: moment(moment().toDate()).format('YYYY-MM-DD') + 'T23:59'
    },
    touched: {
      date_column: true,
      from_date: true,
      to_date: true
    },
    errors: {}
  });

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
    setRefershDataTable(true);
  }

  const actionsCol = value => {
    
  }

  const getCoursesStatus = value => {
    if (value.quiz_status === 'Passed') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bsuccess" label="Passed" />
        </div>
      )
    }
    else if (value.quiz_status === 'Pending') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bwarning" label="Pending" />
        </div>
      )
    }
  }
  
  return (
    <Page
      className={classes.root}
      title="Compliance Report"
    >
      <Header />
      {/*<ExtraFilters
        className={classes.extraFeilds}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        filterRecords={filterRecords}
      />*/}
      <Results 
        className={classes.results}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        extraFiltersState={extraFiltersState}
        getCoursesStatus={getCoursesStatus}
        actionsCol={actionsCol}
      />
      
    </Page>
  );
};

export default ComplianceReportList;
