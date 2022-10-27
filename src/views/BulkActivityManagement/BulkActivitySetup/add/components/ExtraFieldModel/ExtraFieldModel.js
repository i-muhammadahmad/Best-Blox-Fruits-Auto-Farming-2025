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
import { getBulkExtraFieldsConfigs, addRemoveBulkExtraField } from 'actions';
import validate from 'validate.js';
import { find, remove } from 'lodash';

const schema = {
  extra_field: {
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

const ExtraFieldModel = (props) => {

  const session = useSelector(state => state.session);

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
    dispatch(getBulkExtraFieldsConfigs(session.current_page_permissions.object_id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const classes = useStylesModal();

  const bulkActivitySetupState = useSelector(state => state.bulkActivitySetupState);
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
    let a_fields = bulkActivitySetupState.availableExtraFields;
    let added_fields = bulkActivitySetupState.addedExtraFields;
    const item = find(a_fields, ['name', f_values.extra_field]);
    item['field_label'] = f_values.field_label;
    added_fields.unshift(item);

    remove(a_fields, ['name', f_values.extra_field])
    dispatch(addRemoveBulkExtraField(a_fields, added_fields)); 

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
          <DialogTitle id="form-dialog-title">Add Extra Field</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                <FormControl required className={classes.formControl} error={hasError('extra_field')} >
                  <InputLabel htmlFor="extra_field">Extra Fields</InputLabel>
                  <Select
                    value={formState.values.extra_field || ''}
                    onChange={handleChange}
                    name="extra_field"
                    inputProps={{
                      id: 'extra_field',
                    }}
                    size="small"
                  >
                    <MenuItem aria-label="None" value="" key="0" >Please Select</MenuItem>
                    {bulkActivitySetupState.availableExtraFields.map(extraField => (
                      <MenuItem value={extraField.name} key={extraField.name}>{extraField.name} ({extraField.type})</MenuItem>
                    ))}
                    
                  </Select>
                  <FormHelperText>{hasError('extra_field') ? formState.errors.extra_field[0] : null}</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    error={hasError('field_label')}
                    fullWidth
                    helperText={hasError('field_label') ? formState.errors.field_label[0] : null}
                    label="Extra Field Label"
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
              Add Field
            </StyledButton>
          </DialogActions>
        </form>  
      </Dialog>
      
    </div>
  );
}

export default ExtraFieldModel;