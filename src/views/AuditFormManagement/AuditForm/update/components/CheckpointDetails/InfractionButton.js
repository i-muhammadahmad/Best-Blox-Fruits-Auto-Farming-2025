import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import uuid from 'uuid/v1';
import { 
    makeStyles,
    Backdrop,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Button,
    TextField,
    Grid
} from '@material-ui/core';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CK_CONFIGS } from 'configs';
import { StyledButton } from 'components';
import CancelIcon from '@material-ui/icons/Cancel';
import { isEmpty, find } from 'lodash';
import moment from 'moment';

const useStylesModal = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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


function InfractionButton(props) {
    const { formState, setFormState, infractionRecord, setInfractionRecord, infractionModelOpen, setInfractionModelOpen, setCheckpoints, cid, setDetections, ...rest } = props;

    const auditFormInfractionState = useSelector(state => state.auditFormInfractionState);
    const session = useSelector(state => state.session);
    
    const [notesVal, setNotesVal] = useState('');
    const [infractionVal, setInfractionVal] = useState(null);
    const [infractionId, setInfractionId] = useState('');
    const classes = useStylesModal();

    useEffect(() => {
        if(!isEmpty(infractionRecord)){
            setNotesVal(infractionRecord.description);
            setInfractionId(infractionRecord.infraction_id);
            const item = find(auditFormInfractionState.auditFormInfractionDropdownList, ['id', infractionRecord.infraction_id])
            setInfractionVal(item);
        }
    }, [infractionRecord]);

    const handleClickOpen = () => {
        setInfractionModelOpen(true);
    };

    const handleClose = () => {
        setInfractionModelOpen(false);
        setInfractionVal(null);
        setInfractionId('');
    };

    const saveInfractions = (event) => {
        if(isEmpty(infractionRecord)){
            addInfractions(event);
        }
        else{
            updateInfractions(event);
        }
    }

    const addInfractions = async event => {
        event.preventDefault();
        let uid = uuid();

        await setDetections(detections => ({
            ...detections,
            [uid]: infractionVal.deduction_percentage
        }));

        await setCheckpoints(checkpoints => ({
			...checkpoints,
			[cid]:{
				...checkpoints[cid],
				'details': {
                    ...checkpoints[cid]['details'],
                    [uid]: {
                        ...checkpoints[cid]['details'][uid],
                        'description': notesVal,
                        'detail_type': 'infraction',
                        'audit_form_checkpoint_id': '',
                        'infraction_id': infractionId,
                        'infraction_name': infractionVal.opt_display,
                        'created_by': session.user.name,
                        'date_created': moment(moment().toDate()).format('YYYY-MM-DD HH:mm:ss'),
                        'id': '',
                        'uid': uid
                    }
                }
			}
        }));
        
        await setInfractionModelOpen(false);
        await setInfractionVal(null);
        await setInfractionId('');
        await setNotesVal('');;

    }

    const updateInfractions = async event => {
        event.preventDefault();
        let uid = infractionRecord.uid;

        await setDetections(detections => ({
            ...detections,
            [uid]: infractionVal.deduction_percentage
        }));

        await setCheckpoints(checkpoints => ({
			...checkpoints,
			[cid]:{
				...checkpoints[cid],
				'details': {
                    ...checkpoints[cid]['details'],
                    [uid]: {
                        ...checkpoints[cid]['details'][uid],
                        'description': notesVal,
                        'infraction_id': infractionId,
                        'infraction_name': infractionVal.opt_display,
                    }
                }
			}
        }));

        await setInfractionModelOpen(false);
        await setInfractionVal(null);
        await setInfractionId('');
        await setNotesVal('');
        await setInfractionRecord([]);
    }

    return (
        <>
            <Button
                variant="text"
                size="small"
                color="secondary"
                startIcon={<WarningRoundedIcon />}
                onClick={handleClickOpen}
                style={{color: '#dc3545'}}
            >
                <u>Add Infraction</u>
            </Button>
            <Dialog
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={infractionModelOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <DialogTitle id="form-dialog-title">
                    {isEmpty(infractionRecord)? 'Add': 'Update'} Infraction
                </DialogTitle>
                <DialogContent style={{overflow: 'hidden'}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            {(auditFormInfractionState.auditFormInfractionDropdownList)?
                                <Autocomplete
                                    id="audit_form_setup_id"
                                    value={infractionVal}
                                    onChange={(event, newValue) => {
                                        if(newValue){
                                            setInfractionVal(newValue);
                                            setInfractionId(newValue.id);
                                        }
                                        else{
                                            setInfractionVal(newValue);
                                            setInfractionId('');
                                        }
                                    }}
                                    options={auditFormInfractionState.auditFormInfractionDropdownList}
                                    getOptionLabel={(option) => option.opt_display}
                                    size="small"
                                    renderInput={(params) => <TextField {...params} size="small" label="Select Infraction" variant="outlined" />}
                                />
                            :''}
                        </Grid>    
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <CKEditor
                                editor={ClassicEditor}
                                config={CK_CONFIGS(localStorage.getItem("token"))}
                                data={notesVal || ''}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setNotesVal(data);
                                }}
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
                        size="small"
                        variant="contained"
                        onClick={saveInfractions}
                        disabled={isEmpty(infractionId)}
                    >
                        {isEmpty(infractionRecord)? 'Add': 'Update'}  Infractions
                    </StyledButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

InfractionButton.defaultProps = {
    infractionRecord: []
};

export default InfractionButton;
