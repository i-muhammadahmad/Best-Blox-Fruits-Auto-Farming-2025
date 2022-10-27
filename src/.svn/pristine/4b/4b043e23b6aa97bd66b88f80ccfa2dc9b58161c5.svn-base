import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import uuid from 'uuid/v1';
import { 
    makeStyles,
    Backdrop,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Button
} from '@material-ui/core';
import { StyledButton } from 'components';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CK_CONFIGS } from 'configs';
import CancelIcon from '@material-ui/icons/Cancel';
import { isEmpty } from 'lodash';
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

function NoteButton(props) {
    const { setCheckpoints, cid, noteRecord, setNoteRecord, noteModelOpen, setNoteModelOpen, ...rest } = props;

    const session = useSelector(state => state.session);

    const [open, setOpen] = useState(false);
    const [notesVal, setNotesVal] = useState('');
    const classes = useStylesModal();

    useEffect(() => {
        if(!isEmpty(noteRecord)){
            setNotesVal(noteRecord.description);
        }
    }, [noteRecord]);

    const handleClickOpen = () => {
        setNoteModelOpen(true);
    };

    const handleClose = () => {
        setNoteModelOpen(false);
        setNotesVal('');
        setNoteRecord([]);
    };

    const saveNotes = (event) => {
        if(isEmpty(noteRecord)){
            addNotes(event);
        }
        else{
            updateNotes(event);
        }
    }

    const addNotes = async event => {
        event.preventDefault();
        let uid = uuid();
        await setCheckpoints(checkpoints => ({
			...checkpoints,
			[cid]:{
				...checkpoints[cid],
				'details': {
                    ...checkpoints[cid]['details'],
                    [uid]: {
                        ...checkpoints[cid]['details'][uid],
                        'description': notesVal,
                        'detail_type': 'notes',
                        'created_by': session.user.name,
                        'date_created': moment(moment().toDate()).format('YYYY-MM-DD HH:mm:ss'),
                        'id': '',
                        'audit_form_checkpoint_id': '',
                        'uid': uid
                    }
                }
			}
        }));
        
        await setNoteModelOpen(false);
        await setNotesVal('');

    }

    const updateNotes = async event => {
        event.preventDefault();
        let uid = noteRecord.uid;
        await setCheckpoints(checkpoints => ({
			...checkpoints,
			[cid]:{
				...checkpoints[cid],
				'details': {
                    ...checkpoints[cid]['details'],
                    [uid]: {
                        ...checkpoints[cid]['details'][uid],
                        'description': notesVal,
                    }
                }
			}
        }));

        await setNoteModelOpen(false);
        await setNotesVal('');
        await setNoteRecord([]);
    }

    return (
        <>
            <Button
                size="small"
                color="primary"
                startIcon={<NoteAddRoundedIcon />}
                onClick={handleClickOpen}
                style={{color: '#007bff'}}
            >
                <u>Add Note</u>
            </Button>
            <Dialog 
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={noteModelOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <DialogTitle id="form-dialog-title">
                    {isEmpty(noteRecord)? 'Add':'Update'} Note
                </DialogTitle>
                <DialogContent style={{overflow: 'hidden'}} >
                    <Box>
                        <CKEditor
                            editor={ClassicEditor}
                            config={CK_CONFIGS(localStorage.getItem("token"))}
                            data={notesVal || ''}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setNotesVal(data);
                            }}
                        />
                    </Box>
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
                        onClick={saveNotes}
                        disabled={isEmpty(notesVal.replace(/<\/?[^>]+(>|$)/g, ""))}
                    >
                        {isEmpty(noteRecord)? 'Add':'Update'} Notes
                    </StyledButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

NoteButton.defaultProps = {
    noteRecord: []
};

export default NoteButton;
