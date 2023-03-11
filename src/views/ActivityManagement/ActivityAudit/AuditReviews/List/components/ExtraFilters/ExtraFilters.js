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
import {
  activitySetupByAttrListFetch,
} from 'actions'
import { StyledButton } from 'components'
import { ClientDropdown, UserDropdown } from 'commonDropdowns'
import SearchIcon from '@material-ui/icons/Search';
import { map, isEmpty, includes } from 'lodash';

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

  const activityLogState = useSelector(state => state.activityLogState);
  const activitySetupState = useSelector(state => state.activitySetupState);
  const session = useSelector(state => state.session);
  const [ClientValue, setClientValue] = useState([]);
  const [ActivityValue, setActivityValue] = useState([]);
  const [UsersValue, setUsersValue] = useState([]);

  useEffect(() => {
    dispatch(activitySetupByAttrListFetch(session.current_page_permissions.object_id, []))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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

  const loadActivities = (camp_ids) => {
    let request = [];
    if(!isEmpty(camp_ids) && !includes(camp_ids, 'all')){
      request.push(
        {
          "key": "client_id",
          "Operator": "in",
          "value": camp_ids
        }
      );
    }
    
    dispatch(activitySetupByAttrListFetch(session.current_page_permissions.object_id, request))
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

    loadActivities(camp_ids);
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

  const setActivityIds = activity_ids => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        'activity_ids': activity_ids
      },
      touched: {
        ...extraFiltersState.touched,
        'activity_ids': true
      }
    }));
  }

  const userOnChange = (event, newValue) => {
    if (newValue) {
      setUsersValue(newValue)
      let user_ids = map(newValue, 'id')
      setUserIds(user_ids)
    }
    else {
      setUsersValue(newValue)
      let user_ids = map(newValue, 'id')
      setUserIds(user_ids)
    }
  }

  const setUserIds = user_ids => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        'user_ids': user_ids
      },
      touched: {
        ...extraFiltersState.touched,
        'user_ids': true
      }
    }));
  }

  const getOptionName = (option) => {
    let name = '';
    if(!isEmpty(option.activity_client))
    {
      name += option.activity_client.client_name +' --> ';
    }
    if(!isEmpty(option.activity_category))
    {
      name += option.activity_category.opt_display +' --> ';
    }
    name += option.name;
    return name;
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
          title="Filters Activities"
        />
        <Divider />
        <CardContent className={classes.content}>
          <div className={classes.inner}>
            <Grid container spacing={3} >
              <Grid item xs={12} sm={4}>
                <ToggleButtonGroup size="small" exclusive value={extraFiltersState.values.date_column} onChange={handleChange} >
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
              <Grid item xs={6} sm={4}>
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
              </Grid>
              <Grid item xs={6} sm={4}>
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
              </Grid>
            </Grid>
            <Grid container spacing={3}  >
              <Grid item xs={6} sm={4}>
                <ClientDropdown
                  ClientValue={ClientValue}
                  setClientValue={setClientValue}
                  id="client_ids"
                  name="client_ids"
                  clientOnChange={clientOnChange}
                  limitTags={2}
                  multiple={true}
                  renderInput={(params) => <TextField {...params} label="Select Clients" variant="outlined" />}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <UserDropdown
                  UserValue={UsersValue}
                  setUserValue={setUsersValue}
                  id="user_ids"
                  name="user_ids"
                  disabled={isEmpty(ClientValue)}
                  userOnChange={userOnChange}
                  limitTags={2}
                  multiple={true}
                  clientIds={extraFiltersState.values.client_ids}
                  renderInput={(params) => <TextField {...params} label="Select Users" variant="outlined" />}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="activity_ids"
                  name="activity_ids"
                  disabled={isEmpty(ClientValue)}
                  value={ActivityValue}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setActivityValue(newValue)
                      let activity_ids = map(newValue, 'id')
                      setActivityIds(activity_ids)
                    }
                    else {
                      setActivityValue(newValue)
                      setActivityIds([])
                    }
                  }}
                  options={activitySetupState.activitySetupByAttrList}
                  getOptionLabel={(option) => getOptionName(option) }
                  renderInput={(params) => <TextField {...params} size="small" label="Select Activities" variant="outlined" />}
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
