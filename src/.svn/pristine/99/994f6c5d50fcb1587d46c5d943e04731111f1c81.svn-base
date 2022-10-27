import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  updateObjects,
  hideObjectsValidationError,
  redirectToObjectsList,
  objectTypesListFetch,
  objectsParentListFetch,
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
  Switch
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
  name: {
    presence: { allowEmpty: false, message: ' is required' },
  },
  type_id: {
    presence: { allowEmpty: false, message: '^ Please select object type' },
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

const ObjectsUpdate = () => {
  const classes = useStyles();
  const radio_classes = useRadioStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const objectsState = useSelector(state => state.objectsState);
  const objectTypesState = useSelector(state => state.objectTypesState);
  const session = useSelector(state => state.session);

  const [ObjectTypeValue, setObjectTypeValue] = useState(null);
  const [ParentValue, setParentValue] = useState(null);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      show_in_menu: false,
      'object_viewed_id': session.current_page_permissions.object_id,
    },
    touched: {
      show_in_menu: true,
      'object_viewed_id': true,
    },
    errors: {}
  });

  useEffect(() => {
    let record = objectsState.objectsRecord
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'name': record.name,
        'type_id': record.type_id,
        'parent_id': record.parent_id,
        'object_url': record.object_url,
        'show_in_menu': (record.show_in_menu === 'y') ? true : false,
        'menu_order': record.menu_order,
        'menu_icon': record.menu_icon,
        'id': record.id,
        'description': record.description,
      },
      touched: {
        ...formState.touched,
        'name': true,
        'type_id': true,
        'parent_id': true,
        'object_url': true,
        'show_in_menu': true,
        'menu_order': true,
        'menu_icon': true,
        'id': true,
        'description': true,
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsState.objectsRecord])

  useEffect(() => {
    dispatch(objectTypesListFetch(session.current_page_permissions.object_id))
  }, []);


  useEffect(() => {
    if (!isEmpty(objectTypesState.objectTypesList)) {
      let record = objectsState.objectsRecord
      const item = find(objectTypesState.objectTypesList, ['id', record.type_id])
      setObjectTypeValue(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectTypesState.objectTypesList]);

  useEffect(() => {
    if (!isEmpty(ObjectTypeValue)) {
      dispatch(objectsParentListFetch(session.current_page_permissions.object_id, ObjectTypeValue.id, ObjectTypeValue.opt_display))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ObjectTypeValue]);

  useEffect(() => {
    if (!isEmpty(objectsState.objectsParentsList)) {
      let record = objectsState.objectsRecord
      const item = find(objectsState.objectsParentsList, ['id', record.parent_id])
      setParentValue(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsState.objectsParentsList]);

  useEffect(() => {
    if (!objectsState.showViewPage && !objectsState.showUpdateForm) {
      router.history.push('/objects');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectsState.showViewPage, objectsState.showUpdateForm]);

  useEffect(() => {
    if (objectsState.redirect_to_list) {
      router.history.push('/objects');
    }
  }, [objectsState.redirect_to_list, router.history]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(objectsState.validation_error)) {
      const errors = objectsState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [objectsState.validation_error]);

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
    dispatch(hideObjectsValidationError('description'))
  }

  const objectTypesChange = (type_id, type_name) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'type_id': type_id
      },
      touched: {
        ...formState.touched,
        'type_id': true
      }
    }));
    dispatch(objectsParentListFetch(session.current_page_permissions.object_id, type_id, type_name))
    dispatch(hideObjectsValidationError('type_id'))
  }

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
    dispatch(hideObjectsValidationError('parent_id'))
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
    dispatch(hideObjectsValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(updateObjects(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Update Objects"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update Objects" />
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
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    value={formState.values.name || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  {(objectTypesState.objectTypesList) ?
                    <Autocomplete
                      id="type_id"
                      value={ObjectTypeValue}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setObjectTypeValue(newValue)
                          objectTypesChange(newValue.id, newValue.opt_display)
                        }
                        else {
                          setObjectTypeValue(newValue)
                          objectTypesChange('', '')
                        }
                      }}
                      options={objectTypesState.objectTypesList}
                      getOptionLabel={(option) => option.opt_display}
                      size="small"
                      renderInput={(params) => <TextField {...params} size="small" label="Select Type" variant="outlined" error={hasError('type_id')} helperText={hasError('type_id') ? formState.errors.type_id[0] : null} />}
                    />
                    : ''
                  }
                </Grid>
                <Grid item xs={6} sm={4}>
                  {(objectsState.objectsParentsList) ?
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
                      options={objectsState.objectsParentsList}
                      getOptionLabel={(option) => option.name}
                      size="small"
                      renderInput={(params) => <TextField {...params} size="small" label="Select Parent Object" variant="outlined" error={hasError('parent_id')} helperText={hasError('parent_id') ? formState.errors.parent_id[0] : null} />}
                    />

                    : ''}
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('object_url')}
                    fullWidth
                    helperText={hasError('object_url') ? formState.errors.object_url[0] : null}
                    label="Object Url"
                    name="object_url"
                    onChange={handleChange}
                    value={formState.values.object_url || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('menu_order')}
                    fullWidth
                    helperText={hasError('menu_order') ? formState.errors.menu_order[0] : null}
                    label="Menu Order"
                    name="menu_order"
                    onChange={handleChange}
                    value={formState.values.menu_order || ''}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('menu_icon')}
                    fullWidth
                    helperText={hasError('menu_icon') ? formState.errors.menu_icon[0] : null}
                    label="Menu Icon"
                    name="menu_icon"
                    onChange={handleChange}
                    value={formState.values.menu_icon || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <FormGroup >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formState.values.show_in_menu}
                          onChange={handleChange}
                          name="show_in_menu"
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
                      label="Show In Menu"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={objectsState.objectsRecord.description || ''}
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
              Update Objects
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToObjectsList()) }}
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

export default ObjectsUpdate;
