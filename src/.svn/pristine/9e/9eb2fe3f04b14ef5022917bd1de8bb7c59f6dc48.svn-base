import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton, FilesDropzone, AttachmentsPreviewer } from 'components';
import {
  Header
} from './components';
import {
  updateEmployeeAttrition,
  hideEmployeeAttritionValidationError,
  redirectToEmployeeAttritionList,
  employeeAttritionTypeListFetch,
  employeeAttritionDropdownListFetch,
  getAttachmentsByEmployeeAttritionId
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, find, forEach } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import { CK_CONFIGS, API_URL } from 'configs';
import { OfficesDropdown, ClientDropdown, EmployeeDropdown } from 'commonDropdowns';

const schema = {
  
  separation_date: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  attrition_type_id: {
    presence: { allowEmpty: false, message: '^ please select attrition type' },
  },
  attrition_reason_id: {
    presence: { allowEmpty: false, message: '^ please select attrition reason' },
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
  }
}));

const EmployeeAttritionUpdate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const employeeAttritionState = useSelector(state => state.employeeAttritionState);
  const employeeAttritionReasonState = useSelector(state => state.employeeAttritionReasonState);
  const session = useSelector(state => state.session);

  const [attritionTypeValue, setAttritionTypeValue] = useState(null);
  const [attritionReasonValue, setAttritionReasonValue] = useState(null);
  const [files, setFiles] = useState([]);
  const [serverFileErrors, setServerFileErrors] = useState([]);
  const [dropZoneConfig, setDropZoneConfig] = useState({
    maxSize: 5000000,
  });
  const [attachmentList, setAttachmentList] = useState([]);
  const [deletedAttachmentList, setDeletedAttachmentList] = useState([]);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
      separation_date: moment(moment().toDate()).format('YYYY-MM-DD'),
    },
    touched: {
      'object_viewed_id': true,
      separation_date: true,
    },
    errors: {}
  });

  useEffect(() => {
    dispatch(employeeAttritionTypeListFetch(session.current_page_permissions.object_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let record = employeeAttritionState.employeeAttritionRecord;
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'employee_id': record.employee_id,
        'office_id': record.office_id,
        'client_id': record.client_id,
        'attrition_type_id': record.attrition_type_id,
        'attrition_reason_id': record.attrition_reason_id,
        'separation_date': record.separation_date,
        'id': record.id,
        'description': record.description,
      },
      touched: {
        ...formState.touched,
        'employee_id': true,
        'office_id': true,
        'client_id': true,
        'attrition_type_id': true,
        'attrition_reason_id': true,
        'separation_date': true,
        'id': true,
        'description': true,
      }
    }));

    dispatch(getAttachmentsByEmployeeAttritionId(record.id))
    dispatch(employeeAttritionDropdownListFetch([record.attrition_type_id], session.current_page_permissions.object_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionState.employeeAttritionRecord]);

  useEffect(() => {
    let record = employeeAttritionState.employeeAttritionRecord;
    const item = find(employeeAttritionReasonState.employeeAttritionReasonParentsList, ['id', record.attrition_type_id]);
    setAttritionTypeValue(item);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionReasonState.employeeAttritionReasonParentsList]);

  useEffect(() => {
    if(isEmpty(employeeAttritionReasonState.employeeAttritionReasonDropdownList)){
      setAttritionReasonValue(null);
    }
    else{
      let record = employeeAttritionState.employeeAttritionRecord;
      const item = find(employeeAttritionReasonState.employeeAttritionReasonDropdownList, ['id', record.attrition_reason_id]);
      setAttritionReasonValue(item);
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionReasonState.employeeAttritionReasonDropdownList]);

  //selecting asset type 
  useEffect(() => {
    setAttachmentList(employeeAttritionState.employeeAttritionAttachmentList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionState.employeeAttritionAttachmentList]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(employeeAttritionState.validation_error)) {
      const errors = employeeAttritionState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [employeeAttritionState.validation_error]);

  useEffect(() => { 
    if (!isEmpty(employeeAttritionState.validation_error)) { 
      const errors = employeeAttritionState.validation_error;

      var files_error = {};
      
      forEach(errors, (err, i) => {
        let index_arr = i.split(".");
        if(index_arr[0] == 'attachments'){
          
          let findex = index_arr[1];
          
          let ferrs = [];
          forEach(err, (emsg, ei) => {
            ferrs[ei] = {
              'code': i+ei,
              'message': emsg
            }
          });
          
          files_error[findex] = {
            'file': {},
            'errors': {}
          }

          files_error[findex] = {
            ...files_error[findex],
            ['file']:{
              ...files_error[findex]['file'],
              'path': files[findex]['path'],
              'name': files[findex]['name'],
              'size': files[findex]['size'],
            },
            ['errors']: ferrs
          }
        }  

      });

      setServerFileErrors(Object.values(files_error));

    }  
      
  }, [employeeAttritionState.validation_error]);

  useEffect(() => {
    if (!employeeAttritionState.showUpdateForm && !employeeAttritionState.showViewPage) {
      router.history.push('/employee-attrition');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionState.showUpdateForm, employeeAttritionState.showViewPage]);

  useEffect(() => {
    if (employeeAttritionState.redirect_to_list) {
      router.history.push('/employee-attrition');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionState.redirect_to_list]);

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
    dispatch(hideEmployeeAttritionValidationError('description'))
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
    dispatch(hideEmployeeAttritionValidationError(event.target.name))
  }

  const attritionTypeOnChange = (event, newValue) => {
    if (newValue) {
      setAttritionTypeValue(newValue)
      setAttritionTypeId(newValue.id)
      dispatch(employeeAttritionDropdownListFetch([newValue.id], session.current_page_permissions.object_id));
    }
    else {
      setAttritionTypeValue(newValue)
      setAttritionTypeId('')
      dispatch(employeeAttritionDropdownListFetch([], session.current_page_permissions.object_id));
    }

    setAttritionReasonValue(null);
    setAttritionReasonId('');

  }

  const setAttritionTypeId = attrition_type_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'attrition_type_id': attrition_type_id
      },
      touched: {
        ...formState.touched,
        'attrition_type_id': true
      }
    }));
    dispatch(hideEmployeeAttritionValidationError('attrition_type_id'));
  }

  const attritionReasonOnChange = (event, newValue) => {
    if (newValue) {
      setAttritionReasonValue(newValue)
      setAttritionReasonId(newValue.id)
    }
    else {
      setAttritionReasonValue(newValue)
      setAttritionReasonId('')
    }
  }

  const setAttritionReasonId = attrition_reason_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'attrition_reason_id': attrition_reason_id
      },
      touched: {
        ...formState.touched,
        'attrition_reason_id': true
      }
    }));
    dispatch(hideEmployeeAttritionValidationError('attrition_reason_id'));
  }

  const delAttritionAttachment = async (e, record_id) => {
    e.preventDefault();
    deletedAttachmentList.push(record_id);
  }
  
  const downloadAttritionAttachment = (e, record_id) => {
    window.location.href = API_URL+'employeeAttrition/downloadAttritionAttachment?id='+record_id;
  }

  const handleSubmit = async event => {
    event.preventDefault();

    //apending media
    let data = new FormData();

    //appending form state to data object
    forEach(formState.values, function (value, key) {
      data.append(key, value);
    });

    if (!isEmpty(files)) {
      forEach(files, function(value) {
        data.append('attachments[]', value);
      });

    }

    if (!isEmpty(deletedAttachmentList)) {
      forEach(deletedAttachmentList, function(value) {
        data.append('deleted_attachment[]', value);
      });

    }

    dispatch(updateEmployeeAttrition(data));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Update Employee Attrition"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update Employee Attrition" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <Typography component="p">
                    <b>Office: </b> {!isEmpty(employeeAttritionState.employeeAttritionRecord)?employeeAttritionState.employeeAttritionRecord.office_name:''}
                  </Typography>
                
                </Grid>  
                <Grid item xs={6} sm={4}>
                  <Typography component="p">
                    <b> Client: </b> {!isEmpty(employeeAttritionState.employeeAttritionRecord)?employeeAttritionState.employeeAttritionRecord.client_name:''}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography component="p">
                    <b> Employee: </b> {!isEmpty(employeeAttritionState.employeeAttritionRecord)?employeeAttritionState.employeeAttritionRecord.employee_name:''}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className={classes.field}
                    value={formState.values.separation_date || ''}
                    fullWidth
                    label="Separation Date"
                    name="separation_date"
                    onChange={handleChange}
                    type="date"
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={hasError('separation_date')}
                    helperText={hasError('separation_date') ? formState.errors.separation_date[0] : null}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Autocomplete
                    id="attrition_type_id"
                    value={attritionTypeValue}
                    onChange={(event, newValue) => {
                      attritionTypeOnChange(event, newValue);
                    }}
                    options={employeeAttritionReasonState.employeeAttritionReasonParentsList}
                    getOptionLabel={(option) => option.opt_display}
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Select Attrition Type" variant="outlined" error={hasError('attrition_type_id')} helperText={hasError('attrition_type_id') ? formState.errors.attrition_type_id[0] : null} />}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Autocomplete
                    id="attrition_reason_id"
                    value={attritionReasonValue}
                    onChange={(event, newValue) => {
                      attritionReasonOnChange(event, newValue);
                    }}
                    options={employeeAttritionReasonState.employeeAttritionReasonDropdownList}
                    getOptionLabel={(option) => option.opt_display}
                    size="small"
                    disabled={isEmpty(formState.values.attrition_type_id)}
                    renderInput={(params) => <TextField {...params} label="Select Attrition Reason" variant="outlined" error={hasError('attrition_reason_id')} helperText={hasError('attrition_reason_id') ? formState.errors.attrition_reason_id[0] : null} />}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FilesDropzone
                    files={files}
                    setFiles={setFiles}
                    thumbsAt={'right'}
                    customDZconfigs={dropZoneConfig}
                    title={'Attrition Attachments'}
                    serverRejectedFiles={serverFileErrors}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <AttachmentsPreviewer 
                    attachmentList={attachmentList}
                    setAttachmentList={setAttachmentList}
                    deleteCallback={delAttritionAttachment} 
                    downloadCallback={downloadAttritionAttachment}
                    tempDeletedList={deletedAttachmentList}
                    colHeight={120}
                    noOfCols={10}
                  />
                </Grid>
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={employeeAttritionState.employeeAttritionRecord.description || ''}
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
              Update Employee Attrition
            </StyledButton> &nbsp; &nbsp;
            <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToEmployeeAttritionList()) }}
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

export default EmployeeAttritionUpdate;
