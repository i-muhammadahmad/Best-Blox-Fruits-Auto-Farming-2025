import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import { Header } from './components';
import {
  addTicketsCategory,
  hideTicketsCategoryValidationError,
  redirectToTicketsCategoryList
} from 'actions';
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
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';

const schema = {
  category_name: {
    presence: { allowEmpty: false, message: '^Category Name is required' }
  }
};

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

const TicketsCategoryAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const ticketsCategoryState = useSelector(state => state.ticketsCategoryState);
  const session = useSelector(state => state.session);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      object_viewed_id: session.current_page_permissions.object_id
    },
    touched: {
      object_viewed_id: true
    },
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
    if (!isEmpty(ticketsCategoryState.validation_error)) {
      const errors = ticketsCategoryState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [ticketsCategoryState.validation_error]);

  useEffect(() => {
    if (ticketsCategoryState.redirect_to_list) {
      router.history.push('/tickets-category');
    }
  }, [ticketsCategoryState.redirect_to_list, router.history]);

  const setDescription = description => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        description: description
      },
      touched: {
        ...formState.touched,
        description: true
      }
    }));
    dispatch(hideTicketsCategoryValidationError('description'));
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
    dispatch(hideTicketsCategoryValidationError(event.target.name));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(addTicketsCategory(formState.values));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;


  return (
    <Page className={classes.root} title="Add Tickets Category">
      <Header />
      <Card className={classes.projectDetails}>
        <CardHeader title="Add Tickets Category" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    error={hasError('category_name')}
                    fullWidth
                    helperText={
                      hasError('category_name')
                        ? formState.errors.category_name[0]
                        : null
                    }
                    label="Category Name"
                    name="category_name"
                    onChange={handleChange}
                    value={formState.values.category_name || ''}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </div>
            <div className={classes.formGroup}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem('token'))}
                data={formState.values.description || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDescription(data);
                }}
              />
              <FormControl error={hasError('description')}>
                <FormHelperText id="component-error-text">
                  {hasError('description')
                    ? formState.errors.description[0]
                    : null}
                </FormHelperText>
              </FormControl>
            </div>
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}>
              Create Category
            </StyledButton>{' '}
            &nbsp; &nbsp;
            <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => {
                dispatch(redirectToTicketsCategoryList());
              }}
              startIcon={<CancelIcon />}>
              CLOSE
            </StyledButton>
          </form>
        </CardContent>
      </Card>
    </Page>
  );
};

export default TicketsCategoryAdd;
