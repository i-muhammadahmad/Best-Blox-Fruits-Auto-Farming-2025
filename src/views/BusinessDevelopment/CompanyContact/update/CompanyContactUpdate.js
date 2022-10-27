import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton, StyledFab } from 'components';
import {
  Header
} from './components';
import {
  updateCompanyContact,
  hideCompanyContactValidationError,
  redirectToCompanyContactList,
  companyListFetch
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, omit, forEach, find } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import { CK_CONFIGS } from 'configs';

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
  formControl: {
    minWidth: '100%',
  },
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

const CompanyContactUpdate = () => {
  const classes = useStyles();
  const radio_classes = useRadioStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const companyContactState = useSelector(state => state.companyContactState);
  const session = useSelector(state => state.session);
  const companyState = useSelector(state => state.companyState);

  const [emailIndexCount, setEmailIndexCount] = React.useState(1);
  const [phoneIndexCount, setPhoneIndexCount] = React.useState(1);
  const [companyValue, setCompanyValue] = React.useState(null);
  const [schema, setSchema] = React.useState(
    {
      company_id: {
        presence: { allowEmpty: false, message: '^Please Select Company' },
      },
      firstname: {
        presence: { allowEmpty: false, message: 'is required' },
      },
      gender: {
        presence: { allowEmpty: false, message: '^is required' },
      },
      designation: {
        presence: { allowEmpty: false, message: '^is required' },
      },
      is_primary_contact: {
        presence: { allowEmpty: false, message: '^is required' },
      },
      c_email_0: {
        presence: { allowEmpty: false, message: '^Email is required' },
        email: {
          message: "^Please Enter a valid email"
        }
      },
      c_phone_0: {
        presence: { allowEmpty: false, message: '^Phone is required' },
      }
    }
  );

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
      'is_primary_contact': false,
      'contact_email': [
        0: '',
      ],
      'contact_phoneno': [
        0: '',
      ],
    },
    touched: {
      'object_viewed_id': true,
      'is_primary_contact': true,
    },
    errors: {}
  });

  useEffect(() => {
    let record = companyContactState.companyContactRecord
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'id': record.id,
        'description': record.description,
        'company_id' : record.company_id,
        'firstname' :  record.firstname,
        'lastname' :   record.lastname,
        'gender' : record.gender,
        'designation' :  record.designation,
        'contact_phoneno' :  record.contact_phoneno,
        'contact_email' :  record.contact_email,
        'is_primary_contact' : record.is_primary_contact
      },
      touched: {
        ...formState.touched,
        'name': true,
        'id': true,
        'description': true,
        'company_id' : true,
        'firstname' :  true,
        'lastname' :   true,
        'gender' : true,
        'designation' : true, 
        'is_primary_contact' : true,
      }
    }));

    if(record.contact_email){
      forEach(record.contact_email, function (value, key) {
        //addind validation for this  feilds
        setSchema(schema => ({
          ...schema,
          ['c_email_'+key]: {
            presence: { allowEmpty: false, message: '^is required' },
          },
        }));

        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            ['c_email_'+key]: value 
          },
          touched: {
            ...formState.touched,
            ['c_email_'+key]: true
          }
        }));
      });  
    }  
    
    if(record.contact_phoneno){
      forEach(record.contact_phoneno, function (value, key) {
        //addind validation for this  feilds
        setSchema(schema => ({
          ...schema,
          ['c_phone_'+key]: {
            presence: { allowEmpty: false, message: '^is required' },
          },
        }));

        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            ['c_phone_'+key]: value 
          },
          touched: {
            ...formState.touched,
            ['c_phone_'+key]: true
          }
        }));
      });  
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyContactState.companyContactRecord]);

  useEffect(() => {
    let record = companyContactState.companyContactRecord
    const item = find(companyState.companyList, ['id', record.company_id])
    setCompanyValue(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyState.companyList]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(companyContactState.validation_error)) {
      const errors = companyContactState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [companyContactState.validation_error]);

  useEffect(() => {
    if (!companyContactState.showUpdateForm && !companyContactState.showViewPage) {
      router.history.push('/company-contact');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyContactState.showUpdateForm, companyContactState.showViewPage]);

  useEffect(() => {
    dispatch(companyListFetch(session.current_page_permissions.object_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);  

  useEffect(() => {
    if (companyContactState.redirect_to_list) {
      router.history.push('/company-contact');
    }
  }, [companyContactState.redirect_to_list, router.history]);


  const setCompanyId = company_id => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'company_id': company_id
      },
      touched: {
        ...formState.touched,
        'company_id': true
      }
    }));
    dispatch(hideCompanyContactValidationError('company_id'))
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
    dispatch(hideCompanyContactValidationError('description'))
  }

  const addAnotherPhone = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        contact_phoneno: [
          ...formState.values.contact_phoneno,
          [phoneIndexCount]: ''
        ]
      },
      touched: {
        ...formState.touched,
      }
    }));

    //addind validation for this  feilds
    setSchema(schema => ({
      ...schema,
      ['c_phone_'+phoneIndexCount]: {
        presence: { allowEmpty: false, message: '^is required' },
      },
    }));

    //increasing contact phone count 
    setPhoneIndexCount(phoneIndexCount+1);

  }

  const addAnotherEmail = () => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        contact_email: [
          ...formState.values.contact_email,
          [emailIndexCount]: ''
        ],
      }
    }));

    //addind validation for this  feilds
    setSchema(schema => ({
      ...schema,
      ['c_email_'+emailIndexCount]: {
        presence: { allowEmpty: false, message: '^Email is required' },
        email: {
          message: "^Please Enter a valid email"
        }
      },
    }));

    //increasing contact phone count 
    setEmailIndexCount(emailIndexCount+1);
  }

  const removeEmail = eindex => {
    //deleting from email array
    let companies_email_arr = Object.values(omit(formState.values.contact_email, [eindex]));

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        ['c_email_'+eindex]: '',
        contact_email:[
          ...companies_email_arr,
        ]  
      },
      touched: {
        ...formState.touched,
        ['c_email_'+eindex]: false
      }
    }));

    //removing schema  
    let schema_arr = {...schema}
    delete schema_arr['c_email_'+eindex];
    setSchema(schema_arr);

  }

  const removePhoneNo = pindex => {
    //deleting from phone array
    let companies_phone_arr = Object.values(omit(formState.values.contact_phoneno, [pindex]));

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        ['c_phone_'+pindex]: '',
        contact_phoneno:[
          ...companies_phone_arr,
        ]  
      },
      touched: {
        ...formState.touched,
        ['c_phone_'+pindex]: false
      }
    }));

    //removing schema  
    let schema_arr = {...schema}
    delete schema_arr['c_phone_'+pindex];
    setSchema(schema_arr);

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
    dispatch(hideCompanyContactValidationError(event.target.name))
  }

  const handleCompanyEmailChange = (event, email_index) => {
    event.persist();

    //updating companyemail state
    let companies_email_arr = [...formState.values.contact_email]
    companies_email_arr[email_index] = event.target.value;

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
        contact_email:[
          ...companies_email_arr,
        ]
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    dispatch(hideCompanyContactValidationError(event.target.name))

  }

  const handleCompanyPhoneChange = (event, ph_index) => {
    event.persist();

    //updating companyphone state
    let companies_phone_arr = [...formState.values.contact_phoneno]
    companies_phone_arr[ph_index] = event.target.value;
    
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
        contact_phoneno:[
          ...companies_phone_arr
        ]   
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    dispatch(hideCompanyContactValidationError(event.target.name));

  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(updateCompanyContact(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Update Company Contact"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Update Company Contact" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('firstname')}
                    fullWidth
                    helperText={hasError('firstname') ? formState.errors.firstname[0] : null}
                    label="First name"
                    name="firstname"
                    onChange={handleChange}
                    value={formState.values.firstname || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('lastname')}
                    fullWidth
                    helperText={hasError('lastname') ? formState.errors.lastname[0] : null}
                    label="Last name"
                    name="lastname"
                    onChange={handleChange}
                    value={formState.values.lastname || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  {(companyState.companyList) ?
                    <Autocomplete
                      id="company_id"
                      limitTags={2}
                      value={companyValue}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setCompanyValue(newValue)
                          setCompanyId(newValue.id)
                        }
                        else {
                          setCompanyValue(newValue)
                          setCompanyId('')
                        }

                      }}
                      size="small"
                      options={companyState.companyList}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} label="Select Company" variant="outlined" error={hasError('company_id')} helperText={hasError('company_id') ? formState.errors.company_id[0] : null} />}
                    />
                    : ''}
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('designation')}
                    fullWidth
                    helperText={hasError('designation') ? formState.errors.designation[0] : null}
                    label="Designation"
                    name="designation"
                    onChange={handleChange}
                    value={formState.values.designation || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormControl className={classes.formControl} error={hasError('gender')}>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      value={formState.values.gender || ''}
                      onChange={handleChange}
                    >
                      <MenuItem value={'Male'}>Male</MenuItem>
                      <MenuItem value={'Female'}>Female</MenuItem>
                      <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                    <FormHelperText id="component-error-text">{hasError('gender') ? formState.errors.gender[0] : null}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormGroup >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formState.values.is_primary_contact}
                          onChange={handleChange}
                          name="is_primary_contact"
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
                      label="Is Primary Contact"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={2}>
                                Email
                                <StyledButton
                                  color="bsuccess"
                                  type="button"
                                  variant="contained"
                                  onClick={() => addAnotherEmail()}
                                  size="small"
                                  startIcon={<AddCircleOutlineIcon />}
                                  style={{float: "right"}} 
                                >
                                  Add Email
                                </StyledButton>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              (formState.values.contact_email)?
                              formState.values.contact_email.map((cemail, eindex) => (
                            <TableRow key={eindex} >
                              <TableCell >
                                <TextField
                                  error={hasError('c_email_'+eindex)}
                                  fullWidth
                                  helperText={hasError('c_email_'+eindex) ? formState.errors['c_email_'+eindex] : null}
                                  label="Email"
                                  name={'c_email_'+eindex}
                                  onChange={(e) => handleCompanyEmailChange(e, eindex)}
                                  value={formState.values['c_email_'+eindex] || ''}
                                  variant="outlined"
                                  size="small"
                                />
                              </TableCell>
                              <TableCell >
                                {(eindex !== 0)? 
                                  <StyledFab
                                    color="bdanger" aria-label="delete"
                                    size="small"
                                    onClick={() => removeEmail(eindex)}
                                  >
                                    <CloseIcon />
                                  </StyledFab>
                                : '' }  
                              </TableCell>
                            </TableRow>
                            ))
                            :''
                          }
                          </TableBody> 
                        </Table> 
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={2} >
                                Phone
                                <StyledButton
                                  color="bsuccess"
                                  type="button"
                                  variant="contained"
                                  onClick={() => addAnotherPhone()}
                                  size="small"
                                  startIcon={<AddCircleOutlineIcon />}
                                  style={{float: 'right'}}
                                >
                                  Add Phone
                                </StyledButton>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              (formState.values.contact_phoneno)?
                              formState.values.contact_phoneno.map((cphone, pindex) => (
                              <TableRow key={pindex}>
                                <TableCell >
                                  <TextField
                                    error={hasError('c_phone_'+pindex)}
                                    fullWidth
                                    helperText={hasError('c_phone_'+pindex) ? formState.errors['c_phone_'+pindex] : null}
                                    label="Phone No"
                                    name={"c_phone_"+pindex}
                                    onChange={(e)  => handleCompanyPhoneChange(e, pindex)}
                                    value={formState.values['c_phone_'+pindex] || ''}
                                    variant="outlined"
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell >
                                  {(pindex !== 0)? 
                                    <StyledFab
                                    color="bdanger" aria-label="delete"
                                    size="small"
                                    onClick={() => removePhoneNo(pindex)}
                                  >
                                    <CloseIcon />
                                  </StyledFab>
                                  : '' }  
                                </TableCell>
                              </TableRow>
                            ))
                            :''
                          }
                          </TableBody> 
                        </Table> 
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={companyContactState.companyContactRecord.description || ''}
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
              Update Company Contact
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToCompanyContactList()) }}
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

export default CompanyContactUpdate;
