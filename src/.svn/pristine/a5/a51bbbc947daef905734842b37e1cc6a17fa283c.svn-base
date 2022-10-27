import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  addTranscribeConfig,
  hideTranscribeConfigValidationError,
  redirectToTranscribeConfigList,
  verifyTranscribeConfigFTP
} from 'actions'
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
  Checkbox,
  Paper ,
  Typography,
  Switch
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import { CK_CONFIGS } from 'configs';
import { ClientDropdown } from 'commonDropdowns';

const schema = {
  mis_client_id: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  ftp_server: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  ftp_port: {
    presence: { allowEmpty: false, message: ' is required' },
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    }
  },
  ftp_username: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  ftp_password: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  folder_url: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  limit_file_size: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  /*transcript_min_size_limit: {
    presence: { allowEmpty: false, message: ' is required' },
    numericality: {
      greaterThan: 0,
    }
  },
  transcript_max_size_limit: {
    presence: { allowEmpty: false, message: ' is required' },
    numericality: {
      greaterThan: 0,
    }
  },*/
  transcript_percentage: {
    presence: { allowEmpty: false, message: ' is required' },
    numericality: {
      greaterThan: 0,
    }
  },
  is_ftp_verified: {
    presence: { allowEmpty: false, message: '^ FTP is not verified' },
    inclusion: {
      within: [true,1,'1','true'],
      message: '^ FTP is not verified'
    }
  },
  enable_config: {
    presence: { allowEmpty: false, message: '^ FTP is not verified' },
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
  paperStyling: {
    padding: theme.spacing(3, 2, 3, 2)
  }
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TranscribeConfigAdd = () => {
  const classes = useStyles();
  const radio_classes = useRadioStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const transcribeConfigState = useSelector(state => state.transcribeConfigState);
  const session = useSelector(state => state.session);

  const [ClientValue, setClientValue] = useState(null);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'is_dialing_client': false,
      'transcript_percentage': '100',
      'limit_file_size': false,
      'enable_config': true,
      'object_viewed_id': session.current_page_permissions.object_id,
    },
    touched: {
      'is_dialing_client': true,
      'transcript_percentage': true,
      'limit_file_size': true,
      'enable_config': true,
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
    if (!isEmpty(transcribeConfigState.validation_error)) {
      const errors = transcribeConfigState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [transcribeConfigState.validation_error]);

  useEffect(() => {
    if (transcribeConfigState.redirect_to_list) {
      router.history.push('/transcribe-config');
    }
  }, [transcribeConfigState.redirect_to_list, router.history]);

  useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'is_ftp_verified': transcribeConfigState.is_ftp_verified
      },
      touched: {
        ...formState.touched,
        'is_ftp_verified' : true
      }
    }));
  }, [transcribeConfigState.is_ftp_verified]);

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

  const setClientId = mis_client_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'mis_client_id': mis_client_id
      },
      touched: {
        ...formState.touched,
        'mis_client_id': true
      }
    }));
    dispatch(hideTranscribeConfigValidationError('mis_client_id'))
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
    dispatch(hideTranscribeConfigValidationError('description'))
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
    dispatch(hideTranscribeConfigValidationError(event.target.name))
  }

  const setIsFTPVerified = (is_ftp_verified) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'is_ftp_verified': is_ftp_verified
      },
      touched: {
        ...formState.touched,
        'is_ftp_verified' : true
      }
    }));
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(addTranscribeConfig(formState.values));
  }

  const verifyFTP = event => {
    dispatch(verifyTranscribeConfigFTP(formState.values));
    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        'ftp_server' : true,
        'ftp_port' : true,
        'ftp_username' : true,
        'ftp_password' : true,
      }
    }));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Add Transcribe Config"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Add Transcribe Config" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Paper elevation={3} className={classes.paperStyling} >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <Typography variant="h4" gutterBottom>
                          Client
                        </Typography>
                      </Grid>   
                      <Grid item xs={12} sm={12}>
                        <ClientDropdown
                          ClientValue={ClientValue}
                          setClientValue={setClientValue}
                          id="mis_client_id"
                          name="mis_client_id"
                          clientOnChange={clientOnChange}
                          renderInput={(params) => <TextField {...params} size="small" label="Select Client" variant="outlined" error={hasError('mis_client_id')} helperText={hasError('mis_client_id') ? formState.errors.mis_client_id[0] : null} />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox checked={formState.values.is_dialing_client || false} onChange={handleChange} name="is_dialing_client" />}
                            label="Is Dailing Client"
                          />
                          <FormControl error={hasError('is_dialing_client')} >
                            <FormHelperText id="component-error-text">{hasError('is_dialing_client') ? formState.errors.is_dialing_client[0] : null}</FormHelperText>
                          </FormControl>
                        </FormGroup>  
                      </Grid> 
                      <Grid item xs={12} sm={12}>
                        <TextField
                          error={hasError('folder_url')}
                          fullWidth
                          helperText={hasError('folder_url') ? formState.errors.folder_url[0] : null}
                          label="Folder Url"
                          name="folder_url"
                          onChange={handleChange}
                          value={formState.values.folder_url || ''}
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormGroup >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={formState.values.limit_file_size || false}
                                onChange={handleChange}
                                name="limit_file_size"
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
                            label="Limit File Size"
                          />
                        </FormGroup>
                        <FormControl error={hasError('limit_file_size')} >
                          <FormHelperText id="component-error-text">{hasError('limit_file_size') ? formState.errors.limit_file_size[0] : null}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={hasError('transcript_min_size_limit')}
                          disabled={!formState.values.limit_file_size}
                          fullWidth
                          helperText={hasError('transcript_min_size_limit') ? formState.errors.transcript_min_size_limit[0] : null}
                          label="Min Size Limit"
                          name="transcript_min_size_limit"
                          onChange={handleChange}
                          value={formState.values.transcript_min_size_limit || ''}
                          variant="outlined"
                          size="small"
                          type="number"
                          inputProps={{
                            'min': 0
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          error={hasError('transcript_max_size_limit')}
                          disabled={!formState.values.limit_file_size}
                          fullWidth
                          helperText={hasError('transcript_max_size_limit') ? formState.errors.transcript_max_size_limit[0] : null}
                          label="Max Size Limit"
                          name="transcript_max_size_limit"
                          onChange={handleChange}
                          value={formState.values.transcript_max_size_limit || ''}
                          variant="outlined"
                          size="small"
                          type="number"
                          inputProps={{
                            'min': 0
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          error={hasError('transcript_percentage')}
                          fullWidth
                          helperText={hasError('transcript_percentage') ? formState.errors.transcript_percentage[0] : null}
                          label="Transcript Percentage"
                          name="transcript_percentage"
                          onChange={handleChange}
                          value={formState.values.transcript_percentage || ''}
                          variant="outlined"
                          size="small"
                          type="number"
                          inputProps={{
                            'min': 0
                          }}
                        />
                      </Grid>
                    </Grid>  
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={3} className={classes.paperStyling} >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} >
                            <Typography variant="h4" gutterBottom>
                              FTP
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextField
                              error={hasError('ftp_server')}
                              fullWidth
                              helperText={hasError('ftp_server') ? formState.errors.ftp_server[0] : null}
                              label="FTP Server"
                              name="ftp_server"
                              onChange={(e)=>{handleChange(e); setIsFTPVerified(false);}}
                              value={formState.values.ftp_server || ''}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>    
                            <TextField
                              error={hasError('ftp_port')}
                              fullWidth
                              helperText={hasError('ftp_port') ? formState.errors.ftp_port[0] : null}
                              label="FTP Port"
                              name="ftp_port"
                              onChange={(e)=>{handleChange(e); setIsFTPVerified(false);}}
                              value={formState.values.ftp_port || ''}
                              variant="outlined"
                              size="small"
                              type="number"
                              inputProps={{
                                'min': 0
                              }}
                            />
                          </Grid> 
                          <Grid item xs={12} sm={12}>
                            <TextField
                              error={hasError('ftp_username')}
                              fullWidth
                              helperText={hasError('ftp_username') ? formState.errors.ftp_username[0] : null}
                              label="FTP Username"
                              name="ftp_username"
                              onChange={(e)=>{handleChange(e); setIsFTPVerified(false);}}
                              value={formState.values.ftp_username || ''}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextField
                              error={hasError('ftp_password')}
                              fullWidth
                              helperText={hasError('ftp_password') ? formState.errors.ftp_password[0] : null}
                              label="FTP Password"
                              name="ftp_password"
                              onChange={(e)=>{handleChange(e); setIsFTPVerified(false);}}
                              value={formState.values.ftp_password || ''}
                              variant="outlined"
                              size="small"
                              type="password"
                            />
                          </Grid> 
                          <Grid item xs={12} sm={12}>
                            <StyledButton
                              color="bsuccess"
                              size="small"
                              type="button"
                              variant="contained"
                              startIcon={<CheckBoxOutlinedIcon />}
                              onClick={(e)=>{verifyFTP()}}
                            >
                              Validate FTP
                            </StyledButton>
                          </Grid>
                        </Grid> 
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={3} className={classes.paperStyling} >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12}>
                            <Typography variant="h4" gutterBottom>
                              Notifications
                            </Typography>
                          </Grid>  
                          <Grid item xs={12} sm={12}>
                            <Alert severity="info">
                              Note! If "Is Dailing Client" is checked then "Folder Url" must be the excat path of that "Dailing Client Folder".
                              <br/>
                              <br/>
                              If "Is Dailing Client" is unchecked then "Folder Url" must be root directory of "Dailing Cmapaigns".
                            </Alert>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            {hasError('is_ftp_verified') ?
                              <Alert severity="error">{formState.errors.is_ftp_verified[0]}!</Alert>
                              :
                              <Alert severity="success">FTP is verified!</Alert>
                            }
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Paper elevation={3} className={classes.paperStyling} >
                        <FormGroup >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={formState.values.enable_config}
                                onChange={handleChange}
                                name="enable_config"
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
                            label="Enable Configration"
                          />
                          <FormControl error={hasError('enable_config')} >
                            <FormHelperText id="component-error-text">{hasError('enable_config') ? formState.errors.enable_config[0] : null}</FormHelperText>
                          </FormControl>
                        </FormGroup>
                      </Paper>  
                    </Grid>
                  </Grid>
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
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Create Transcribe Config
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToTranscribeConfigList()) }}
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

export default TranscribeConfigAdd;
