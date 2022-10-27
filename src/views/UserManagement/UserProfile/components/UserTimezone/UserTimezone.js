import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import useRouter from 'utils/useRouter';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import {
  updateProfileTimezone,
  hideProfileTimezoneValidationError,
  timeZonesListFetch,
} from 'actions';
import { StyledButton } from 'components';
import { makeStyles } from '@material-ui/styles';
import { isEmpty, find, forEach } from 'lodash';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
  root: {},
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const schema = {
  timezone_id: {
    presence: { allowEmpty: false, message: '^ Please select Timezone' },
  },
}


const UserTimezone = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const userProfileState = useSelector(state => state.userProfileState);
  const timeZonesState = useSelector(state => state.timeZonesState);
  const session = useSelector(state => state.session);
  const [TimezoneValue, setTimezoneValue] = useState([]);  

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    dispatch(timeZonesListFetch(session.current_page_permissions.object_id))
  }, []);

  useEffect(() => {
    let record = session.user;
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'timezone_id': record.timezone_id,
        'user_id': session.user.id,
      },
      touched: {
        ...formState.touched,
        'timezone_id': true,
        'user_id': true,
      }
    }));
  }, [])

  useEffect(() => {
    let record = session.user;
    const item = find(timeZonesState.timeZonesList, ['id', record.timezone_id])
    setTimezoneValue(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZonesState.timeZonesList]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(userProfileState.profile_timezone_validation_error)) {
      const errors = userProfileState.profile_timezone_validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [userProfileState.profile_timezone_validation_error]);

  const setTimezoneId = timezone_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'timezone_id': timezone_id
      },
      touched: {
        ...formState.touched,
        'timezone_id': true
      }
    }));
    dispatch(hideProfileTimezoneValidationError('timezone_id'))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(updateProfileTimezone(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Card
      className={classes.projectDetails}
    >
      <CardHeader title="Set Timezone" />
      <CardContent>
        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.formGroup}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  id="timezone_id"
                  value={TimezoneValue}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setTimezoneValue(newValue)
                      setTimezoneId(newValue.id)
                    }
                    else {
                      setTimezoneValue(newValue)
                      setTimezoneId('')
                    }

                  }}
                  options={timeZonesState.timeZonesList}
                  getOptionLabel={(option) => '(' + option.offset + ') ' + option.name}
                  size="small"
                  renderInput={(params) => <TextField {...params} size="small" label="Select Timezone" variant="outlined" error={hasError('timezone_id')} helperText={hasError('timezone_id') ? formState.errors.timezone_id[0] : null} />}
                />
              </Grid>
            </Grid>
          </div>
          <Grid 
            container
            alignItems="flex-start"
            direction="row"
            justify="flex-end"
            spacing={3}
          >
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              save
            </StyledButton> 
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserTimezone;
