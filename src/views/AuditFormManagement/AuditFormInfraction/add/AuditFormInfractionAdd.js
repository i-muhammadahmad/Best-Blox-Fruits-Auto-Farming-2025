import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import { 
  addAuditFormInfraction,
  hideAuditFormInfractionValidationError,
  redirectToAuditFormInfractionList
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
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, map } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';
import { ClientDropdown, AuditFormInfractionCategoryDropdown } from 'commonDropdowns';

const schema = {
  name: {
    presence: { allowEmpty: false, message: '^Audit Form Infraction is required' },
  },
  client_ids: {
    presence: { allowEmpty: false, message: '^Client is required' },
  },
  category_id:{
    presence: { allowEmpty: false, message: '^Category is required' },
  },
  deduction_percentage: {
    presence: { allowEmpty: false, message: ' is required' },
    numericality: {
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 100,
    }
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

const AuditFormInfractionAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const auditFormInfractionState = useSelector(state => state.auditFormInfractionState);
  const session = useSelector(state => state.session);
  const [ClientValue, setClientValue] = useState([]);
  const [InfractionCategoryValue, setInfractionCategoryValue] = useState(null);

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
    if(!isEmpty(auditFormInfractionState.validation_error)){
      const errors = auditFormInfractionState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }  
  }, [auditFormInfractionState.validation_error]);

  useEffect(() => {
    if(auditFormInfractionState.redirect_to_list){
      router.history.push('/audit-form-infraction');
    } 
  }, [auditFormInfractionState.redirect_to_list, router.history]);

  const clientOnChange = (event, newValue) => {
    let camp_ids = [];
    if (newValue) {
      setClientValue(newValue)
      camp_ids = map(newValue, 'id')
      setClientIds(camp_ids)
    }
    else {
      setClientValue(newValue)
      setClientIds([])
    }
  }

  const setClientIds = client_ids => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'client_ids':client_ids
      },
      touched: {
        ...formState.touched,
        'client_ids': true
      }
    }));
    dispatch(hideAuditFormInfractionValidationError('client_ids'))
  }

  const infractionCategoryOnChange = (event, newValue) => {
    if(newValue){
      setInfractionCategoryValue(newValue)
      setInfractionCategoryId(newValue.id)
    }
    else{
      setInfractionCategoryValue(newValue)
      setInfractionCategoryId('')
    }
  }

  const setInfractionCategoryId = category_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'category_id': category_id
      },
      touched: {
        ...formState.touched,
        'category_id': true
      }
    }));
    dispatch(hideAuditFormInfractionValidationError('category_id'))
  }

  const setDescription = description => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'description':description
      },
      touched: {
        ...formState.touched,
        'description': true
      }
    }));
    dispatch(hideAuditFormInfractionValidationError('description'))
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
    dispatch(hideAuditFormInfractionValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(addAuditFormInfraction(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Add Audit Form Infraction"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Add Audit Form Infraction" />
        <CardContent>
        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.formGroup}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4}>
                <AuditFormInfractionCategoryDropdown
                  InfractionCategoryValue={InfractionCategoryValue}
                  setInfractionCategoryValue={setInfractionCategoryValue}
                  id="category_id"
                  name="category_id"
                  infractionCategoryOnChange={infractionCategoryOnChange}
                  renderInput={(params) => <TextField {...params} size="small" label="Select Category" variant="outlined" error={hasError('category_id')} helperText={hasError('category_id') ? formState.errors.category_id[0] : null} />}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  error={hasError('name')}
                  fullWidth
                  helperText={hasError('name') ? formState.errors.name[0] : null}
                  label="Infraction Name"
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
                  id="client_ids"
                  name="client_ids"
                  clientOnChange={clientOnChange}
                  showSelectAllOption={true}
                  multiple={true}
                  limitTags={2}
                  renderInput={(params) => <TextField {...params} size="small" label="Select Client" variant="outlined" error={hasError('client_ids')} helperText={hasError('client_ids') ? formState.errors.client_ids[0] : null} />}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  error={hasError('deduction_percentage')}
                  fullWidth
                  helperText={hasError('deduction_percentage') ? formState.errors.deduction_percentage[0] : null}
                  label="Score Deduction Percentage"
                  name="deduction_percentage"
                  onChange={handleChange}
                  value={formState.values.deduction_percentage || ''}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.formGroup}>
            <CKEditor
              editor={ ClassicEditor }
              config={CK_CONFIGS(localStorage.getItem("token"))}
              data={formState.values.description || ''}
              onChange={ ( event, editor ) => {
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
            startIcon={<SaveIcon/>}
          >
            Create Audit Form Infraction
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
            variant="contained"
            color="blight"
            size="small"
            onClick={ ()=>{ dispatch(redirectToAuditFormInfractionList()) } }
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

export default AuditFormInfractionAdd;
