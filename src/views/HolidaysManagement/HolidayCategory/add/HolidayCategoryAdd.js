import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  addHolidayCategory,
  hideHolidayCategoryValidationError,
  holidayCategoryParentListFetch,
  redirectToHolidayCategoryList
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
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';

const schema = {
  opt_display: {
    presence: { allowEmpty: false, message: '^Holiday Category is required' },
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

const HolidayCategoryAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const holidayCategoryState = useSelector(state => state.holidayCategoryState);
  const session = useSelector(state => state.session);

  const [ParentValue, setParentValue] = useState(null);
  const [showParent, setShowParent] = useState(false);
  const [countryid, setcountryid] = useState(null);

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
    dispatch(holidayCategoryParentListFetch());
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
    if (!isEmpty(holidayCategoryState.validation_error)) {
      const errors = holidayCategoryState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [holidayCategoryState.validation_error]);

  useEffect(() => {
    if (holidayCategoryState.redirect_to_list) {
      router.history.push('/holiday-category');
    }
  }, [holidayCategoryState.redirect_to_list, router.history]);

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
    dispatch(hideHolidayCategoryValidationError('parent_id'))
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
    dispatch(hideHolidayCategoryValidationError('description'))
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
    dispatch(hideHolidayCategoryValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(addHolidayCategory(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const addParent = () => {
    setShowParent(true)
  }

  return (
    <Page
      className={classes.root}
      title="Add Holiday Category"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Add Holiday Category" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                  {(holidayCategoryState.holidayCategoryParentsList && showParent) ?
                    <Autocomplete
                      id="parent_id"
                      value={ParentValue}
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
                      options={holidayCategoryState.holidayCategoryParentsList}
                      getOptionLabel={(option) => option.opt_display}
                      renderInput={(params) => <TextField {...params} label="Select Parent Category" size="small" variant="outlined" error={hasError('parent_id')} helperText={hasError('parent_id') ? formState.errors.parent_id[0] : null} />}
                    />

                    : ''}
                  {(showParent === false) ?

                    <StyledButton
                      color="bsuccess"
                      size="small"
                      type="button"
                      variant="contained"
                      onClick={addParent}
                    >
                      Add Parent Holiday Category
                    </StyledButton>
                    : ''}
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  {/*(holidayCategoryState.officeList) ?
                    <Autocomplete
                      id="parent_id"
                      value={ParentValue}
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
                      options={holidayCategoryState.officeList}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} label="Select Office" size="small" variant="outlined" error={hasError('parent_id')} helperText={hasError('parent_id') ? formState.errors.parent_id[0] : null} />}
                    />

                    : ''*/}
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
              Create Holiday Category
            </StyledButton> &nbsp; &nbsp;
            <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToHolidayCategoryList()) }}
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

export default HolidayCategoryAdd;
