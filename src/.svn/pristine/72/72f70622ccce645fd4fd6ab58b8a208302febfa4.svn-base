import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { 
  TextField,
  makeStyles,
  Backdrop,
  Grid,
  FormControl,
  Select,
  FormHelperText,
  InputLabel,
  MenuItem,
  Card,
  CardContent,
  CardHeader, 
  Divider
} from '@material-ui/core';
import { StyledButton } from 'components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addMeetingNotes,
  updateMeetingNotes,
  hideMeetingNotesValidationError,
  redirectToMeetingNotesList
} from 'actions';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import validate from 'validate.js';
import { isEmpty, filter } from 'lodash';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CK_CONFIGS } from 'configs';
import moment from 'moment';

const schema = {
  title: {
    presence: { allowEmpty: false, message: '^Please Select Meeting Type' },
  },
  type: {
    presence: { allowEmpty: false, message: '^Please Select Meeting Type' },
  },
  date: {
    presence: { allowEmpty: false, message: '^Meeting Date is required' },
  },
  time: {
    presence: { allowEmpty: false, message: '^Meeting Time is required' },
  }
}

const useStylesModal = makeStyles((theme) => ({
    root: {},
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const AddUpdateModel = (props) => {

  const { 
    formAction,
    setFormAction,
    ...rest
  } = props;
  const classes = useStylesModal();

  const meetingNotesState = useSelector(state => state.meetingNotesState);
  const clientState = useSelector(state => state.clientState);
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();
  //finding meeting notes permissions against code
  const meeting_note_per = filter(session.user_Permissions, function(item){
    if(!isEmpty(item.permission_object)){
      return item.permission_object.object_code === 'meeting_notes';
    }
  });

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': meeting_note_per[0].object_id,
      'client_id': clientState.clientRecord.id,
      'date': moment(moment().toDate()).format('YYYY-MM-DD'),
      'time': moment(moment().toDate()).format('HH:mm:ss')
    },
    touched: {
      'object_viewed_id': true,
      'client_id': true,
      'date': true,
      'time': true,
    },
    errors: {}
  });

  useEffect(() => {
    if(formAction === 'Update'){
      let record = meetingNotesState.meetingNotesRecord;
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          'notes': record.notes,
          'title': record.title,
          'type': record.type,
          'date': record.date,
          'time': record.time,
          'id': record.id
        },
        touched: {
          ...formState.touched,
          'notes': true,
          'title': true,
          'type': true,
          'date': true,
          'time': true,
          'id': true
        }
      }));
    }  
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
    if (!isEmpty(meetingNotesState.validation_error)) {
      const errors = meetingNotesState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [meetingNotesState.validation_error]);

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
    dispatch(hideMeetingNotesValidationError(event.target.name))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isEmpty(clientState.clientRecord.id)) {
      let data = formState.values;
      data['client_id'] = clientState.clientRecord.id;

      if (isEmpty(formState.values.id)) {
        dispatch(addMeetingNotes(data));
      }
      else {
        dispatch(updateMeetingNotes(data));
      }
    }
    else {
      alert('Please Select Client');
    }

    resetForm();

  }

  const handleClose = () => {
    dispatch(redirectToMeetingNotesList());
    resetForm();
  }

  const resetForm = () => {
    setFormState(formState => ({
      isValid: false,
      values: {
        'object_viewed_id': meeting_note_per[0].object_id,
        'client_id': clientState.clientRecord.id,
        'date': moment(moment().toDate()).format('YYYY-MM-DD'),
        'time': moment(moment().toDate()).format('HH:mm:ss')
      },
      touched: {
        'object_viewed_id': true,
        'client_id': true,
        'date': true,
        'time': true,
      },
      errors: {}
    }));
    setFormAction('Add');
  }

  const setNotes = notes => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'notes': notes
      },
      touched: {
        ...formState.touched,
        'notes': true
      }
    }));
    dispatch(hideMeetingNotesValidationError('notes'))
  }

  const getNotesDefaultValue = () => {
    if(formAction === 'Update'){ 
      let record = meetingNotesState.meetingNotesRecord;
      return (record.notes || '');
    }  
    return (formState.values.notes || '');
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div>
      <Card>
        <CardHeader
          title={formAction + " Meeting Notes"}
        />
        <Divider />
        <CardContent className={classes.content}>
            <form
              onSubmit={handleSubmit}
              style={{marginTop: '6px'}}
            >
              <div className={classes.formGroup}>
                <Grid container spacing={3} id="meeting_note_form">
                  <Grid item xs={12} sm={12}>
                    <Grid container spacing={3}>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          error={hasError('title')}
                          fullWidth
                          helperText={hasError('title') ? formState.errors.title[0] : null}
                          label="Meeting Title"
                          name="title"
                          onChange={handleChange}
                          value={formState.values.title || ''}
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          id="type"
                          name="type"
                          error={hasError('type')}
                          fullWidth
                          helperText={hasError('type') ? formState.errors.type[0] : null}
                          label="Please select Notes Type"
                          select
                          value={formState.values.type || ''}
                          onChange={handleChange}
                          variant="outlined"
                          size="small"
                        >
                          <MenuItem key={'meeting'} value={'meeting'}>{'Meeting'}</MenuItem>
                          <MenuItem key={'phone_call'} value={'phone_call'}>{'Phone Call'}</MenuItem>
                          <MenuItem key={'email'} value={'email'}>{'Email'}</MenuItem>
                          <MenuItem key={'chat'} value={'chat'}>{'Chat'}</MenuItem>
                          <MenuItem key={'conversation'} value={'conversation'}>{'Conversation'}</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          error={hasError('date')}
                          fullWidth
                          helperText={hasError('date') ? formState.errors.date[0] : null}
                          label="Meeting Date"
                          name="date"
                          onChange={handleChange}
                          value={formState.values.date || ''}
                          type="date"
                          variant="outlined"
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <TextField
                          error={hasError('time')}
                          fullWidth
                          helperText={hasError('time') ? formState.errors.time[0] : null}
                          label="Meeting Time"
                          name="time"
                          onChange={handleChange}
                          value={formState.values.time || ''}
                          type="time"
                          variant="outlined"
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <br />
                    <div className={classes.formGroup}>
                      <CKEditor
                        editor={ClassicEditor}
                        config={CK_CONFIGS(localStorage.getItem("token"))}
                        data={getNotesDefaultValue()}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setNotes(data)
                        }}
                      />
                      <FormControl error={hasError('notes')} >
                        <FormHelperText component='div' id="component-error-text">{hasError('notes') ? formState.errors.notes[0] : null}</FormHelperText>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <StyledButton
                      color="bprimary"
                      disabled={!formState.isValid}
                      size="small"
                      type="button"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSubmit}
                    >
                      {formAction+" Meeting Notes"}
                    </StyledButton> &nbsp; &nbsp;
                    <StyledButton
                      variant="contained"
                      color="blight"
                      size="small"
                      startIcon={<CancelIcon />}
                      onClick={() => { handleClose() }}
                    >
                      CLOSE
                    </StyledButton>
                  </Grid>
                </Grid>
              </div>
            </form>
        </CardContent>
      </Card>  
      
    </div>
  );
}

export default AddUpdateModel;