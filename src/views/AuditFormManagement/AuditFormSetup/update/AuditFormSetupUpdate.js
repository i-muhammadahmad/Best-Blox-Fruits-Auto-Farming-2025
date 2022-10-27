import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid/v1';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header,
  CheckPoint
} from './components';
import {
  updateAuditFormSetup,
  hideAuditFormSetupValidationError,
  redirectToAuditFormSetupList
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
import { isEmpty, forEach } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { CK_CONFIGS } from 'configs';
import { ClientDropdown } from 'commonDropdowns';

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

const AuditFormSetupUpdate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const auditFormSetupState = useSelector(state => state.auditFormSetupState);
  const session = useSelector(state => state.session);
  const [ClientValue, setClientValue] = useState(null);
  const [checkpoints, setCheckpoints] = useState({});
  const [selectedClientId, setSelectedClientId] = useState('');

  const [schema, setSchema] = useState({
    name: {
      presence: { allowEmpty: false, message: '^Audit Form Setup is required' },
    },
    client_id: {
      presence: { allowEmpty: false, message: '^Client is required' },
    },
    passing_score: {
      presence: { allowEmpty: false, message: ' is required' },
      numericality: {
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: 100,
      }
    }
  });

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

    async function papulateFormData() {
      
      let record = auditFormSetupState.auditFormSetupRecord;
      let schema_arr = {...schema};
      let checkpoints_arr = {...checkpoints};
      let form_val_arr = {
        ...formState.values,
        'name': record.name,
        'client_id': record.client_id,
        'passing_score': record.passing_score,
        'id': record.id,
        'description': record.description
      }
      let form_touch_arr = {
        ...formState.touched,
        'name': true,
        'client_id': true,
        'passing_score': true,
        'id': true,
        'description': true
      }
    
    
      forEach(record.checkpoints, function(value, key) {
        let f_id = uuid();

        schema_arr = {
          ...schema_arr,
          ['checkpoint_title_'+f_id]: {
            presence: { allowEmpty: false, message: '^Checkpoint Title is required' },
          },
          ['checkpoint_isrequried_'+f_id]: {
            presence: { allowEmpty: false, message: '^This feild is required' },
          }
        }

        form_val_arr = {
          ...form_val_arr,
          ['checkpoint_title_'+f_id]: value.title,
          ['checkpoint_isrequried_'+f_id]: value.is_required,
          ['description_'+f_id]: value.description
        };
        form_touch_arr = {
          ...form_touch_arr,
          ['checkpoint_title_'+f_id]: true,
          ['checkpoint_isrequried_'+f_id]: true,
          ['description_'+f_id]: true
        }

        checkpoints_arr = {
          ...checkpoints_arr,
          [f_id]: {
            ...checkpoints_arr[f_id],
            'title': value.title,
            'description': value.description,
            'is_required': value.is_required,
            'rid': value.id,
            'id': f_id
          }
        }
      });

      await setSelectedClientId(record.client_id);
      await setSchema(schema_arr);
      await setFormState(formState => ({
        ...formState,
        values: form_val_arr,
        touched: form_touch_arr 
      }));
      await setCheckpoints(checkpoints_arr);

    }  

    papulateFormData();
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (!isEmpty(auditFormSetupState.validation_error)) {
      const errors = auditFormSetupState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [auditFormSetupState.validation_error]);

  useEffect(() => {
    if (!auditFormSetupState.showViewPage && !auditFormSetupState.showUpdateForm) {
      router.history.push('/audit-form-setup');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditFormSetupState.showViewPage, auditFormSetupState.showUpdateForm]);

  useEffect(() => {
    if (auditFormSetupState.redirect_to_list) {
      router.history.push('/audit-form-setup');
    }
  }, [auditFormSetupState.redirect_to_list, router.history]);

  const addCheckPoints = async () => {
    let f_id = uuid();
    await setCheckpoints(checkpoints => ({
      ...checkpoints,
      [f_id]: {
        ...checkpoints[f_id],
        'title': '',
        'description': '',
        'is_required': false,
        'rid': '',
        'id': f_id
      },
    }));

    await setSchema(schema => ({
      ...schema,
      ['checkpoint_title_'+f_id]: {
        presence: { allowEmpty: false, message: '^Checkpoint Title is required' },
      },
      ['checkpoint_isrequried_'+f_id]: {
        presence: { allowEmpty: false, message: '^This feild is required' },
      }, 
    }));

    await setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        ['checkpoint_isrequried_'+f_id]: false
      },
      touched: {
        ...formState.touched,
        ['checkpoint_isrequried_'+f_id]: true
      }
    }));
  }

  const deleteCheckpoint = (id) => {
    deleteCheckpoint1(id)
  }

  const deleteCheckpoint1 = async (id) => {
    let schema_arr = { ...schema };
    let formState_arr = { ...formState };
    let checkpoints_arr = { ...checkpoints };
    
    await delete checkpoints_arr[id];
    await setCheckpoints(checkpoints_arr);

    //resting schema for validations
    await delete schema_arr['checkpoint_isrequried_' + id];
    await delete schema_arr['checkpoint_title_' + id];
    await setSchema(schema_arr);

    //resting form states 
    await delete formState_arr['values']['checkpoint_title_' + id];
    await delete formState_arr['values']['checkpoint_isrequried_' + id];
    await delete formState_arr['values']['description_' + id];
    await delete formState_arr['touched']['checkpoint_title_' + id];
    await delete formState_arr['touched']['checkpoint_isrequried_' + id];
    await delete formState_arr['touched']['description_' + id];
    await delete formState_arr['errors']['checkpoint_title_' + id];
    await delete formState_arr['errors']['checkpoint_isrequried_' + id];
    await delete formState_arr['errors']['description_' + id];
    await setFormState(formState => ({
      ...formState,
      values: {
        ...formState_arr['values']
      },
      touched: {
        ...formState_arr['touched']
      },
      errors:{
        ...formState_arr['errors']
      }
    }));
  }

  const clientOnChange = (event, newValue) => {
    if(newValue){
      setClientValue(newValue)
      setClientId(newValue.id)
    }
    else{
      setClientValue(newValue)
      setClientId('')
    }
  }

  const setClientId = client_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'client_id':client_id
      },
      touched: {
        ...formState.touched,
        'client_id': true
      }
    }));
    dispatch(hideAuditFormSetupValidationError('client_id'))
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
    dispatch(hideAuditFormSetupValidationError('description'))
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
    dispatch(hideAuditFormSetupValidationError(event.target.name))
  }
  
  const handleCheckpointTitleChange = (event, id) =>{
    if(!isEmpty(checkpoints[id])){
      handleChange(event);

      setCheckpoints(checkpoints => ({
        ...checkpoints,
        [id]: {
          ...checkpoints[id],
          'title': event.target.value,
        },
      }));
    }  

  }

  const handleCheckpointIsrequriedChange = (event, id) =>{
    if(!isEmpty(checkpoints[id])){
      handleChange(event);

      setCheckpoints(checkpoints => ({
        ...checkpoints,
        [id]: {
          ...checkpoints[id],
          'is_required': event.target.checked,
        },
      }));
    }  

  }

  const handleCheckpointDescChange = (event, desc, id) =>{
    if(!isEmpty(checkpoints[id])){
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          ['description_'+id]: desc
        },
        touched: {
          ...formState.touched,
          ['description_'+id]: true
        }
      }));

      setCheckpoints(checkpoints => ({
        ...checkpoints,
        [id]: {
          ...checkpoints[id],
          'description': desc,
        },
      }));
    }  

  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (formState.isValid) {
      let form_data = formState.values;
      form_data['checkpoints'] = Object.values(checkpoints);
      dispatch(updateAuditFormSetup(form_data));
    }
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Update Audit Form Setup"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update Audit Form Setup" />
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
                    label="Form Name"
                    name="name"
                    onChange={handleChange}
                    value={formState.values.name || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <ClientDropdown
                    ClientValue={ClientValue}
                    setClientValue={setClientValue}
                    id="client_id"
                    name="client_id"
                    clientOnChange={clientOnChange}
                    selectedId={selectedClientId}
                    renderInput={(params) => <TextField {...params} size="small" label="Select Client" variant="outlined" error={hasError('client_id')} helperText={hasError('client_id') ? formState.errors.client_id[0] : null} />}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('passing_score')}
                    fullWidth
                    helperText={hasError('passing_score') ? formState.errors.passing_score[0] : null}
                    label="Passing Score"
                    name="passing_score"
                    onChange={handleChange}
                    value={formState.values.passing_score || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <StyledButton
                    color="bsucces"
                    size="small"
                    variant="outlined"
                    startIcon={<CheckBoxOutlinedIcon />}
                    onClick={addCheckPoints}
                  >
                    Add Checkpoint
                  </StyledButton>
                </Grid>
              </Grid> 
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}> 
                  {!isEmpty(checkpoints)?
                    <CheckPoint
                      checkpointsList={Object.values(checkpoints)}
                      formState={formState}
                      setFormState={setFormState}
                      hasError={hasError}
                      handleCheckpointDescChange={handleCheckpointDescChange}
                      handleCheckpointTitleChange={handleCheckpointTitleChange}
                      handleCheckpointIsrequriedChange={handleCheckpointIsrequriedChange}
                      setCheckpoints={setCheckpoints}
                      deleteCheckpoint={deleteCheckpoint}
                    /> 
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
                data={auditFormSetupState.auditFormSetupRecord.description || ''}
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
              Update Audit Form Setup
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToAuditFormSetupList()) }}
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

export default AuditFormSetupUpdate;
