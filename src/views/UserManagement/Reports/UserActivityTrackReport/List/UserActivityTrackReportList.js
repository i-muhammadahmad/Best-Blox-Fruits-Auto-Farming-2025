import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components';
import { Header, Results, ExtraFilters } from './components';
import { forEach, isEmpty } from 'lodash';
import moment from 'moment';

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

const UserActivityTrackList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [loadDataTable, setLoadDataTable] = useState(false);
  const [extraFiltersState, setExtraFiltersState] = useState({
    date_column: 'performed_at',
    from_date: moment(moment().toDate()).format('YYYY-MM-DD') + 'T00:00',
    to_date: moment(moment().toDate()).format('YYYY-MM-DD') + 'T23:59'
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
    setLoadDataTable(true);
  }

  return (
    <Page
      className={classes.root}
      title="User Activity Track Report"
    >
      <Header />
      <ExtraFilters
        className={classes.extraFeilds}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        filterRecords={filterRecords}
      />
      {(!isEmpty(extraFiltersState.user_id) && loadDataTable)?
        <Results
          className={classes.results}
          refershDataTable={refershDataTable}
          setRefershDataTable={setRefershDataTable}
          extraFiltersState={extraFiltersState}
        />
        : ''}
    </Page>
  );
};

export default UserActivityTrackList;
