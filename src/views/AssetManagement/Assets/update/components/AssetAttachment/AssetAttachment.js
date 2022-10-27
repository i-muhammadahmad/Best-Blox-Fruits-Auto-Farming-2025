import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, FilesDropzone, AttachmentsPreviewer } from 'components';
import {
  assetTypesListFetch,
  saveAssetsDiscarding,
  getAssetsById,
  uploadAssetAttachments,
  getAttachmentsByAssetId,
  deleteAssetAttachment
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
  
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, find, join, forEach, split } from 'lodash';
import useRouter from 'utils/useRouter';
import { CK_CONFIGS, API_URL } from 'configs';

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
  },
  
}));

const AssetAttachment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const assetsState = useSelector(state => state.assetsState);
  const assetTypesState = useSelector(state => state.assetTypesState);
  const session = useSelector(state => state.session);

  const [AssetTypeValue, setAssetTypeValue] = useState('');
  const [files, setFiles] = useState([]);
  const [serverFileErrors, setServerFileErrors] = useState([]);
  const [dropZoneConfig, setDropZoneConfig] = useState({
    maxSize: 5000000,
  });
  const [attachmentList, setAttachmentList] = useState([]);

  //setting default form state
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
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
      },
      touched: {
        ...formState.touched,
        'id': true,
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

  //selecting asset type 
  useEffect(() => {
    setAttachmentList(assetsState.assetAttachmentList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsState.assetAttachmentList]);

  //selecting asset type 
  useEffect(() => {
    dispatch(getAttachmentsByAssetId(assetsState.assetsRecord.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetTypesState.assetTypesList]);

  useEffect(() => {
    let errors = assetsState.attachment_validation_error;
    var files_error = {};
    
    forEach(errors, (err, i) => {
      let findex = i.split(".")[1];
      
      let ferrs = [];
      forEach(err, (emsg, ei) => {
        ferrs[ei] = {
          'code': i+ei,
          'message': emsg
        }
      });
      
      files_error[findex] = {
        'file': {},
        'errors': {}
      }

      files_error[findex] = {
        ...files_error[findex],
        ['file']:{
          ...files_error[findex]['file'],
          'path': files[findex]['path'],
          'name': files[findex]['name'],
          'size': files[findex]['size'],
        },
        ['errors']: ferrs
      }

    });

    setServerFileErrors(Object.values(files_error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsState.attachment_validation_error]);

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

  const uploadAllFiles = async event => {
    event.preventDefault();
    //files
    //apending media
    let data = new FormData();

    //appending form state to data object
    forEach(formState.values, function (value, key) {
      data.append(key, value);
    });

    if (!isEmpty(files)) {
      forEach(files, function(value) {
        data.append('attachments[]', value);
      });

      await dispatch(uploadAssetAttachments(data));
    }
    await setFiles([]);
    dispatch(getAttachmentsByAssetId(assetsState.assetsRecord.id));

  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const delAssetAttachment = async (e, record_id) => {
    e.preventDefault();
    await dispatch(deleteAssetAttachment(record_id, session.current_page_permissions.object_id));
    await dispatch(getAttachmentsByAssetId(assetsState.assetsRecord.id));
  }
  
  const downloadAssetAttachment = (e, record_id) => {
    window.location.href = API_URL+'assets/downloadAssetAttachment?id='+record_id;
  }

  return (
    <>

      <Card
        className={classes.projectDetails}
      >
        <CardContent>
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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FilesDropzone
                  files={files}
                  setFiles={setFiles}
                  customDZconfigs={dropZoneConfig}
                  title={'Asset Attachments'}
                  thumbsAt={'right'}
                  showUploadbtn={true}
                  uploadAllCallback={uploadAllFiles}
                  serverRejectedFiles={serverFileErrors}
                />
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader
          title="Assets Attachments"
        />
        <CardContent>
          <AttachmentsPreviewer 
            attachmentList={attachmentList}
            setAttachmentList={setAttachmentList}
            deleteCallback={delAssetAttachment} 
            downloadCallback={downloadAssetAttachment}
          />
        </CardContent>
      </Card>
    </>  
  );
};

export default AssetAttachment;
