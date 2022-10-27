import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid/v1';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header,
  Headcount
} from './components';
import {
  updateClientHeadcount,
  hideClientHeadcountValidationError,
  redirectToClientHeadcountList,
  designationListFetch,
  getShiftsByClient,
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
import { CK_CONFIGS } from 'configs';
import { isEmpty, forEach } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { ClientDropdown, OfficesDropdown } from 'commonDropdowns';
import moment from 'moment';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

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

const ClientHeadcountUpdate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const clientHeadcountState = useSelector(state => state.clientHeadcountState);
  const session = useSelector(state => state.session);
  const [OfficeValue, setOfficeValue] = useState(null);
  const [ClientValue, setClientValue] = useState(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState([]);
  const [headcounts, setHeadcounts] = useState({});

  const [schema, setSchema] = useState({
    client_id: {
      presence: { allowEmpty: false, message: '^Client is required' },
    },
    office_id: {
      presence: { allowEmpty: false, message: '^Office is required' },
    },
    from_date: {
      presence: { allowEmpty: false, message: 'is required' },
    }
  });

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
      from_date: moment(moment().toDate()).format('YYYY-MM-DD'),
    },
    touched: {
      'object_viewed_id': true,
      from_date: true,
    },
    errors: {}
  });

  useEffect(() => {

    async function papulateFormData() {

      let record = clientHeadcountState.clientHeadcountRecord;
      let schema_arr = { ...schema };
      let headcounts_arr = { ...headcounts };
      let form_val_arr = {
        ...formState.values,
        'from_date': record.from_date,
        'to_date': record.to_date,
        'office_id': record.office_id,
        'client_id': record.client_id,
        'id': record.id,
        'description': record.description
      }
      let form_touch_arr = {
        ...formState.touched,
        'from_date': true,
        'to_date': true,
        'office_id': true,
        'client_id': true,
        'id': true,
        'description': true
      }


      forEach(record.headcount_details, function (value, key) {
        let f_id = uuid();

        schema_arr = {
          ...schema_arr,
          ['designation_id' + f_id]: {
            presence: { allowEmpty: false, message: '^Please select Designation' },
          },
          ['shift_id' + f_id]: {
            presence: { allowEmpty: false, message: '^Please select shift' },
          },
          ['billables' + f_id]: {
            numericality: {
              greaterThanOrEqualTo: 0,
              message: '^This field must be grater than -1'
            }
          },
          ['primary_count' + f_id]: {
            numericality: {
              greaterThanOrEqualTo: 0,
              message: '^This field must be grater than -1'
            }
          },
          ['backfill_count' + f_id]: {
            numericality: {
              greaterThanOrEqualTo: 0,
              message: '^This field must be grater than -1'
            }
          }
        }

        form_val_arr = {
          ...form_val_arr,
          ['designation_id' + f_id]: value.designation_id,
          ['shift_id' + f_id]: value.shift_id,
          ['billables' + f_id]: value.billables,
          ['primary_count' + f_id]: value.primary_count,
          ['backfill_count' + f_id]: value.backfill_count,
          ['description' + f_id]: value.description
        };
        form_touch_arr = {
          ...form_touch_arr,
          ['designation_id' + f_id]: true,
          ['shift_id' + f_id]: true,
          ['billables' + f_id]: true,
          ['primary_count' + f_id]: true,
          ['backfill_count' + f_id]: true,
          ['description' + f_id]: true
        }

        headcounts_arr = {
          ...headcounts_arr,
          [f_id]: {
            ...headcounts_arr[f_id],
            'designation_id': value.designation_id,
            'shift_id': value.shift_id,
            'billables': value.billables,
            'primary_count': value.primary_count,
            'backfill_count': value.backfill_count,
            'description': value.description,
            'rid': value.id,
            'id': f_id
          }
        }
      });

      await setSelectedClientId([record.client_id]);
      await setSelectedOfficeId([record.office_id]);
      await setSchema(schema_arr);
      await setFormState(formState => ({
        ...formState,
        values: form_val_arr,
        touched: form_touch_arr
      }));
      await setHeadcounts(headcounts_arr);

    }

    papulateFormData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(designationListFetch(session.current_page_permissions.object_id));
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(clientHeadcountState.validation_error)) {
      const errors = clientHeadcountState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [clientHeadcountState.validation_error]);

  useEffect(() => {
    if (!clientHeadcountState.showUpdateForm && !clientHeadcountState.showViewPage) {
      router.history.push('/client-headcount');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientHeadcountState.showUpdateForm, clientHeadcountState.showViewPage]);

  useEffect(() => {
    if (clientHeadcountState.redirect_to_list) {
      router.history.push('/client-headcount');
    }
  }, [clientHeadcountState.redirect_to_list, router.history]);

  const addHeadCounts = async () => {
    let f_id = uuid();
    await setHeadcounts(headcounts => ({
      [f_id]: {
        ...headcounts[f_id],
        'designation_id': '',
        'shift_id': '',
        'billables': '',
        'primary_count': '',
        'backfill_count': '',
        'description': '',
        'rid': '',
        'id': f_id
      },
      ...headcounts,
    }));

    let schema_arr = {
      ...schema,
      ['designation_id' + f_id]: {
        presence: { allowEmpty: false, message: '^Please select Designation' },
      },
      ['shift_id' + f_id]: {
        presence: { allowEmpty: false, message: '^Please select shift' },
      },
      ['billables' + f_id]: {
        numericality: {
          greaterThanOrEqualTo: 0,
          message: '^This field must be grater than -1'
        }
      },
      ['primary_count' + f_id]: {
        numericality: {
          greaterThanOrEqualTo: 0,
          message: '^This field must be grater than -1'
        }
      },
      ['backfill_count' + f_id]: {
        numericality: {
          greaterThanOrEqualTo: 0,
          message: '^This field must be grater than -1'
        }
      }
    }
    await setSchema(schema_arr);

    const errors = await validate(formState.values, schema_arr);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

  }

  const deleteHeadCount = (id) => {
    deleteHeadCount1(id);
  }

  const deleteHeadCount1 = async (id) => {
    let schema_arr = { ...schema };
    let formState_arr = { ...formState };
    let headcounts_arr = { ...headcounts };

    await delete headcounts_arr[id];
    await setHeadcounts(headcounts_arr);

    //resting schema for validations
    await delete schema_arr['designation_id' + id];
    await delete schema_arr['shift_id' + id];
    await delete schema_arr['billables' + id];
    await delete schema_arr['primary_count' + id];
    await delete schema_arr['backfill_count' + id];
    await setSchema(schema_arr);

    //resting form states 
    await delete formState_arr['values']['designation_id' + id];
    await delete formState_arr['values']['shift_id' + id];
    await delete formState_arr['values']['billables' + id];
    await delete formState_arr['values']['primary_count' + id];
    await delete formState_arr['values']['backfill_count' + id];
    await delete formState_arr['touched']['designation_id' + id];
    await delete formState_arr['touched']['shift_id' + id];
    await delete formState_arr['touched']['billables' + id];
    await delete formState_arr['touched']['primary_count' + id];
    await delete formState_arr['touched']['backfill_count' + id];
    await delete formState_arr['errors']['designation_id' + id];
    await delete formState_arr['errors']['shift_id' + id];
    await delete formState_arr['errors']['billables' + id];
    await delete formState_arr['errors']['primary_count' + id];
    await delete formState_arr['errors']['backfill_count' + id];
    await setFormState(formState => ({
      ...formState,
      values: {
        ...formState_arr['values']
      },
      touched: {
        ...formState_arr['touched']
      },
      errors: {
        ...formState_arr['errors']
      }
    }));
  }

  const OfficeOnChange = (event, newValue) => {
    if (newValue) {
      setOfficeValue(newValue)
      setOfficeId(newValue.id)
      setSelectedOfficeId([newValue.id]);
    }
    else {
      setOfficeValue(newValue)
      setOfficeId('')
      setSelectedOfficeId([]);
    }
  }

  const setOfficeId = office_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'office_id': office_id
      },
      touched: {
        ...formState.touched,
        'office_id': true
      }
    }));
    dispatch(hideClientHeadcountValidationError('office_id'))
  }

  const clientOnChange = (event, newValue) => {
    if (newValue) {
      setClientValue(newValue)
      setClientId(newValue.id)
      setSelectedClientId([newValue.id]);
      dispatch(getShiftsByClient(newValue.id, session.current_page_permissions.object_id));
    }
    else {
      setClientValue(newValue);
      setClientId('');
      setSelectedClientId([]);
      dispatch(getShiftsByClient('', session.current_page_permissions.object_id))
    }
  }

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
    dispatch(hideClientHeadcountValidationError('client_id'))
  }

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
    dispatch(hideClientHeadcountValidationError('description'))
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
    dispatch(hideClientHeadcountValidationError(event.target.name))
  }

  const handleHeadCountFieldChange = (event, field, id) => {
    if (!isEmpty(headcounts[id])) {
      handleChange(event);
      setHeadcounts(headcounts => ({
        ...headcounts,
        [id]: {
          ...headcounts[id],
          [field]: event.target.value,
        },
      }));
    }

  }

  const handleHeadcountDropdownChange = (fvalue, field, id) => {
    if (!isEmpty(headcounts[id])) {
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          [field + id]: fvalue
        },
        touched: {
          ...formState.touched,
          [field + id]: true
        }
      }));

      setHeadcounts(headcounts => ({
        ...headcounts,
        [id]: {
          ...headcounts[id],
          [field]: fvalue,
        },
      }));
    }

  }

  const handleHeadcountDescChange = (event, desc, id) => {
    if (!isEmpty(headcounts[id])) {

      setHeadcounts(headcounts => ({
        ...headcounts,
        [id]: {
          ...headcounts[id],
          'description': desc,
        },
      }));
    }
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (formState.isValid) {
      let form_data = formState.values;
      form_data['headcounts'] = Object.values(headcounts);
      dispatch(updateClientHeadcount(form_data));
    }
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Update Client Headcount"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update Client Headcount" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    error={hasError('from_date')}
                    fullWidth
                    helperText={hasError('from_date') ? formState.errors.from_date[0] : null}
                    label="Date From"
                    name="from_date"
                    type="date"
                    onChange={handleChange}
                    value={formState.values.from_date || ''}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    error={hasError('to_date')}
                    fullWidth
                    helperText={hasError('to_date') ? formState.errors.to_date[0] : null}
                    label="Date To"
                    name="to_date"
                    type="date"
                    onChange={handleChange}
                    value={formState.values.to_date || ''}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <OfficesDropdown
                    OfficeValue={OfficeValue}
                    setOfficeValue={setOfficeValue}
                    selectedId={formState.values.office_id}
                    id="office_id"
                    name="office_id"
                    officeOnChange={OfficeOnChange}
                    disabled={true}
                    renderInput={(params) => <TextField {...params} size="small" label="Select Office" variant="outlined" error={hasError('office_id')} helperText={hasError('office_id') ? formState.errors.office_id[0] : null} />}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <ClientDropdown
                    ClientValue={ClientValue}
                    setClientValue={setClientValue}
                    id="client_id"
                    name="client_id"
                    clientOnChange={clientOnChange}
                    selectedId={formState.values.client_id}
                    officesIds={selectedOfficeId}
                    disabled={true}
                    renderInput={(params) => <TextField {...params} size="small" label="Select Client" variant="outlined" error={hasError('client_id')} helperText={hasError('client_id') ? formState.errors.client_id[0] : null} />}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <StyledButton
                    color="bsuccess"
                    size="small"
                    variant="outlined"
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    disabled={(isEmpty(selectedOfficeId) || isEmpty(selectedClientId)) ? true : false}
                    onClick={addHeadCounts}
                  >
                    Add Headcount
                  </StyledButton>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  {!isEmpty(headcounts) ?
                    <>
                      {Object.values(headcounts).map((item, i) => (
                        <Headcount
                          key={item.id}
                          hindex={i}
                          headcountDetail={item}
                          formState={formState}
                          setFormState={setFormState}
                          hasError={hasError}
                          handleHeadcountDropdownChange={handleHeadcountDropdownChange}
                          handleHeadcountDescChange={handleHeadcountDescChange}
                          handleHeadCountFieldChange={handleHeadCountFieldChange}
                          setHeadcounts={setHeadcounts}
                          deleteHeadCount={deleteHeadCount}
                        />
                      ))}
                    </>
                    :
                    ''
                  }
                </Grid>
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={formState.values.description || ''}
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
              disabled={!formState.isValid || isEmpty(headcounts)}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Update Client Headcount
            </StyledButton> &nbsp; &nbsp;
            <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToClientHeadcountList()) }}
              startIcon={<CancelIcon />}
            >
              CLOSE
            </StyledButton>

          </form>

        </CardContent>
      </Card>

    </Page >
  );
};

export default ClientHeadcountUpdate;
