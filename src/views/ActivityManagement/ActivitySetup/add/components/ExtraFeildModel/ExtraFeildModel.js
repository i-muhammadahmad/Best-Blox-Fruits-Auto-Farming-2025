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
  MenuItem 
} from '@material-ui/core';
import { StyledButton } from 'components';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getExtraFieldsConfigs, addRemoveExtraFeild } from 'actions';
import validate from 'validate.js';
import { find, remove } from 'lodash';

const schema = {
  extra_feild: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  field_label: {
    presence: { allowEmpty: false, message: 'is required' },
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
  }));

const ExtraFeildModel = (props) => {

  const {modalOpen, handleModalOpen} = props;

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
    dispatch(getExtraFieldsConfigs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const classes = useStylesModal();

  const activitySetupState = useSelector(state => state.activitySetupState);
  const dispatch = useDispatch();

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
    let a_feilds = activitySetupState.availableExtraFeilds;
    let added_feilds = activitySetupState.addedExtraFeilds;
    const item = find(a_feilds, ['name', f_values.extra_feild]);
    item['field_label'] = f_values.field_label;
    added_feilds.push(item);

    remove(a_feilds, ['name', f_values.extra_feild])
    dispatch(addRemoveExtraFeild(a_feilds, added_feilds));

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
          <DialogTitle id="form-dialog-title">Add Extra Feild</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                <FormControl required className={classes.formControl} error={hasError('extra_feild')} >
                  <InputLabel htmlFor="extra_feild">Extra Feilds</InputLabel>
                  <Select
                    value={formState.values.extra_feild || ''}
                    onChange={handleChange}
                    name="extra_feild"
                    inputProps={{
                      id: 'extra_feild',
                    }}
                    size="small"
                  >
                    <MenuItem aria-label="None" value="" key="0" >Please Select</MenuItem>
                    {activitySetupState.availableExtraFeilds.map(extraFeild => (
                      <MenuItem value={extraFeild.name} key={extraFeild.name}>{extraFeild.name} ({extraFeild.type})</MenuItem>
                    ))}
                    
                  </Select>
                  <FormHelperText>{hasError('extra_feild') ? formState.errors.extra_feild[0] : null}</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    error={hasError('field_label')}
                    fullWidth
                    helperText={hasError('field_label') ? formState.errors.field_label[0] : null}
                    label="Extra Feild Label"
                    name="field_label"
                    onChange={handleChange}
                    value={formState.values.field_label || ''}
                    variant="outlined"
                    size="small"
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
              Add Feild
            </StyledButton>
          </DialogActions>
        </form>  
      </Dialog>
      
    </div>
  );
}

export default ExtraFeildModel;