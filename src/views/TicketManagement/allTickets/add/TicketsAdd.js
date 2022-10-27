import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header,
  Attachment
} from './components';
import {
  addTickets,
  hideTicketsValidationError,
  redirectToTicketsList
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  Typography 
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, forEach } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';

const schema = {
  title: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  description: {
    presence: { allowEmpty: false, message: 'is required' },
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

const TicketsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const ticketsState = useSelector(state => state.ticketsState);
  const session = useSelector(state => state.session);

  const [files, setFiles] = useState([]);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
    },
    touched: {
      'object_viewed_id': true,
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
    if (!isEmpty(ticketsState.validation_error)) {
      const errors = ticketsState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [ticketsState.validation_error]);

  useEffect(() => {
    if (ticketsState.redirect_to_list) {
      router.history.push('/tickets');
    }
  }, [ticketsState.redirect_to_list, router.history]);

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
    dispatch(hideTicketsValidationError('description'))
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
    dispatch(hideTicketsValidationError(event.target.name))
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData();
    if(!isEmpty(files)){
      for (let i = 0; i < files.length; i++) {
        data.append('attachments[]', files[i]);
      }
    }  

    //appending form state to data object
    forEach(formState.values, function(value, key) {
      data.append(key, value);
    });
    dispatch(addTickets(data));
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Page
      className={classes.root}
      title="Add Tickets"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Add Tickets" />
        <CardContent>
          <form
            onSubmit={handleSubmit}
          >
            <div className={classes.formGroup}>
              <Grid container spacing={3}>
                <Grid item xs={8} sm={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        error={hasError('title')}
                        fullWidth
                        helperText={hasError('title') ? formState.errors.title[0] : null}
                        label="Title"
                        name="title"
                        onChange={handleChange}
                        value={formState.values.title || ''}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}> 
                    <Grid item xs={12} sm={12}>
                      <FormHelperText id="description">
                        <Typography component="b">Description</Typography>
                      </FormHelperText>
                      <CKEditor
                        editor={ClassicEditor}
                        config={CK_CONFIGS(localStorage.getItem("token"))}
                        data={formState.values.description || ''}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDescription(data)
                        }}
                      />
                      <FormControl error={hasError('description')} >
                        <FormHelperText id="component-error-text">{hasError('description') ? formState.errors.description[0] : null}</FormHelperText>
                      </FormControl>
                    </Grid>  
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={4}>  
                  <Attachment
                    files={files}
                    setFiles={setFiles}
                  />
                </Grid> 
              </Grid>
            </div>
            <StyledButton
              color="bprimary"
              disabled={!formState.isValid}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Create Ticket
          </StyledButton> &nbsp; &nbsp;
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToTicketsList()) }}
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

export default TicketsAdd;
