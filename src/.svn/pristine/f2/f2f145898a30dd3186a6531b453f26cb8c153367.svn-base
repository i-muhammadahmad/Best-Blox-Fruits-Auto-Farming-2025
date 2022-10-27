import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledFab, StyledButton } from 'components';
import {
  Header,
  FileUpload
} from './components';
import {
  activityCategoryListFetch,
  hideBulkActivityLogValidationError,
  bulkActivitySetupByClient,
  addBulkActivityLogDummy,
  addBulkActivityLog,
  showCommonLoader,
  hideCommonLoader
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { isEmpty } from 'lodash';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useRouter from 'utils/useRouter';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveIcon from '@material-ui/icons/Save';

const schema = {
  client_id: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  bulk_activity_setup_id: {
    presence: { allowEmpty: false, message: 'is required' },
  }
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BulkActivityLogAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const bulkActivityLogState = useSelector(state => state.bulkActivityLogState);
  const activityCategoryState = useSelector(state => state.activityCategoryState);
  const session = useSelector(state => state.session);

  const [ClientValue, setClientValue] = useState(null);
  const [SetupValue, setSetupValue] = useState(null);
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
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(bulkActivityLogState.validation_error)) {
      const errors = bulkActivityLogState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [bulkActivityLogState.validation_error]);

  useEffect(() => {
    dispatch(activityCategoryListFetch(session.current_page_permissions.object_id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //console.log(bulkActivityLogState.total_request_process)
    if(bulkActivityLogState.total_request_process > 0){
      let total_request = bulkActivityLogState.total_request + 1;
      let progress = Math.round((bulkActivityLogState.total_request_process / total_request) * 100);
      dispatch(showCommonLoader(progress))
      if(bulkActivityLogState.total_request_process === total_request){
        dispatch(hideCommonLoader())
      }
      if(bulkActivityLogState.total_request_process === bulkActivityLogState.total_request){
        let Formdata = {
          file_name: bulkActivityLogState.file_name,
          file_total_records: bulkActivityLogState.file_total_records
        };
        dispatch(addBulkActivityLog(Formdata));
      }
    }
  }, [bulkActivityLogState.total_request_process]);

  const setClientId = client_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'client_id': client_id
      },
      touched: {
        ...formState.touched,
        'client_id': true
      }
    }));
    dispatch(hideBulkActivityLogValidationError('client_id'))
  }

  const setSetupId = bulk_activity_setup_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'bulk_activity_setup_id': bulk_activity_setup_id
      },
      touched: {
        ...formState.touched,
        'bulk_activity_setup_id': true
      }
    }));
    dispatch(hideBulkActivityLogValidationError('bulk_activity_setup_id'))
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
    dispatch(hideBulkActivityLogValidationError(event.target.name));
  }

  const handleSubmit = event => {
    event.preventDefault();

    //calculating total requests
    let chunkSize = bulkActivityLogState.chunkSize;
    let totalRecords = parseInt(bulkActivityLogState.file_total_records);
    let total_request = bulkActivityLogState.total_request;

    let start = 0;
    if (bulkActivityLogState.file_contain_header) {
      start = 1;
    }

    dispatch(showCommonLoader(0))
    for (let i = 0; i < total_request; i++) {
      if (i > 0) {
        start = i * chunkSize;
      }
      let Formdata = {
        form_data: formState.values,
        file_name: bulkActivityLogState.file_name,
        header: bulkActivityLogState.file_headers,
        start,
        chunkSize,
      };
      dispatch(addBulkActivityLogDummy(Formdata));
    }
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Import Activities"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Import Activities File Upload" />
        <CardContent>
          <FileUpload />
        </CardContent>
      </Card>
      {(bulkActivityLogState.is_file_uploded) ?
        <form
          onSubmit={handleSubmit}
        >
          <Card
            className={classes.projectDetails}
          >
            <CardHeader title="Select Mapping Profile" />
            <CardContent>
              <div className={classes.formGroup}>
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={3}>
                    {(activityCategoryState.activityCategoryList) ?
                      <Autocomplete
                        id="client_id"
                        value={ClientValue}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setClientValue(newValue)
                            setClientId(newValue.id)
                            dispatch(bulkActivitySetupByClient(newValue.id))
                          }
                          else {
                            setClientValue(newValue)
                            setClientId('')
                            dispatch(bulkActivitySetupByClient(null))
                          }
                        }}
                        options={activityCategoryState.activityCategoryList}
                        getOptionLabel={(option) => option.opt_display}
                        size="small"
                        renderInput={(params) => <TextField {...params} label="Select Client" variant="outlined" error={hasError('client_id')} helperText={hasError('client_id') ? formState.errors.client_id[0] : null} />}
                      />
                      : ''}
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    {(bulkActivityLogState.bulkActivitySetupByClient) ?
                      <Autocomplete
                        id="bulk_activity_setup_id"
                        value={SetupValue}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setSetupValue(newValue)
                            setSetupId(newValue.id)
                          }
                          else {
                            setSetupValue(newValue)
                            setSetupId('')
                          }
                        }}
                        options={bulkActivityLogState.bulkActivitySetupByClient}
                        getOptionLabel={(option) => option.name}
                        size="small"
                        renderInput={(params) => <TextField {...params} label="Select Setup List" variant="outlined" error={hasError('bulk_activity_setup_id')} helperText={hasError('bulk_activity_setup_id') ? formState.errors.bulk_activity_setup_id[0] : null} />}
                      />
                      : ''}
                  </Grid>
                </Grid>
              </div>  
            </CardContent>
          </Card>
          {!(isEmpty(SetupValue)) ?
          <Card
            className={classes.projectDetails}
          >
            <CardHeader title="Map Columns" />
            <CardContent>
              <div className={classes.formGroup}>
                <Grid container spacing={3}>
                  {SetupValue.extra_fields.map(efields => (
                    <Grid item xs={6} sm={3} key={efields.id}>
                      <TextField
                        error={hasError(efields.log_field)}
                        id={efields.log_field}
                        fullWidth
                        helperText={hasError(efields.log_field) ? formState.errors[efields.log_field][0] : null}
                        label={efields.label}
                        name={efields.log_field}
                        onChange={handleChange}
                        value={formState.values[efields.log_field] || ''}
                        variant="outlined"
                        size="small"
                        select
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        {bulkActivityLogState.file_headers.map(h_columns => (
                          <MenuItem key={h_columns} value={h_columns}>
                            {(bulkActivityLogState.file_contain_header)?
                              h_columns: 'col'+h_columns
                            }
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  ))}
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} >
                    {!(isEmpty(SetupValue)) ?
                      <StyledButton
                        color="bprimary"
                        size="small"
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                      >
                        Import Activities
                      </StyledButton>
                      : ''
                    }
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
          : ''
          }
        </form>
        : ''}
    </Page>
  );
};

export default BulkActivityLogAdd;