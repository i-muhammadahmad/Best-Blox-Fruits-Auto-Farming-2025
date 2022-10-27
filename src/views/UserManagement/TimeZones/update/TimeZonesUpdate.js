import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  updateTimeZones,
  hideTimeZonesValidationError,
  redirectToTimeZonesList
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';

const schema = {
  name: {
    presence: { allowEmpty: false, message: '^TimeZones is required' },
  },
  offset: {
    presence: { allowEmpty: false, message: '^Offset is required' },
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const TimeZonesUpdate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const timeZonesState = useSelector(state => state.timeZonesState);
  const session = useSelector(state => state.session);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
    },
    touched: {
      'object_viewed_id': true,
    },
    errors: {}
  });

  useEffect(() => {
    let record = timeZonesState.timeZonesRecord
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'offset': record.offset,
        'name': record.name,
        'id': record.id,
        'description': record.description,
      },
      touched: {
        ...formState.touched,
        'offset': true,
        'name': true,
        'id': true,
        'description': true,
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZonesState.timeZonesRecord])

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(timeZonesState.validation_error)) {
      const errors = timeZonesState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [timeZonesState.validation_error]);

  useEffect(() => {
    if (!timeZonesState.showViewPage && !timeZonesState.showUpdateForm) {
      router.history.push('/timeZones');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZonesState.showViewPage, timeZonesState.showUpdateForm]);

  useEffect(() => {
    if (timeZonesState.redirect_to_list) {
      router.history.push('/timeZones');
    }
  }, [timeZonesState.redirect_to_list, router.history]);

  const setDescription = description => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'description': description
      },
      touched: {
        ...formState.touched,
        'description': true
      }
    }));
    dispatch(hideTimeZonesValidationError('description'))
  }

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    dispatch(hideTimeZonesValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(updateTimeZones(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Update TimeZones"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update TimeZones" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('name')}
                    fullWidth
                    helperText={hasError('name') ? formState.errors.name[0] : null}
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    value={formState.values.name || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('offset')}
                    fullWidth
                    helperText={hasError('offset') ? formState.errors.offset[0] : null}
                    label="Offset"
                    name="offset"
                    onChange={handleChange}
                    value={formState.values.offset || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={timeZonesState.timeZonesRecord.description || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data)
                }}
              />
              <FormControl error={hasError('description')} >
                <FormHelperText id="component-error-text">{hasError('description') ? formState.errors.description[0] : null}</FormHelperText>
              </FormControl>
            </div>
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Update TimeZones
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToTimeZonesList()) }}
              startIcon={<CancelIcon />}
            >
              CLOSE
          </StyledButton>

          </form>

        </CardContent>
      </Card>

    </Page>
  );
};

export default TimeZonesUpdate;
