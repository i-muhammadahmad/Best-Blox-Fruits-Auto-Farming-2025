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
  Box
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import {
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete
} from '@material-ui/lab';
import { UserDropdown } from 'commonDropdowns';
import { StyledButton } from 'components';
import SearchIcon from '@material-ui/icons/Search';
import { map } from 'lodash';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3)
  },
  inner: {
    minWidth: 700
  }
}));

const ExtraFilters = props => {
  const { className, extraFiltersState, setExtraFiltersState, filterRecords, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const userReportState = useSelector(state => state.userReportState);
  const [UserValue, setUserValue] = useState([]);

  const handleChange = event => {
    event.persist();
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    }));
  }

  const userOnChange = (event, newValue) => {
    if (newValue) {
      setUserValue(newValue);
      setUserId(newValue.id);
    }
    else {
      setUserValue(newValue);
      setUserId('');
    }
  }

  const setUserId = user_id => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      'user_id': user_id
    }));
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
          title="Report Filters"
        />
        <Divider />
        <CardContent className={classes.content}>
          <div className={classes.inner}>
            
            <Grid container spacing={3}  >
              <Grid item xs={6} sm={4}>
                <UserDropdown
                  UserValue={UserValue}
                  setUserValue={setUserValue}
                  id="user_ids"
                  name="user_ids"
                  userOnChange={userOnChange}
                  renderInput={(params) => <TextField {...params} label="Select User" variant="outlined" />}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label="From"
                  name="from_date"
                  onChange={handleChange}
                  value={extraFiltersState.from_date || ''}
                  type="datetime-local"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label="To"
                  name="to_date"
                  onChange={handleChange}
                  value={extraFiltersState.to_date || ''}
                  type="datetime-local"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

            </Grid>

            <Grid container spacing={3}  >
              <Grid item xs={12} sm={12} >
                <Box display="flex" flexDirection="row-reverse" >
                  <StyledButton
                    color="bsuccess"
                    size="small"
                    type="button"
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={() => { filterRecords() }}
                  >
                    Filter Activities
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
