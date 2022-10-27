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
  ToggleButtonGroup
} from '@material-ui/lab';
import { StyledButton } from 'components'
import SearchIcon from '@material-ui/icons/Search';
import { map, isEmpty, includes } from 'lodash';
import { ClientDropdown } from 'commonDropdowns';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3)
  },
  inner: {
    minWidth: 700
  },
}));

const ExtraFilters = props => {
  const { className, extraFiltersState, setExtraFiltersState, filterRecords, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const applicationsState = useSelector(state => state.applicationsState);
  const [clientValue, setClientValue] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState([]);

  const handleChange = event => {
    event.persist();
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...extraFiltersState.touched,
        [event.target.name]: true
      }
    }));
  }

  const clientOnChange = (event, newValue) => {
    if (newValue) {
      setClientValue(newValue)
      setClientId(newValue.id)
      setSelectedClientId([newValue.id]);
    }
    else {
      setClientValue(newValue)
      setClientId('')
      setSelectedClientId([]);
    }
  }

  const setClientId = client_id => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        'client_id': client_id
      },
      touched: {
        ...extraFiltersState.touched,
        'client_id': true
      }
    }));
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
          title="Filters"
        />
        <Divider />
        <CardContent className={classes.content}>
          <div className={classes.inner}>
            <Grid container spacing={3} >
              <Grid item xs={6} sm={3}>
                <ClientDropdown
                  ClientValue={clientValue}
                  setClientValue={setClientValue}
                  id="client_id"
                  name="client_id"
                  clientOnChange={clientOnChange}
                  renderInput={(params) => <TextField {...params} size="small" label="Select Client" variant="outlined" />}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="Date"
                  name="from_date"
                  onChange={handleChange}
                  value={extraFiltersState.values.from_date || ''}
                  type="date"
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3} >
                <StyledButton
                  color="bsuccess"
                  size="small"
                  type="button"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={() => { filterRecords() }}
                  disabled={isEmpty(selectedClientId)}
                >
                  Fetch Report
                </StyledButton>
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
