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
import { StyledButton } from 'components'
import { ClientDropdown } from 'commonDropdowns'
import SearchIcon from '@material-ui/icons/Search';
import { map, isEmpty } from 'lodash';

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

  const [ClientValue, setClientValue] = useState('');

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
    }
    else {
      setClientValue(newValue)
      setClientId('')
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
        <CardContent className={classes.content}>
          <div className={classes.inner}>
            <Grid container spacing={3}  >
              <Grid item xs={12} sm={4}>
                <ClientDropdown
                  ClientValue={ClientValue}
                  setClientValue={setClientValue}
                  id="client_id"
                  name="client_id"
                  clientOnChange={clientOnChange}
                  renderInput={(params) => <TextField {...params} label="Select Designation" variant="outlined" />}
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
                    Find Cost
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
