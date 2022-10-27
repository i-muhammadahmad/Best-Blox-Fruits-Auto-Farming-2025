import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  Typography,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  hideAssetTypesValidationError,
  //setQuizAddUpdateStatusFalse,
  approvalProfilesDropdownListFetch,
} from 'actions';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CK_CONFIGS, API_URL } from 'configs';
import ApprovalProfileDropdown from '../ApprovalProfileDropdown';
import { remove, isEmpty, forEach } from 'lodash';
import { FilesDropzone } from 'components';

const useStyles = makeStyles((theme) => ({
  root: {},
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  },
}));

const AssetTypesForm = props => {
  const { formState, setFormState, files, setFiles, schema, setSchema, approvalProfilesValue, setApprovalProfilesValue, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const assetTypesState = useSelector(state => state.assetTypesState);
  const officesState = useSelector(state => state.officesState);
  const session = useSelector(state => state.session);

  const [dropZoneConfig, setDropZoneConfig] = useState({
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 5000000,
  });

  useEffect(() => {
    //dispatch(setQuizAddUpdateStatusFalse());
    dispatch(approvalProfilesDropdownListFetch());
  }, []);

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
    dispatch(hideAssetTypesValidationError('description'))
  }

  const handleBinderWithChange = event => {
    let bindings = formState.values.binder_with;
    if (event.target.checked) {
      bindings.push(event.target.name);
    }
    else {
      bindings.pop(event.target.name);
      remove(bindings, [event.target.name]);
    }
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        ['binder_with']: bindings
      },
      touched: {
        ...formState.touched,
        ['binder_with']: true
      }
    }));
    handleChange(event);
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
    dispatch(hideAssetTypesValidationError(event.target.name))
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleApprovalTypeChange = async (event) => {
    event.persist();
    let schema_arr = { ...schema };
    let formstate_arr = {
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }

    if (event.target.value === 'global') {
      setApprovalProfilesValue({
        'all': null,
      });

      forEach(officesState.officesList, function (value, key) {
        delete schema_arr['approval_profile_id_' + value['id']];
        delete formstate_arr.values['approval_profile_id_' + value['id']];
        delete formstate_arr.touched['approval_profile_id_' + value['id']];
        delete formstate_arr.errors['approval_profile_id_' + value['id']];
      });
    }
    else {
      let ap_val_arr = { ...approvalProfilesValue };
      await delete ap_val_arr['all'];
      await setApprovalProfilesValue(ap_val_arr);

      forEach(officesState.officesList, function (value, key) {
        schema_arr = {
          ...schema_arr,
          ['approval_profile_id_' + value['id']]: {
            presence: { allowEmpty: false, message: '^Please select approval profile' },
          }
        }
      });

      await delete schema_arr['approval_profile_id_all'];

      await delete formstate_arr.values['approval_profile_id_all'];
      await delete formstate_arr.touched['approval_profile_id_all'];
      await delete formstate_arr.errors['approval_profile_id_all'];

    }

    await setSchema(schema_arr);
    await setFormState(formState => ({
      ...formState,
      values: formstate_arr.values,
      touched: formstate_arr.touched,
      errors: formstate_arr.errors
    }));

  }

  const approvalProfileOnChange = (event, newValue, office_id) => {
    if (newValue) {
      let index = 'approval_profile_id_' + office_id;
      setApprovalProfilesId(index, newValue.id)
    }
    else {
      let index = 'approval_profile_id_' + office_id;
      setApprovalProfilesId(index, '')
    }

    setApprovalProfilesValue(approvalProfilesValue => ({
      ...approvalProfilesValue,
      [office_id]: newValue,
    }));

  }

  const setApprovalProfilesId = (index, val) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [index]: val
      },
      touched: {
        ...formState.touched,
        [index]: true
      }
    }));
  }

  return (
    <form>
      <div className={classes.formGroup}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
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
            </Grid> <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FormControl component="fieldset" className={classes.formControl} error={hasError('binder_with')}>
                  <FormLabel component="legend">Asset is Bound With?</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox checked={formState.values.is_binded_with_employee} onChange={handleBinderWithChange} name="is_binded_with_employee" />}
                      label="Employee"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={formState.values.is_binded_with_workstation} onChange={handleBinderWithChange} name="is_binded_with_workstation" />}
                      label="Workstation"
                    />
                    <FormControlLabel
                      control={<Checkbox disabled={true} checked={formState.values.is_binded_with_office} onChange={handleBinderWithChange} name="is_binded_with_office" />}
                      label="Office"
                    />
                  </FormGroup>
                  <FormHelperText component="div" id="bound-error-text">{hasError('binder_with') ? formState.errors.binder_with[0] : null}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FormControl component="fieldset" className={classes.formControl} error={hasError('approval_profile_type')}>
                  <FormLabel component="legend">Approval Profile?</FormLabel>
                  <RadioGroup row aria-label="approval_profile_type" name="approval_profile_type" value={formState.values.approval_profile_type} onChange={handleApprovalTypeChange}>
                    <FormControlLabel value="global" control={<Radio />} label="Global" />
                    <FormControlLabel value="office_wise" control={<Radio />} label="Office Wise" />
                  </RadioGroup>
                  <FormHelperText component="div" id="bound-error-text">{hasError('approval_profile_type') ? formState.errors.approval_profile_type[0] : null}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            {(formState.values.approval_profile_type === 'global') ?
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <ApprovalProfileDropdown
                    office_id={'all'}
                    approvalProfileValue={approvalProfilesValue['all']}
                    approvalProfileOnChange={approvalProfileOnChange}
                    id={"approval_profile_id_all"}
                    name={"approval_profile_id_all"}
                    renderInput={(params) => <TextField {...params} size="small" label="Select Approval Profile" variant="outlined" error={hasError(['approval_profile_id_all'])} helperText={hasError('approval_profile_id_all') ? formState.errors.approval_profile_id_all[0] : null} />}
                  />
                </Grid>
              </Grid>
              :
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  {!isEmpty(officesState.officesList) ?
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell > Office </TableCell>
                            <TableCell> Approval Profile </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {officesState.officesList.map((val, i) => (
                            <TableRow key={val.id}>
                              <TableCell > {val.name} </TableCell>
                              <TableCell style={{ width: '50%' }}>
                                <ApprovalProfileDropdown
                                  office_id={val.id}
                                  approvalProfileValue={approvalProfilesValue[val.id]}
                                  approvalProfileOnChange={approvalProfileOnChange}
                                  id={"approval_profile_id_" + val.id}
                                  name={"approval_profile_id_all" + val.id}
                                  renderInput={(params) => <TextField {...params} size="small" label="Select Approval Profile" variant="outlined" error={hasError('approval_profile_id_' + val.id)} helperText={hasError('approval_profile_id_' + val.id) ? formState.errors['approval_profile_id_' + val.id][0] : null} />}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    : ''}
                </Grid>
              </Grid>
            }
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <div className={classes.formGroup}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={formState.values.description || ''}
                    config={CK_CONFIGS(localStorage.getItem("token"))}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDescription(data)
                    }}
                  />
                  <FormControl error={hasError('description')} >
                    <FormHelperText component='div' id="component-error-text">{hasError('description') ? formState.errors.description[0] : null}</FormHelperText>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FilesDropzone
              files={files}
              setFiles={setFiles}
              customDZconfigs={dropZoneConfig}
              title={'Asset Type Icon'}
            />
            <>
              {(!isEmpty(assetTypesState.assetTypesRecord) && files.length <= 0) ? 
                <List className={classes.list}>
                  <ListItem>
                    <ListItemIcon>
                      <div className={classes.thumb} >
                        <div className={classes.thumbInner}>
                          <img
                            src={API_URL+assetTypesState.assetTypesRecord.assets_type_image}
                            className={classes.img}
                            alt={formState.errors.email}
                          />
                        </div>
                      </div>
                    </ListItemIcon>
                  </ListItem>  
                </List>
                :''
              }
              </>
          </Grid>
        </Grid>
      </div>

    </form>
  );
};

export default AssetTypesForm;