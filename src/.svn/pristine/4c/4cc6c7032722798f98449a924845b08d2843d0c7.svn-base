import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {  StyledButton } from 'components';
import {
  saveSettings,
  getHREmailSettings,
  officesListFetch,
  hideSettingsValidationError,
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
import { isEmpty, forEach } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import { CK_CONFIGS } from 'configs';
import AccessRights from 'utils/AccessRights';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  projectDetails: {
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const schema = {
  email_0: {
    email: {
      message: "^Please enter valid email"
    }
  },
  email_1: {
    email: {
      message: "^Please enter valid email"
    }
  },
  email_2: {
    email: {
      message: "^Please enter valid email"
    }
  },
  email_3: {
    email: {
      message: "^Please enter valid email"
    }
  },
  email_4: {
    email: {
      message: "^Please enter valid email"
    }
  },
  email_5: {
    email: {
      message: "^Please enter valid email"
    }
  },
  email_6: {
    email: {
      message: "^Please enter valid email"
    }
  }
}  

const HREmails = (props) => {
  const { activeTab, ...other } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const settingsState = useSelector(state => state.settingsState);
  const officesState = useSelector(state => state.officesState);
  const session = useSelector(state => state.session);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
      'setting_type': 'OfficesHREmail',
      'settings': {},
      'setting_descriptor': {
        'setting_type': 'This settings is used to save HR Email against Office',
        'setting_key': 'Office Id',
        'setting_val': 'Human Resource Email'
      }
    },
    touched: {
      'object_viewed_id': true,
      'setting_type': true
    },
    errors: {}
  });

  useEffect(() => {
    dispatch(getHREmailSettings('OfficesHREmail', session.current_page_permissions.object_id));
    dispatch(officesListFetch(session.current_page_permissions.object_id));
  }, []);

  useEffect(() => {
    const e_settings = {};
    forEach(settingsState.settingsHREmail, function(set, key) {
      e_settings[set.setting_key] = set.setting_val;
    });
    setFormState(formState => ({
      ...formState,
      values:{
        ...formState.values,
        settings: e_settings
      }
    }))  
  }, [settingsState.settingsHREmail]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(settingsState.validation_error)) {
      const errors = settingsState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [settingsState.validation_error]);

  useEffect(() => {
    if (settingsState.redirect_to_list) {
      router.history.push('/settings');
    }
  }, [settingsState.redirect_to_list, router.history]);

  const handleChange = (event, office_id) => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
        settings:{
          ...formState.values.settings,
          [office_id]: event.target.value
        }   
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    dispatch(hideSettingsValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(saveSettings(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Card
      className={classes.projectDetails}
    >
      <CardContent>
        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.formGroup}>
            {!isEmpty(officesState.officesList)?
              <Grid container spacing={3} >
              {officesState.officesList.map((val, i) => (
                
                  <Grid item xs={6} sm={4} key={val.id}>
                    <TextField
                      error={hasError('email_'+i)}
                      fullWidth
                      helperText={hasError('email_'+i) ? formState.errors['email_'+i][0] : null}
                      label={val.name}
                      name={'email_'+i}
                      onChange={(e) => {handleChange(e, val.id)}}
                      value={formState.values.settings[val.id] || ''}
                      variant="outlined"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                 
              ))}
              </Grid> 
              : ''
            }  
          </div>
          { (AccessRights(session.current_page_permissions, 'add'))?
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Save Settings
            </StyledButton>
            :''
          }
        </form>

      </CardContent>
    </Card>
  );
};

export default HREmails;
