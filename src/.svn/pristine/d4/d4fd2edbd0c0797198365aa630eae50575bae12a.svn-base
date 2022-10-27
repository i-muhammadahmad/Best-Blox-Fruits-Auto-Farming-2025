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
  Checkbox,
  Badge
} from '@material-ui/core';
import { StyledFab } from 'components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CK_CONFIGS } from 'configs';
import Nestable from 'react-nestable';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { forEach } from 'lodash';

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

const CheckPoint = (props) => {

  const {
    checkpointsList,
    formState,
    SetformState,
    hasError,
    handleCheckpointTitleChange,
    handleCheckpointDescChange,
    handleCheckpointIsrequriedChange,
    deleteCheckpoint,
    setCheckpoints
  } = props;
  
  const classes = useStylesModal();
  const dispatch = useDispatch();

  const checkpointSortOrderChanged  = (items, changedItem) => {
    let checkpoint_obj = {};
    forEach(items, function (value, key) {
      checkpoint_obj[value.id] = value;
    });
    setCheckpoints(checkpoint_obj);
  }
  
  const badgeContentHtml = (fid) => {
    return (
      <span onClick={()=>{deleteCheckpoint(fid)}}>
        <CloseIcon />
      </span>
    )
  }

  const ListItemRenderer = ({ item, collapseIcon, index }) => {
    let fid = item['id'];

    return (
        <Paper key={fid} elevation={3} style={{width: "100%", padding: '20px', marginBottom: '20px', backgroundColor: '#FFFFF6', borderTopRightRadius: '17px'}} >
          <StyledFab
            color="bdanger"
            aria-label="edit"
            size="small"
            style={{top: '0px', right: '0px', position: 'absolute'}}
            onClick={() => deleteCheckpoint(fid)}
          >
            <DeleteIcon size="small" />
          </StyledFab>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={4}>
              <TextField
                style={{backgroundColor: '#ffffff'}}
                error={hasError('checkpoint_title_'+fid)}
                fullWidth
                helperText={hasError('checkpoint_title_'+fid) ? formState.errors["checkpoint_title_"+fid][0] : null}
                label="Checkpoint Title"
                name={"checkpoint_title_"+fid}
                onChange={(event)=>{handleCheckpointTitleChange(event, fid)}}
                value={formState.values["checkpoint_title_"+fid] || ''}
                variant="outlined"
                size="small"
              />
            </Grid> 
            <Grid item xs={4} sm={4}>
              <FormControl style={{margin: '0px'}} component="fieldset" className={classes.formControl} error={hasError('checkpoint_isrequried_'+fid)}>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox checked={formState.values["checkpoint_isrequried_"+fid] || false} onChange={(event) => {handleCheckpointIsrequriedChange(event, fid)}} name={"checkpoint_isrequried_"+fid} />}
                    label="Is Required"
                  />
                </FormGroup>
                <FormHelperText component="div" id="bound-error-text">{hasError("checkpoint_isrequried_"+fid) ? formState.errors["checkpoint_isrequried_"+fid][0] : null}</FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <CKEditor
                editor={ClassicEditor}
                config={CK_CONFIGS(localStorage.getItem("token"))}
                data={formState.values['description_'+fid] || ''}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleCheckpointDescChange(event, data, fid);
                }}
              />
              <FormControl error={hasError('description_'+fid)} >
                <FormHelperText id="component-error-text">{hasError('description_'+fid) ? formState.errors['description_'+fid][0] : null}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
    );
  }  

  return (
    <div
      className={classes.root}
    >
      <Nestable
        items={checkpointsList}
        renderItem={ListItemRenderer}
        onChange={(items, changedItem) => {
          checkpointSortOrderChanged(items, changedItem)
        }}
        maxDepth={1}
      />
    </div>
  );

}

export default CheckPoint;