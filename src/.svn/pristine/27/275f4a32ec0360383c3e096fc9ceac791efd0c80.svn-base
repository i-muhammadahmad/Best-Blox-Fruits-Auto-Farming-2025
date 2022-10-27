import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
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

function CoachingButton(props) {
    const { setCheckpoints, cid, coachingRecord, setCoachingRecord, coachingModelOpen, setCoachingModelOpen, ...rest } = props;

    const session = useSelector(state => state.session);

    const [open, setOpen] = useState(false);
    const [coachingsVal, setCoachingsVal] = useState('');
    const classes = useStylesModal();

    useEffect(() => {
        if(!isEmpty(coachingRecord)){
            setCoachingsVal(coachingRecord.description);
        }
    }, [coachingRecord]);

    const handleClickOpen = () => {
        setCoachingModelOpen(true);
    };

    const handleClose = () => {
        setCoachingModelOpen(false);
        setCoachingsVal('');
        setCoachingRecord([]);
    };

    const saveCoachings = (event) => {
        if(isEmpty(coachingRecord)){
            addCoachings(event);
        }
        else{
            updateCoachings(event);
        }
    }

    const addCoachings = async event => {
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
                        'description': coachingsVal,
                        'detail_type': 'coachings',
                        'created_by': session.user.name,
                        'date_created': moment(moment().toDate()).format('YYYY-MM-DD HH:mm:ss'),
                        'id': '',
                        'audit_form_checkpoint_id': '',
                        'uid': uid
                    }
                }
			}
        }));
        
        await setCoachingModelOpen(false);
        await setCoachingsVal('');

    }

    const updateCoachings = async event => {
        event.preventDefault();
        let uid = coachingRecord.uid;
        await setCheckpoints(checkpoints => ({
			...checkpoints,
			[cid]:{
				...checkpoints[cid],
				'details': {
                    ...checkpoints[cid]['details'],
                    [uid]: {
                        ...checkpoints[cid]['details'][uid],
                        'description': coachingsVal,
                    }
                }
			}
        }));

        await setCoachingModelOpen(false);
        await setCoachingsVal('');
        await setCoachingRecord([]);
    }

    return (
        <>
            <Button
                size="small"
                color="primary"
                startIcon={<InsertCommentIcon />}
                onClick={handleClickOpen}
                style={{color: '#28A745'}}
            >
                <u>Add Coaching</u>
            </Button>
            <Dialog 
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={coachingModelOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <DialogTitle id="form-dialog-title">
                    {isEmpty(coachingRecord)? 'Add':'Update'} Coaching
                </DialogTitle>
                <DialogContent style={{overflow: 'hidden'}} >
                    <Box>
                        <CKEditor
                            editor={ClassicEditor}
                            config={CK_CONFIGS(localStorage.getItem("token"))}
                            onInit={(editor) => {
                                editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    "120px",
                                    editor.editing.view.document.getRoot()
                                );
                                });
                            }}
                            data={coachingsVal || ''}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setCoachingsVal(data);
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
                        onClick={saveCoachings}
                        disabled={isEmpty(coachingsVal.replace(/<\/?[^>]+(>|$)/g, ""))}
                    >
                        {isEmpty(coachingRecord)? 'Add':'Update'} Coaching
                    </StyledButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

CoachingButton.defaultProps = {
    coachingRecord: []
};

export default CoachingButton;
