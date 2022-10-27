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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import {
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete
} from '@material-ui/lab';
import {
  assetTypesListFetch
} from 'actions'
import { StyledButton } from 'components'
import SearchIcon from '@material-ui/icons/Search';
import { OfficesDropdown, ClientDropdown, EmployeeDropdown } from 'commonDropdowns'
import { map, isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => ({

  content: {
    padding: theme.spacing(3)
  },
  inner: {
    minWidth: 700
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

const useToggleStyles = makeStyles((theme) => ({
  selected: {
    fontWeight: "500 !important",
    fontSize: "0.8125rem !important"
  }
}));

const useRadioStyles = makeStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.bprimary.main,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: theme.palette.bprimary.main,
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}));

const ExtraFilters = props => {
  const { className, extraFiltersState, setExtraFiltersState, filterRecords, ...rest } = props;

  const classes = useStyles();
  const radio_classes = useRadioStyles();
  const toggle_classes = useToggleStyles();
  const dispatch = useDispatch();
  const assetTypesState = useSelector(state => state.assetTypesState);
  const [ClientValue, setClientValue] = useState([]);
  const [OfficeValue, setOfficeValue] = useState([]);
  const [WorkstationValue, setWorkstationValue] = useState(null);
  const [EmployeeValue, setEmployeeValue] = useState([]);
  const [selectedOfficeIds, setSelectedOfficeIds] = useState([]);
  const [selectedClientIds, setSelectedClientIds] = useState([]); 
  const [dateFilterValue, setdateFilterValue] = useState('date_created');  

  useEffect(() => {
    setdateFilterValue(extraFiltersState.values.date_column);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraFiltersState.values.date_column]);

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

  const handleDateColumnChange = (e, value) => {
    e.persist();
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        'date_column': value
      },
      touched: {
        ...extraFiltersState.touched,
        'date_column': true
      }
    }));
  }

  const OfficeOnChange = (event, newValue) => {

    let office_ids = [];
    if (!isEmpty(newValue)) {
      setOfficeValue(newValue)
      office_ids = map(newValue, 'id')
      setOfficeIds(office_ids)
      setSelectedOfficeIds(office_ids)
    }
    else { 
      setOfficeValue(newValue)
      setOfficeIds([])
      setSelectedOfficeIds([])

      setClientValue([]);
      setSelectedClientIds([]);
      setEmployeeValue([]);
      setClientIds([])
      setEmployeeIds([])
    }

  }

  const setOfficeIds = office_ids => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        'office_ids': office_ids
      },
      touched: {
        ...extraFiltersState.touched,
        'office_ids': true
      }
    }));
  }

  const clientOnChange = (event, newValue) => { 
    let camp_ids = [];
    if (!isEmpty(newValue)) {
      setClientValue(newValue);
      camp_ids = map(newValue, 'id');
      setClientIds(camp_ids);
      setSelectedClientIds(camp_ids);
    }
    else {
      setEmployeeValue([]);
      setEmployeeIds([])
      setClientValue(newValue)
      setClientIds([])
      setSelectedClientIds([]);
      
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

  const employeeOnChange = (event, newValue) => {
    let emp_ids = [];
    if (newValue) {
      setEmployeeValue(newValue)
      emp_ids = map(newValue, 'id')
      setEmployeeIds(emp_ids)
    }
    else {
      setEmployeeValue(newValue)
      setEmployeeIds([])
    }
  }

  const setEmployeeIds = employee_ids => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        'employee_ids': employee_ids
      },
      touched: {
        ...extraFiltersState.touched,
        'employee_ids': true
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
          title="Report Filters"
        />
        <Divider />
        <CardContent className={classes.content}>
          <div className={classes.inner}>
            <Grid container spacing={3} >
              <Grid item xs={6} sm={4} style={{display: 'flex'}}>
                <FormGroup >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={extraFiltersState.values.is_date_filter}
                        onChange={handleChange}
                        name="is_date_filter"
                        color="primary"
                        classes={{
                          root: radio_classes.root,
                          switchBase: radio_classes.switchBase,
                          thumb: radio_classes.thumb,
                          track: radio_classes.track,
                          checked: radio_classes.checked,
                        }}
                      />
                    }
                    label="Enable Date Filter"
                  />
                </FormGroup> 
                {(extraFiltersState.values.is_date_filter === true)?
                  <>
                    <ToggleButtonGroup size="small" name="date_column" exclusive value={extraFiltersState.values.date_column} onChange={handleDateColumnChange} >
                      <ToggleButton 
                        value="date_created" 
                        style={{
                          border: '1px solid rgba(0, 0, 0, 0.12)',
                          fontWeight: "normal",
                          fontSize: "10px"
                        }} 
                        classes={{
                          selected: toggle_classes.selected,
                        }}
                      >
                        <CheckIcon fontSize="small" />
                        Date Created
                      </ToggleButton>
                      <ToggleButton 
                        value="date_last_modified"
                        style={{
                          border: '1px solid rgba(0, 0, 0, 0.12)',
                          fontWeight: "normal",
                          fontSize: "10px"
                        }} 
                        classes={{
                          selected: toggle_classes.selected,
                        }}
                      >
                        <CheckIcon fontSize="small" />
                        Date Last Modified
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </>
                  : ''
                }
              </Grid>
              <Grid item xs={6} sm={4}>
                {(extraFiltersState.values.is_date_filter === true)?
                  <TextField
                    fullWidth
                    label="From"
                    name="from_date"
                    onChange={handleChange}
                    value={extraFiltersState.values.from_date || ''}
                    type="datetime-local"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  : ''
                }
              </Grid>
              <Grid item xs={6} sm={4}>
                {(extraFiltersState.values.is_date_filter === true)?
                  <TextField
                    fullWidth
                    label="To"
                    name="to_date"
                    onChange={handleChange}
                    value={extraFiltersState.values.to_date || ''}
                    type="datetime-local"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  : ''
                }
              </Grid>
            </Grid>
            <Grid container spacing={3} >
              <Grid item xs={12} sm={4}>
                <OfficesDropdown
                  OfficeValue={OfficeValue}
                  setOfficeValue={setOfficeValue}
                  id="office_ids"
                  name="office_ids"
                  showSelectAllOption={true}
                  limitTags={2}
                  multiple={true}
                  officeOnChange={OfficeOnChange}
                  renderInput={(params) => <TextField {...params} size="small" label="Select Office" variant="outlined"  />}
                />
              </Grid> 
              <Grid item xs={6} sm={4}>
                <ClientDropdown
                  ClientValue={ClientValue}
                  setClientValue={setClientValue}
                  id="client_ids"
                  name="client_ids"
                  clientOnChange={clientOnChange}
                  disabled={isEmpty(selectedOfficeIds)}
                  officesIds={selectedOfficeIds}
                  limitTags={2}
                  multiple={true}
                  renderInput={(params) => <TextField {...params} label="Select Clients" variant="outlined" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <EmployeeDropdown
                  EmployeeValue={EmployeeValue}
                  setEmployeeValue={setEmployeeValue}
                  id="employee_ids"
                  name="employee_ids"
                  disabled={isEmpty(selectedOfficeIds) || isEmpty(selectedClientIds)}
                  officesIds={selectedOfficeIds}
                  clientIds={selectedClientIds}
                  employeeOnChange={employeeOnChange}
                  limitTags={2}
                  multiple={true}
                  renderInput={(params) => <TextField {...params} size="small" label="Select Employee" variant="outlined"  />}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label="Employee Status"
                  name="employee_status"
                  onChange={handleChange}
                  value={extraFiltersState.values.employee_status || ''}
                  select
                  variant="outlined"
                  size="small"
                > 
                  <MenuItem aria-label="All" value="all" key="0" >All</MenuItem>
                  <MenuItem aria-label="Actice" value="y" key="1" >Active</MenuItem>
                  <MenuItem aria-label="Sperated" value="n" key="2" >Sperated</MenuItem>
                </TextField>
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
                    Filter Assets
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
