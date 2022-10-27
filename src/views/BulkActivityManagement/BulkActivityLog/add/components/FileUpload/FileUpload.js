import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { StyledFab, StyledButton } from 'components';
import {
  hideBulkActivityLogValidationError,
  uploadLogFile
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  Switch,
  FormGroup,
  FormControl,
  FormControlLabel,
  Typography 
} from '@material-ui/core';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import { forEach } from 'lodash';

const schema = {
  log_file: {
    presence: { allowEmpty: false, message: 'is required' },
  }
}

const useStyles = makeStyles(theme => ({
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

const FileUpload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const bulkActivityLogState = useSelector(state => state.bulkActivityLogState);

  const [logFile, setLogFile] = useState(null);
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

  const handleLogFileChange = event => {
    setLogFile(event.target.files[0]);
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
    dispatch(hideBulkActivityLogValidationError(event.target.name));
  }

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append('log_file', logFile);

    //appending form state to data object
    forEach(formState.values, function(value, key) {
      data.append(key, value);
    });
    dispatch(uploadLogFile(data));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form onSubmit={handleSubmit} >
      <Grid container spacing={3}>
        <Grid item xs={3} sm={2}>
          <FormGroup >
            <FormControlLabel
              control={
                <Switch
                  checked={formState.values.contain_header}
                  onChange={handleChange}
                  name="contain_header"
                  color="primary"
                  classes={{
                    root: classes.root,
                    switchBase: classes.switchBase,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              }
              label="Contain Header"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            error={hasError('log_file')}
            fullWidth
            helperText={hasError('log_file') ? formState.errors.log_file[0] : null}
            label="Bulk Activity Log File"
            name="log_file"
            onChange={handleLogFileChange}
            variant="outlined"
            size="small"
            type="file"
            InputLabelProps={{
              shrink: true,
              accept: ".csv"
            }}
          />
        </Grid>
        <Grid item xs={3} sm={3}>
          <StyledButton
            color="bprimary"
            size="small"
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Upload File
          </StyledButton>
        </Grid>
        {(bulkActivityLogState.is_file_uploded) ?
          <div>
            <Typography component="b" > Total Records: </Typography > {bulkActivityLogState.file_total_records}
            <Typography component="p" > If contain header is not selected cols will be shown by thier numbers </Typography >
          </div>
          : ''
        }
      </Grid>
    </form>
  );
};

export default FileUpload;