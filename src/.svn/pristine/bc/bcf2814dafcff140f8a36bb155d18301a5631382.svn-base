import React from "react";
import { Grid, Box, Typography, Button, makeStyles } from "@material-ui/core";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete'; 
import EditIcon from '@material-ui/icons/Edit';
import SupportDocBtn from "./SupportDocBtn";

const useStyles = makeStyles({
    buttonIconStyle: {
       marginRight: '3px'
    }
}); 

const NoteDetails = props => {
    const { cid, noteRecord, uplodSupportingDoc, showDocDeleteModel, showNoteDeleteModel, editNotes, ...rest } = props;
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Box my={1} pl={4}>
                        <Grid style={{ display: "flex" }}>
							<NoteAddRoundedIcon style={{ fontSize: "1rem", color: '#007bff' }} />
							<Typography color="secondary" style={{color: '#007bff'}}>
								<div
									className="ck-content" dangerouslySetInnerHTML={{ __html: noteRecord.description }}
								/>
							</Typography>
						</Grid>
                    </Box>
                    <Grid container justifyContent="flex-end"  style={{color:"grey"}}>
                        <Grid item xs={4}>
                            <Typography style={{textAlign:"right",fontSize:"0.8rem"}}>
                                <i><span>By: </span><span>{noteRecord.created_by}</span></i>
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{textAlign:"right",fontSize:"0.8rem"}}>
                                <i>{noteRecord.date_created}</i>
                            </Typography>
                        </Grid>
                        <Grid item xs={4} style={{textAlign:"right", fontSize:"0.8rem"}}>
							<Button
                                classes={{
                                    startIcon: classes.buttonIconStyle
                                }}
								variant="text"
								size="small"
								color="secondary"
								startIcon={<EditIcon />}
                                style={{color: '#007bff'}}
                                onClick={()=>{ editNotes(cid, noteRecord.uid) }}
							>
								<u>Edit</u>
							</Button>
							<Button
                                classes={{
                                    startIcon: classes.buttonIconStyle
                                }}
								variant="text"
								size="small"
								color="secondary"
								startIcon={<DeleteIcon />}
								onClick={()=>{ showNoteDeleteModel(cid, noteRecord.uid) }}
								style={{color: '#dc3545'}}
							>
								<u>Delete</u>
							</Button>
						</Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Box mt={1} style={{fontSize:"0.8rem"}}>
                        <Grid style={{ display: "flex" }}>
                            Supporting Documents
                            <Button
                                className="btn-choose"
                                size="small"
                                color="primary"
                                component="label"
                                startIcon={<AddCircleOutlineIcon />}
                                style={{color: '#007bff', minWidth: '30px', padding: '0px', fontSize:"0.8rem"}}
                            >
                                <input
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{ display: "none" }}
                                    type="file"
                                    accept="image/*"
                                    onChange={(event)=> { 
                                        uplodSupportingDoc(event, cid, noteRecord.uid);
                                    }}
                                    onClick={(event)=> { 
                                        event.target.value = null
                                    }}
                                />
                            </Button>    
						</Grid>
                    </Box>
                    {noteRecord.docs ? Object.values(noteRecord.docs).map((imgr) => <SupportDocBtn key={imgr.uid} cid={cid} detail_id={noteRecord.uid} showDocDeleteModel={showDocDeleteModel} imgr={imgr}/>) : ""}
                </Grid>
            </Grid>
        </>
    );
}

export default NoteDetails;
