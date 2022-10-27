import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  TextField,
  makeStyles,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Paper,
  FormGroup,
  FormControlLabel,
  Badge
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { StyledFab } from 'components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CK_CONFIGS } from 'configs';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { forEach, isEmpty, find } from 'lodash';

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
  badgeStyle: {
    height: '25px',
    borderRadius: '15px',
    padding: '0px',
    top: '12px',
    right: '12px'
  }
}));

const Headcounts = (props) => {

  const {
    headcountDetail,
    formState,
    SetformState,
    hasError,
    handleHeadcountDescChange,
    handleHeadCountFieldChange,
    handleHeadcountDropdownChange,
    deleteHeadCount,
    setHeadcounts,
    hindex
  } = props;

  const classes = useStylesModal();
  const dispatch = useDispatch();
  let fid = headcountDetail['id'];

  const shiftsState = useSelector(state => state.shiftsState);
  const designationState = useSelector(state => state.designationState);

  const [shiftValue, setShiftValue] = useState(null);
  const [designationValue, setDesignationValue] = useState(null);

  useEffect(() => {
    if (isEmpty(designationValue)) {
      const item = find(designationState.designationList, ['id', formState.values['designation_id' + fid]]);
      setDesignationValue(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.values['designation_id' + fid], designationState.designationList]);

  useEffect(() => {
    if (isEmpty(shiftValue)) {
      const item = find(shiftsState.shiftsByClientList, ['id', formState.values['shift_id' + fid]]);
      setShiftValue(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.values['shift_id' + fid], shiftsState.shiftsByClientList]);

  return (
    <div
      className={classes.root}
    >
      <Paper key={fid} elevation={3} style={{ position: 'relative', width: "100%", padding: '20px', marginBottom: '30px', backgroundColor: '#FFFFF6', borderTopRightRadius: '17px' }} >
        {(hindex !== 0) ?
          <StyledFab
            color="bdanger"
            aria-label="edit"
            size="small"
            style={{ top: '-22px', right: '-12px', position: 'absolute' }}
            onClick={() => deleteHeadCount(fid)}
          >
            <DeleteIcon size="small" />
          </StyledFab>
          : ''
        }
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            {(designationState.designationList) ?
              <Autocomplete
                id={"designation_id" + fid}
                name={"designation_id" + fid}
                value={designationValue || null}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setDesignationValue(newValue);
                    handleHeadcountDropdownChange(newValue.id, 'designation_id', fid);
                  }
                  else {
                    setDesignationValue(newValue);
                    handleHeadcountDropdownChange('', 'designation_id', fid);
                  }

                }}
                options={designationState.designationList}
                getOptionLabel={(option) => option.name}
                size="small"
                renderInput={(params) => <TextField {...params} size="small" label="Select Designation" variant="outlined" />}
              />
              : ''
            }
          </Grid>
          <Grid item xs={4} sm={3}>
            {(shiftsState.shiftsByClientList) ?
              <Autocomplete
                id={"shift_id" + fid}
                name={"shift_id" + fid}
                value={shiftValue || null}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setShiftValue(newValue);
                    handleHeadcountDropdownChange(newValue.id, 'shift_id', fid);
                    //setShiftId(newValue.id)
                  }
                  else {
                    setShiftValue(newValue);
                    handleHeadcountDropdownChange('', 'shift_id', fid);
                    //setShiftId('')
                  }

                }}
                options={shiftsState.shiftsByClientList}
                getOptionLabel={(option) => option.name}
                size="small"
                renderInput={(params) => <TextField {...params} size="small" label="Select Shift" variant="outlined" />}
              />
              : ''
            }
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              style={{ backgroundColor: '#ffffff' }}
              error={hasError('billables' + fid)}
              fullWidth
              helperText={hasError('billables' + fid) ? formState.errors["billables" + fid][0] : null}
              label="Billables"
              name={"billables" + fid}
              onChange={(event) => { handleHeadCountFieldChange(event, 'billables', fid) }}
              value={formState.values["billables" + fid] || ''}
              variant="outlined"
              size="small"
              type="number"
              InputLabelProps={{ shrink: true, min: 0 }}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              style={{ backgroundColor: '#ffffff' }}
              error={hasError('primary_count' + fid)}
              fullWidth
              helperText={hasError('primary_count' + fid) ? formState.errors["primary_count" + fid][0] : null}
              label="Primary Count"
              name={"primary_count" + fid}
              onChange={(event) => { handleHeadCountFieldChange(event, 'primary_count', fid) }}
              value={formState.values["primary_count" + fid] || ''}
              variant="outlined"
              size="small"
              type="number"
              InputLabelProps={{ shrink: true, min: 0 }}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <TextField
              style={{ backgroundColor: '#ffffff' }}
              error={hasError('backfill_count' + fid)}
              fullWidth
              helperText={hasError('backfill_count' + fid) ? formState.errors["backfill_count" + fid][0] : null}
              label="Backfill Count"
              name={"backfill_count" + fid}
              onChange={(event) => { handleHeadCountFieldChange(event, 'backfill_count', fid) }}
              value={formState.values["backfill_count" + fid] || ''}
              variant="outlined"
              size="small"
              type="number"
              InputLabelProps={{ shrink: true, min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CKEditor
              editor={ClassicEditor}
              config={CK_CONFIGS(localStorage.getItem("token"))}
              data={formState.values['description_' + fid] || ''}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleHeadcountDescChange(event, data, fid);
              }}
            />
            <FormControl error={hasError('description_' + fid)} >
              <FormHelperText id="component-error-text">{hasError('description_' + fid) ? formState.errors['description_' + fid][0] : null}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );

}

export default Headcounts;