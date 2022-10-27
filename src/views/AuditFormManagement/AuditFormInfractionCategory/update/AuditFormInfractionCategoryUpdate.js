import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import { 
  updateAuditFormInfractionCategory,
  hideAuditFormInfractionCategoryValidationError,
  auditFormInfractionCategoryParentListFetch,
  redirectToAuditFormInfractionCategoryList
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
import { isEmpty, find } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';

const schema = {
  opt_display: {
    presence: { allowEmpty: false, message: '^Audit Form Infraction Category is required' },
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

const AuditFormInfractionCategoryUpdate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const auditFormInfractionCategoryState = useSelector(state => state.auditFormInfractionCategoryState);
  const session = useSelector(state => state.session);

  const [ParentValue, setParentValue] = useState(null);

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
    dispatch(auditFormInfractionCategoryParentListFetch(session.current_page_permissions.object_id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let record = auditFormInfractionCategoryState.auditFormInfractionCategoryRecord
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'description': record.description,
        'parent_id': record.parent_id,
        'opt_display': record.opt_display,
        'id': record.id
      },
      touched: {
        ...formState.touched,
        'description': true,
        'parent_id': true,
        'opt_display': true,
        'id': true
      }
    }));

    const item = find(auditFormInfractionCategoryState.auditFormInfractionCategoryParentsList, ['id', record.parent_id])
    setParentValue(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditFormInfractionCategoryState.auditFormInfractionCategoryParentsList])

  useEffect(()=> {
    if(!auditFormInfractionCategoryState.showViewPage && !auditFormInfractionCategoryState.showUpdateForm){
      router.history.push('/audit-form-infraction-category');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auditFormInfractionCategoryState.showViewPage, auditFormInfractionCategoryState.showUpdateForm]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if(!isEmpty(auditFormInfractionCategoryState.validation_error)){
      const errors = auditFormInfractionCategoryState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }  
  }, [auditFormInfractionCategoryState.validation_error]);

  useEffect(() => {
    if(auditFormInfractionCategoryState.redirect_to_list){
      router.history.push('/audit-form-infraction-category');
    } 
  }, [auditFormInfractionCategoryState.redirect_to_list, router.history]);

  const setParentId = parent_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'parent_id':parent_id
      },
      touched: {
        ...formState.touched,
        'parent_id': true
      }
    }));
    dispatch(hideAuditFormInfractionCategoryValidationError('parent_id'))
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
    dispatch(hideAuditFormInfractionCategoryValidationError('description'))
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
    dispatch(hideAuditFormInfractionCategoryValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(updateAuditFormInfractionCategory(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
 

  return (
    <Page
      className={classes.root}
      title="Update Audit Form Infraction Category"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update Audit Form Infraction Category" />
        <CardContent>
        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.formGroup}>
            <Grid container spacing={3}>
            <Grid item xs={6} sm={4}>
              <TextField
                error={hasError('opt_display')}
                fullWidth
                helperText={hasError('opt_display') ? formState.errors.opt_display[0] : null}
                label="Category Name"
                name="opt_display"
                onChange={handleChange}
                value={formState.values.opt_display || ''}
                variant="outlined"
                size="small"
              />
            </Grid>  
            <Grid item xs={6} sm={4}>
            {(auditFormInfractionCategoryState.auditFormInfractionCategoryParentsList)?
            <Autocomplete
              id="parent_id"
              value={ParentValue}
              onChange={(event, newValue) => {
                if(newValue){
                  setParentValue(newValue)
                  setParentId(newValue.id)
                }
                else{
                  setParentValue(newValue)
                  setParentId('')
                }
                
              }}
              options={auditFormInfractionCategoryState.auditFormInfractionCategoryParentsList}
              getOptionLabel={(option) => option.opt_display}
              size="small"
              renderInput={(params) => <TextField {...params} size="small" label="Select Parent Category" variant="outlined" error={hasError('parent_id')} helperText={hasError('parent_id') ? formState.errors.parent_id[0] : null} />}
            />
            
            :''}
            
            </Grid>
            </Grid>
          </div>
          <div className={classes.formGroup}>
            <CKEditor
              editor={ ClassicEditor }
              config={CK_CONFIGS(localStorage.getItem("token"))}
              data={auditFormInfractionCategoryState.auditFormInfractionCategoryRecord.description || ''}
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
            Update Audit Form Infraction Category
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
            variant="contained"
            color="blight"
            size="small"
            onClick={ ()=>{ dispatch(redirectToAuditFormInfractionCategoryList()) } }
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

export default AuditFormInfractionCategoryUpdate;
