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
  const dispatch = useDispatch();

  const assetTypesState = useSelector(state => state.assetTypesState);
  const session = useSelector(state => state.session);
  const [AssetTypeValue, setAssetTypeValue] = useState(null);

  useEffect(() => {
    dispatch(assetTypesListFetch(session.current_page_permissions.object_id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAssetTypeIds = atype_ids => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        'atype_ids': atype_ids
      },
      touched: {
        ...extraFiltersState.touched,
        'atype_ids': true
      }
    }));
  }

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
                      <ToggleButton value="date_created" style={{border: '1px solid rgba(0, 0, 0, 0.12)'}} >
                        <CheckIcon fontSize="small" />
                        Date Created
                      </ToggleButton>
                      <ToggleButton value="date_last_modified" style={{border: '1px solid rgba(0, 0, 0, 0.12)'}} >
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
              <Grid item xs={6} sm={4}>
                {(assetTypesState.assetTypesList) ?
                  <Autocomplete
                    id="atype_ids"
                    name="atype_ids"
                    value={AssetTypeValue}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setAssetTypeValue(newValue)
                        setAssetTypeIds([newValue.id])
                      }
                      else {
                        setAssetTypeValue(newValue)
                        setAssetTypeIds([])
                      }
                    }}
                    options={assetTypesState.assetTypesList}
                    getOptionLabel={(option) => option.name}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Select Asset Type" variant="outlined" />}
                  />
                  : ''}
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  fullWidth
                  label="Assets Status"
                  name="assets_status"
                  onChange={handleChange}
                  value={extraFiltersState.values.assets_status || ''}
                  select
                  variant="outlined"
                  size="small"
                  
                >
                  <MenuItem aria-label="All" value="all" key="assets_status_0" >All</MenuItem>
                  <MenuItem aria-label="Binded" value="binded" key="assets_status_1" >Binded</MenuItem>
                  <MenuItem aria-label="Available (In Stock)" value="available" key="assets_status_2" >Available (In Stock)</MenuItem>
                  <MenuItem aria-label="Deprecated" value="deprecated" key="assets_status_3" >Deprecated</MenuItem>
                  <MenuItem aria-label="Unreturned" value="unreturned" key="assets_status_4" >Unreturned</MenuItem>
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
