import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  addLeaveType,
  hideLeaveTypeValidationError,
  redirectToLeaveTypeList
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
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';
import { OfficesDropdown } from 'commonDropdowns';

const schema = {
  name: {
    presence: { allowEmpty: false, message: '^Leave Type is required' },
  },
  office_id: {
    presence: { allowEmpty: false, message: '^Please select office' },
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

const LeaveTypeAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const leaveTypeState = useSelector(state => state.leaveTypeState);
  const session = useSelector(state => state.session);

  const [OfficeValue, setOfficeValue] = useState(null);

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
    if (!isEmpty(leaveTypeState.validation_error)) {
      const errors = leaveTypeState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [leaveTypeState.validation_error]);

  useEffect(() => {
    if (leaveTypeState.redirect_to_list) {
      router.history.push('/leave-type');
    }
  }, [leaveTypeState.redirect_to_list, router.history]);

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
    dispatch(hideLeaveTypeValidationError('description'))
  }

  const officeOnChange = (event, newValue) => {
    if (newValue) {
      setOfficeValue(newValue)
      setOfficeId(newValue.id)
    }
    else {
      setOfficeValue(newValue)
      setOfficeId('')
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
    dispatch(hideLeaveTypeValidationError('office_id'))
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
    dispatch(hideLeaveTypeValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(addLeaveType(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Add Leave Type"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Add Leave Type" />
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
                    label="Leave Type"
                    name="name"
                    onChange={handleChange}
                    value={formState.values.name || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <OfficesDropdown
                    OfficeValue={OfficeValue}
                    setOfficeValue={setOfficeValue}
                    id="office_id"
                    name="office_id"
                    officeOnChange={officeOnChange}
                    renderInput={(params) => <TextField {...params} label="Select Office" variant="outlined" error={hasError('office_id')} helperText={hasError('office_id') ? formState.errors.office_id[0] : null} />}
                  />
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
              Create Leave Type
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToLeaveTypeList()) }}
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

export default LeaveTypeAdd;
