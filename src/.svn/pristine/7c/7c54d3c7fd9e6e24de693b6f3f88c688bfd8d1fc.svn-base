import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Box,
  MenuItem
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import {
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete
} from '@material-ui/lab';
import { getUserClockInChartsReport } from 'actions';
import { StyledButton } from 'components';
import SearchIcon from '@material-ui/icons/Search';
import { map, isEmpty } from 'lodash';
import moment from 'moment';
import { UserDropdown } from 'commonDropdowns';

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3)
  },
  inner: {
    minWidth: 700
  }
}));

const ExtraFilters = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const userReportState = useSelector(state => state.userReportState);
  const [UsersValue, setUsersValue] = useState([]);
  const [extraFiltersState, setExtraFiltersState] = useState({
    date_column: 'date_created',
    date_value: moment(moment().toDate()).format('YYYY-MM-DD')
  });

  useEffect(() => {
    if (userReportState.is_flag_cleared === true) {
      filterRecords();
    }
  }, [userReportState.is_flag_cleared]);

  const handleDateColumnChange = (event, value) => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      date_column: value
    }));
  };

  const handleDateChange = event => {
    event.persist();
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      date_value: event.target.value
    }));
  };

  const handleFlagTypeChange = event => {
    event.persist();
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      flag_type: event.target.value
    }));
  };

  const userOnChange = (event, newValue) => {
    if (newValue) {
      setUsersValue(newValue);
      let user_ids = map(newValue, 'id');
      setUserIds(user_ids);
    } else {
      setUsersValue(newValue);
      let user_ids = map(newValue, 'id');
      setUserIds(user_ids);
    }
  };

  const setUserIds = user_ids => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      user_ids: user_ids
    }));
  };

  const filterRecords = () => {
    dispatch(getUserClockInChartsReport(extraFiltersState));
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardHeader title="Report Filters" />
        <Divider />
        <CardContent className={classes.content}>
          <div className={classes.inner}>
            <Grid
              container
              spacing={3}
              style={{ display: 'none' }}
              direction="column">
              <Grid item xs={12} sm={6}>
                <ToggleButtonGroup
                  size="small"
                  exclusive
                  value={extraFiltersState.date_column}
                  onChange={handleDateColumnChange}>
                  <ToggleButton value="date_created">
                    <CheckIcon fontSize="small" />
                    Date Created
                  </ToggleButton>
                  <ToggleButton value="date_last_modified">
                    <CheckIcon fontSize="small" />
                    Date Last Modified
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date_value"
                  onChange={handleDateChange}
                  value={extraFiltersState.date_value || ''}
                  type="date"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  id="flag_type"
                  name="flag_type"
                  select
                  label="Flag Type"
                  onChange={handleFlagTypeChange}
                  value={extraFiltersState.flag_type || ''}
                  style={{ width: '100%' }}
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}>
                  <MenuItem key={'all'} value={'all'}>
                    {'All'}
                  </MenuItem>
                  <MenuItem key={'red'} value={'red'}>
                    {'Red Flag'}
                  </MenuItem>
                  <MenuItem key={'orange'} value={'orange'}>
                    {'Orange Flag'}
                  </MenuItem>
                  <MenuItem key={'yellow'} value={'yellow'}>
                    {'Yellow Flag'}
                  </MenuItem>
                  <MenuItem key={'green'} value={'green'}>
                    {'Green Flag'}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6} sm={4}>
                <UserDropdown
                  UserValue={UsersValue}
                  setUserValue={setUsersValue}
                  id="user_ids"
                  name="user_ids"
                  userOnChange={userOnChange}
                  multiple={true}
                  limitTags={2}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select Users"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Box display="flex" flexDirection="row-reverse">
                  <StyledButton
                    color="bsuccess"
                    size="small"
                    type="button"
                    variant="contained"
                    startIcon={<SearchIcon />}
                    disabled={isEmpty(extraFiltersState.user_ids)}
                    onClick={() => {
                      filterRecords();
                    }}>
                    Search
                  </StyledButton>
                </Box>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

ExtraFilters.propTypes = {
  className: PropTypes.string
};

export default ExtraFilters;
