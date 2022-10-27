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
import { OfficesDropdown, ClientDropdown } from 'commonDropdowns'
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

  const [ClientValue, setClientValue] = useState([]);
  const [OfficeValue, setOfficeValue] = useState([]);
  const [selectedOfficeId, setSelectedOfficeId] = useState([]);

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

  const OfficeOnChange = async (event, newValue) => {
    if (!isEmpty(newValue)) {
      setOfficeValue(newValue);
      let office_ids = (map(newValue, 'id'));
      setOfficeIds(office_ids);
      setSelectedOfficeId(office_ids);
    }
    else {
      await setClientValue([]);
      await setClientIds([]);
      setOfficeValue(newValue);
      setOfficeIds([]);
      setSelectedOfficeId([]);

    }

  }

  const setOfficeIds = offices_ids => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        'offices_ids': offices_ids
      },
      touched: {
        ...extraFiltersState.touched,
        'offices_ids': true
      }
    }));

  }

  const clientOnChange = (event, newValue) => {
    let camp_ids = [];
    if (newValue) {
      setClientValue(newValue)
      camp_ids = map(newValue, 'id')
      setClientIds(camp_ids)
    }
    else {
      setClientValue(newValue)
      setClientIds([])
    }

  }

  const setClientIds = client_ids => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        'client_ids': client_ids
      },
      touched: {
        ...extraFiltersState.touched,
        'client_ids': true
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
            <Grid container spacing={3}  >
              <Grid item xs={12} sm={4}>
                <OfficesDropdown
                  OfficeValue={OfficeValue}
                  setOfficeValue={setOfficeValue}
                  id="offices_ids"
                  name="offices_ids"
                  showSelectAllOption={true}
                  multiple={true}
                  limitTags={2}
                  officeOnChange={OfficeOnChange}
                  renderInput={(params) => <TextField {...params} size="small" label="Select Offices" variant="outlined" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <ClientDropdown
                  ClientValue={ClientValue}
                  setClientValue={setClientValue}
                  id="client_ids"
                  name="client_ids"
                  officesIds={selectedOfficeId}
                  clientOnChange={clientOnChange}
                  showSelectAllOption={true}
                  multiple={true}
                  limitTags={2}
                  renderInput={(params) => <TextField {...params} label="Select Clients" variant="outlined" />}
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
                    Filter Headcount
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
