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
  getTrackReportUsers
} from 'actions'
import { StyledButton } from 'components'
import SearchIcon from '@material-ui/icons/Search';
import { map } from 'lodash';
//import { DateRangePicker, DateRange, DateRangeDelimiter } from "@material-ui/pickers";

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

  const userReportState = useSelector(state => state.userReportState);
  const [UsersValue, setUsersValue] = useState([]);


  useEffect(() => {
    dispatch(getTrackReportUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleDateColumnChange = (event, value) => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      'date_column': value
    }));
  }

  const handleDateRangeChange = (value) => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      'date_range': value
    }));
  }

  const setUserIds = user_ids => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      'user_ids': user_ids
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
            <Grid container spacing={3} direction="column" style={{'display':'none'}}>
              <Grid item xs={12} sm={6}>
                <ToggleButtonGroup size="small" exclusive value={extraFiltersState.date_column} onChange={handleDateColumnChange} >
                  <ToggleButton value="date_created">
                    <CheckIcon  fontSize="small" />
                    Date Created
                  </ToggleButton>
                  <ToggleButton value="date_last_modified">
                    <CheckIcon  fontSize="small" />
                    Date Last Modified
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>  
            <Grid container spacing={3}  >
              <Grid item xs={6} sm={4}>
                {(userReportState.usersList)?
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="user_ids"
                  value={UsersValue}
                  onChange={(event, newValue) => {
                    if(newValue){
                      setUsersValue(newValue)
                      let user_ids = map(newValue,'id')
                      setUserIds(user_ids)
                    }
                    else{
                      setUsersValue(newValue)
                      setUserIds([])
                    }
                  }}
                  options={userReportState.usersList}
                  getOptionLabel={(option) => option.name}
                  size="small"
                  renderInput={(params) => <TextField {...params} label="Select Users" variant="outlined"  />}
                />
                
                :''}
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
                    startIcon={<SearchIcon/>}
                    onClick={() => { filterRecords() }}
                  >
                    Filter User Images
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
