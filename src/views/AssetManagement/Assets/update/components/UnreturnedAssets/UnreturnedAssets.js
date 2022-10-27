import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  assetTypesListFetch,
  saveAssetAsUnreturned,
  getAssetsById 
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, find, join } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
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
  }
}));

const UnreturnedAssets = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const assetsState = useSelector(state => state.assetsState);
  const assetTypesState = useSelector(state => state.assetTypesState);
  const session = useSelector(state => state.session);

  const [AssetTypeValue, setAssetTypeValue] = useState('');
  const [openUnreturnedModel, setOpenUnreturnedModel] = React.useState(false);

  //setting default form state
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
      asset_assigned_from: moment(moment().toDate()).format('YYYY-MM-DD'),
    },
    touched: {
      'object_viewed_id': true,
      asset_assigned_from: true
    },
    errors: {}
  });

  //setting default schema state
  const [schema, setSchema] = useState({
    
  });

  //papulating asset value to formState
  useEffect(() => {
    let record = assetsState.assetsRecord
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'id': record.id,
        'unreturned_notes': record.unreturned_notes,
      },
      touched: {
        ...formState.touched,
        'id': true,
        'unreturned_notes': true,
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsState.assetsRecord]);

  //selecting asset type 
  useEffect(() => {
    let record = assetsState.assetsRecord
    const item = find(assetTypesState.assetTypesList, ['id', record.atype_id])
    setAssetTypeValue(item);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetTypesState.assetTypesList]);


  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.values]);

  //this will revalidate fromstate on schema change
  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  useEffect(() => {
    dispatch(getAssetsById(assetsState.assetsRecord.id, 'update'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUnreturnedNotes = unreturned_notes => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        'unreturned_notes': unreturned_notes
      },
      touched: {
        ...formState.touched,
        'unreturned_notes': true
      }
    }));
  }

  //Unreturned model actions
  const showUnreturnedModel = () => {
    setOpenUnreturnedModel(true)
  }

  const hideUnreturnedModel = () => {
    setOpenUnreturnedModel(false)
  }

  const MarkAssetAsUnreturned = () => {
    dispatch(saveAssetAsUnreturned(formState.values));
    setOpenUnreturnedModel(false)
  }

  const getBinderWithHTML = (value) => {
    let binder_with_arr = [];
    if (value.is_binded_with_employee == 1) {
      binder_with_arr.push('Employee');
    }
    if (value.is_binded_with_office == 1) {
      binder_with_arr.push('Office');
    }
    if (value.is_binded_with_workstation == 1) {
      binder_with_arr.push('Workstation');
    }
    return (
      <span>
        {join(binder_with_arr, [', '])}
      </span>
    );
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
  }

  const handleSubmit = async event => {
    event.preventDefault();
    showUnreturnedModel();
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;


  return (

    <Card
      className={classes.projectDetails}
    >
      <CardContent>
        <form
          onSubmit={handleSubmit}
        >
          <div className={classes.formGroup}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={4}>
                <Typography component="p">
                  <b>Asset Type: </b> {!isEmpty(AssetTypeValue) ? AssetTypeValue.name : ''}
                </Typography>
                <Typography component="p">
                  (<b> Bound With: </b> {!isEmpty(AssetTypeValue) ? getBinderWithHTML(AssetTypeValue) : ''})
                </Typography>
              </Grid> 
              <Grid item xs={6} sm={8}>
              </Grid>
            </Grid>
          </div>
          <div className={classes.formGroup}>
            <CKEditor
              editor={ClassicEditor}
              config={CK_CONFIGS(localStorage.getItem("token"))}
              data={assetsState.assetsRecord.unreturned_notes || ''}
              onChange={(event, editor) => {
                const data = editor.getData();
                setUnreturnedNotes(data)
              }}
            />
            <FormControl error={hasError('unreturned_notes')} >
              <FormHelperText id="component-error-text">{hasError('unreturned_notes') ? formState.errors.unreturned_notes[0] : null}</FormHelperText>
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
            Mark As Unreturned
          </StyledButton>
        </form>
        <Dialog
          open={openUnreturnedModel}
          onClose={hideUnreturnedModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Mark As Unreturned Asset</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to mark this assets as unreturned? <br />
              You will not be able to edit a unreturned asset.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={hideUnreturnedModel}   >
              Cancel
            </StyledButton>
            <StyledButton
              variant="contained"
              color="bdanger"
              startIcon={<DeleteIcon />}
              onClick={MarkAssetAsUnreturned}
              autoFocus={true}
            >
              Mark As Unreturned
            </StyledButton>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UnreturnedAssets;
