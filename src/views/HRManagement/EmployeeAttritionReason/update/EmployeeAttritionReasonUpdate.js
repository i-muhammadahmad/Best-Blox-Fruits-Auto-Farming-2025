import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  updateEmployeeAttritionReason,
  hideEmployeeAttritionReasonValidationError,
  employeeAttritionTypeListFetch,
  redirectToEmployeeAttritionReasonList
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
    presence: { allowEmpty: false, message: '^Employee Attrition Reason is required' },
  },
  parent_id: {
    presence: { allowEmpty: false, message: '^Please Select Employee Attrition Type' },
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

const EmployeeAttritionReasonUpdate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const employeeAttritionReasonState = useSelector(state => state.employeeAttritionReasonState);
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
    dispatch(employeeAttritionTypeListFetch(session.current_page_permissions.object_id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let record = employeeAttritionReasonState.employeeAttritionReasonRecord
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

    const item = find(employeeAttritionReasonState.employeeAttritionReasonParentsList, ['id', record.parent_id])
    setParentValue(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionReasonState.employeeAttritionReasonParentsList])

  useEffect(() => {
    if (!employeeAttritionReasonState.showUpdateForm && !employeeAttritionReasonState.showViewPage) {
      router.history.push('/attrition-reasons');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionReasonState.showUpdateForm, employeeAttritionReasonState.showViewPage]);

  useEffect(() => {
    if (employeeAttritionReasonState.redirect_to_list) {
      router.history.push('/attrition-reasons');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttritionReasonState.redirect_to_list]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(employeeAttritionReasonState.validation_error)) {
      const errors = employeeAttritionReasonState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [employeeAttritionReasonState.validation_error]);



  const setParentId = parent_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'parent_id': parent_id
      },
      touched: {
        ...formState.touched,
        'parent_id': true
      }
    }));
    dispatch(hideEmployeeAttritionReasonValidationError('parent_id'))
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
    dispatch(hideEmployeeAttritionReasonValidationError('description'))
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
    dispatch(hideEmployeeAttritionReasonValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(updateEmployeeAttritionReason(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;


  return (
    <Page
      className={classes.root}
      title="Update Employee Attrition Reason"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update Employee Attrition Reason" />
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
                    label="Employee Attrition Reason"
                    name="opt_display"
                    onChange={handleChange}
                    value={formState.values.opt_display || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  {
                    <Autocomplete
                      id="parent_id"
                      value={ParentValue  || null}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setParentValue(newValue)
                          setParentId(newValue.id)
                        }
                        else {
                          setParentValue(newValue)
                          setParentId('')
                        }

                      }}
                      options={employeeAttritionReasonState.employeeAttritionReasonParentsList}
                      getOptionLabel={(option) => option.opt_display}
                      size="small"
                      renderInput={(params) => <TextField {...params} label="Select Employee Attrition Type" variant="outlined" error={hasError('parent_id')} helperText={hasError('parent_id') ? formState.errors.parent_id[0] : null} />}
                    />

                    }

                </Grid>
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={employeeAttritionReasonState.employeeAttritionReasonRecord.description || ''}
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
              Update Employee Attrition Reason
          </StyledButton>&nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToEmployeeAttritionReasonList()) }}
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

export default EmployeeAttritionReasonUpdate;
