/* eslint-disable react/display-name */
import React, { useState, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  FormControlLabel,
  Switch,
  colors
} from '@material-ui/core';
import {
  addHoliday,
  hideHolidayValidationError,
} from 'actions'
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';
import validate from 'validate.js';

const schema = {
  opt_display: {
    presence: { allowEmpty: false, message: '^Holiday is required' },
  },
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  field: {
    marginTop: theme.spacing(3)
  },
  cancelButton: {
    marginLeft: 'auto'
  },
  confirmButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const AddEditHoliday = forwardRef((props, ref) => {
  const {
    event,
    onDelete,
    onCancel,
    onAdd,
    onEdit,
    className,
    ...rest
  } = props;

  const classes = useStyles();

  const defaultEvent = {
    title: 'Holiday Name',
    desc: 'Holiday description',
    allDay: true,
    start: moment().toDate(),
    end: moment().toDate()
  };

  /*Start of Added By Jawad*/
   const dispatch = useDispatch();
  const router = useRouter();
  const holidayState = useSelector(state => state.holidayState);

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
    if(!isEmpty(holidayState.validation_error)){
      const errors = holidayState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [holidayState.validation_error]);

  useEffect(() => {
    if(holidayState.redirect_to_list){
      router.history.push('/holiday');
    }
  }, [holidayState.redirect_to_list, router.history]);

  const setDescription = description => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'description':description
      },
      touched: {
        ...formState.touched,
        'description': true
      }
    }));
    dispatch(hideHolidayValidationError('description'))
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
    dispatch(hideHolidayValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(addHoliday(formState.values));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  /*End of Added by Jawad*/
  const [values, setValues] = useState(event || defaultEvent);

  const mode = event ? 'edit' : 'add';

  const handleFieldChange = e => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleDelete = () => {
    onDelete && onDelete(event);
  };

  const handleAdd = () => {
    if (!values.title || !values.desc) {
      return;
    }

    onAdd({ ...values, id: uuid() });
  };

  const handleEdit = () => {
    if (!values.title || !values.desc) {
      return;
    }

    onEdit(values);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      ref={ref}
    >
      <form>
        <CardContent>
          <Typography
            align="center"
            gutterBottom
            variant="h3"
          >
            {mode === 'add' ? 'Add Holiday' : 'Edit Holiday'}
          </Typography>
          <TextField
            className={classes.field}
            fullWidth
            label="Title"
            name="title"
            onChange={handleFieldChange}
            value={values.title}
            variant="outlined"
          />
          <TextField
            className={classes.field}
            fullWidth
            label="Description"
            name="desc"
            onChange={handleFieldChange}
            value={values.desc}
            variant="outlined"
          />

          <TextField
            className={classes.field}
            defaultValue={moment(values.start).format('YYYY-MM-DD')}
            fullWidth
            label="Start date"
            name="start"
            onChange={handleFieldChange}
            type="date-local"
            variant="outlined"
          />
          {/*Client Filter hwre*/}
        </CardContent>
        <Divider />
        <CardActions>
          <IconButton
            edge="start"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
          <Button
            className={classes.cancelButton}
            onClick={onCancel}
            variant="contained"
          >
            Cancel
          </Button>
          {mode === 'add' ? (
            <Button
              className={classes.confirmButton}
              onClick={handleAdd}
              variant="contained"
            >
              Add
            </Button>
          ) : (
            <Button
              className={classes.confirmButton}
              onClick={handleEdit}
              variant="contained"
            >
              Save
            </Button>
          )}
        </CardActions>
      </form>
    </Card>
  );
});

AddEditHoliday.propTypes = {
  className: PropTypes.string,
  event: PropTypes.object,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default AddEditHoliday;
