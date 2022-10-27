import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import useRouter from 'utils/useRouter';
import clsx from 'clsx';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import {
  updateProfileImage,
  hideProfileImageValidationError,
} from 'actions';
import { makeStyles } from '@material-ui/styles';
import { isEmpty, find, forEach } from 'lodash';
import { API_URL } from 'configs';
import SaveIcon from '@material-ui/icons/Save';
import { FilesDropzone, StyledButton } from 'components';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const useStyles = makeStyles(theme => ({
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
  image: {
    width: 130,
    height: 'auto'
  },
}));

const schema = {
  
}

const ProfileImage = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const userProfileState = useSelector(state => state.userProfileState);
  const session = useSelector(state => state.session);

  const [files, setFiles] = useState([]);
  const [profilepic, setProfilepic] = useState('');
  const [dropZoneConfig, setDropZoneConfig] = useState({
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 5000000,
  });

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    let record = session.user.employee;
    setProfilepic(record.profile_pic);
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'user_id': session.user.id,
        'employee_id': record.id,
      },
      touched: {
        ...formState.touched,
        'user_id': true,
        'employee_id': true,
      }
    }));
  }, [])

  useEffect(() => {
    if(!isEmpty(session.user.employee)){
      setProfilepic(session.user.employee.profile_pic);
    }  
  }, [session.user.employee])


  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(userProfileState.profile_image_validation_error)) {
      const errors = userProfileState.profile_image_validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [userProfileState.profile_image_validation_error]);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData();
    if (!isEmpty(files[0])) {
      data.append('profile_pic', files[0]);
    }

    //appending form state to data object
    forEach(formState.values, function (value, key) {
      data.append(key, value);
    });
    await dispatch(updateProfileImage(data));
    setFiles([]);
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Card
      className={classes.projectDetails}
    >
      <CardHeader title="Change Profile Picture" />
      <CardContent>
        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.formGroup}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FilesDropzone
                  files={files}
                  setFiles={setFiles}
                  customDZconfigs={dropZoneConfig}
                  title={'Upload Profile Image'}
                  dzFileIcon={() => (<><AccountCircleRoundedIcon 
                    className={classes.image}
                    color="disabled"
                  /></>)}
                /> 
                <>
                  {(files.length <= 0) ? 
                    <List className={classes.list}>
                      <ListItem>
                        <ListItemIcon>
                          <div className={classes.thumb} >
                            <div className={classes.thumbInner}>
                              <img
                                src={API_URL+profilepic}
                                className={classes.img}
                              />
                            </div>
                          </div>
                        </ListItemIcon>
                      </ListItem>  
                    </List>
                    :''
                  }
                </>
                <FormControl error={formState.errors.profile_pic} >
                  <FormHelperText id="component-error-text">{(formState.errors.profile_pic) ? formState.errors.profile_pic[0] : null}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <Grid 
            container
            alignItems="flex-start"
            direction="row"
            justify="flex-end"
            spacing={3}
          >
            <StyledButton
              color="bprimary"
              disabled={isEmpty(files)}
              size="small"
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              save
            </StyledButton> 
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileImage;
