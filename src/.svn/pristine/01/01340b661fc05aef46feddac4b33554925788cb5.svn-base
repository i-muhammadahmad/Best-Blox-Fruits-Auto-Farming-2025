import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { StyledFab, StyledChip } from 'components';
import {
  Results,
  ExtraFilters,
} from './components';
import {
  getAssetsById
} from 'actions';
import { forEach, join, isEmpty, find } from 'lodash';
import VisibilityIcon from '@material-ui/icons/Visibility';
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

const DetailReportByEmployee = props => {
  const { displayView, setDisplayView, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [showFirstTimeReport, setShowFirstTimeReport] = useState(false);
  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {
      date_column: 'date_created',
      from_date: moment(moment().toDate()).format('YYYY-MM-DD') + 'T00:00',
      to_date: moment(moment().toDate()).format('YYYY-MM-DD') + 'T23:59',
      is_date_filter: false
    },
    touched: {
      date_column: true,
      from_date: true,
      to_date: true,
      is_date_filter: true
    },
    errors: {}
  });

  const session = useSelector(state => state.session);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActions = value => { 
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(session.current_page_permissions.rights_view == '1') ?
          <><StyledFab
            color="bwarning"
            aria-label="View"
            size="small"
            onClick={() => viewRecord(value.id)}
          >
            <VisibilityIcon />
          </StyledFab>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
          : ''
        }
      </div>
    )
  }

  const viewRecord = (id) => {
    dispatch(getAssetsById(id, 'report'))
    setDisplayView(true);
  }

  const filterRecords = () => {
    setRefershDataTable(true);
    setShowFirstTimeReport(true);
  }

  const getEmployeeStatus = value => {
    if (value.employee_status === 'Active') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bsuccess" label="Active" />
        </div>
      )
    }
    else if (value.employee_status === 'Separated') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bwarning" label="Separated" />
        </div>
      )
    }
    else{
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
        </div>
      )
    }
  }

  return (
    <div>
      <ExtraFilters
        className={classes.extraFeilds}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        filterRecords={filterRecords}
      /> 
      {(showFirstTimeReport)?
        <Results
          className={classes.results}
          refershDataTable={refershDataTable}
          setRefershDataTable={setRefershDataTable}
          extraFiltersState={extraFiltersState.values}
          actionsCol={getActions}
          getEmployeeStatus={getEmployeeStatus}
        />
        :''
      }
    </div>
  );
};

export default DetailReportByEmployee;
