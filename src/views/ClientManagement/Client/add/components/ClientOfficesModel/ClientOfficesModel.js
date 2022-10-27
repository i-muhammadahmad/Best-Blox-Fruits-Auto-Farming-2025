import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { 
  TextField,
  makeStyles,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  Select,
  FormHelperText,
  InputLabel,
  MenuItem ,
  Avatar
} from '@material-ui/core';
import { StyledButton } from 'components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getAvailableOffices,
  addRemoveOffices,
} from 'actions';
import validate from 'validate.js';
import { find, remove, isEmpty } from 'lodash';
import { API_URL } from 'configs'

const schema = {
  office: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  total_seats: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      onlyInteger: true,
      greaterThan: -1,
      message: 'Must Be grather than or equal to 0'
    }
  }, 
  
}

const useStylesModal = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    small_img: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      display: 'inline-block'
    },  
  }));

const ClientOfficesModel = (props) => {

  const {
    modalOpen,
    handleModalOpen,
    parentFormState,
    setParentFormState,
    ParentSchema,
    setParentSchema
  } = props;

  const classes = useStylesModal();
  const clientState = useSelector(state => state.clientState);
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
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
    dispatch(getAvailableOffices(session.current_page_permissions.object_id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    handleModalOpen(false);
  };

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
  }

  const handleSubmit = async event => {
    event.preventDefault();
    let f_values = formState.values;
    let a_offices = clientState.availableOffices;
    let added_offices = clientState.addedOffices; 
    const item = find(a_offices, ['office_id', f_values.office]);
    if(!isEmpty(item)){
      item['total_seats'] = f_values.total_seats;
      added_offices.push(item);
      remove(a_offices, ['office_id', f_values.office]);

      //addind validation for this  feilds
      setParentSchema( ParentSchema => ({
        ...ParentSchema,
        [item['office_id']]: {
          presence: { allowEmpty: false, message: '^Total Seats is required' },
          numericality: {
            onlyInteger: true,
            greaterThan: -1,
            message: '^Must Be grather than or equal to 0'
          }
        },
      }));

      //adding this field value
      setParentFormState(parentFormState => ({
        ...parentFormState,
        values: {
          ...parentFormState.values,
          [item['office_id']]: item['total_seats']
        },
        touched: {
          ...parentFormState.touched,
          [item['office_id']]: true,
        }
      }));

      dispatch(addRemoveOffices(a_offices, added_offices));
    }  
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });
    handleModalOpen(false);
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

 

  return (
    <div>
      <Dialog 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        

      >
        <form
          onSubmit={handleSubmit}
        >
          <DialogTitle id="form-dialog-title">Add Offices</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                <FormControl required className={classes.formControl} error={hasError('office')} >
                  <InputLabel htmlFor="office">Offices</InputLabel>
                  <Select
                    value={formState.values.office || ''}
                    onChange={handleChange}
                    name="office"
                    inputProps={{
                      id: 'office',
                    }}
                    size="small"
                  >
                    <MenuItem aria-label="None" value="" key="0" >Please Select</MenuItem>
                    {clientState.availableOffices.map(officeList => (
                      <MenuItem value={officeList.office_id} key={officeList.office_id}>
                          {(officeList.flag_image)?
                            <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                              <Avatar alt="Office Image" src={API_URL+officeList.flag_image} className={classes.small_img} />
                              <span>{officeList.name}</span>
                            </div>
                            :
                            <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                              {officeList.name}
                            </div>  
                          }
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{hasError('office') ? formState.errors.office[0] : null}</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    error={hasError('total_seats')}
                    fullWidth
                    helperText={hasError('total_seats') ? formState.errors.total_seats[0] : null}
                    label="Total Seats"
                    name="total_seats"
                    onChange={handleChange}
                    value={formState.values.total_seats || ''}
                    variant="outlined"
                    size="small"
                    type="number"
                    InputProps={{
                      min: 0,
                    }}
                  />
                </Grid> 
              </Grid>
              
            </DialogContent>
          <DialogActions>
            <StyledButton
              variant="contained"
              color="bsecondary"
              size="small"
              className={classes.button}
              startIcon={<CancelIcon />}
              onClick={handleClose} 
            >
              CLOSE
            </StyledButton>
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
            >
              Add Office
            </StyledButton>
          </DialogActions>
        </form>  
      </Dialog>
      
    </div>
  );
}

export default ClientOfficesModel;