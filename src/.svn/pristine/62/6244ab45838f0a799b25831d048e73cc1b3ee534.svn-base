import React from "react";
import { Grid, Box, Typography, Button, makeStyles } from "@material-ui/core";
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete'; 
import EditIcon from '@material-ui/icons/Edit';
import SupportDocBtn from "./SupportDocBtn";

const useStyles = makeStyles({
    buttonIconStyle: {
       marginRight: '3px'
    }
}); 

const CoachingDetails = props => {
    const { cid, coachingRecord, uplodSupportingDoc, showDocDeleteModel, showCoachingDeleteModel, editCoachings, ...rest } = props;
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Box my={1} pl={4}>
                        <Grid style={{ display: "flex" }}>
							<InsertCommentIcon style={{ fontSize: "0.8rem", color: '#28A745', marginRight: '2px', marginTop: '4px' }} />
							<Typography color="secondary" style={{color: '#28A745'}}>
								<div
									className="ck-content" dangerouslySetInnerHTML={{ __html: coachingRecord.description }}
								/>
							</Typography>
						</Grid>
                    </Box>
                    <Grid container justifyContent="flex-end"  style={{color:"grey"}}>
                        <Grid item xs={4}>
                            <Typography style={{textAlign:"right",fontSize:"0.8rem"}}>
                                <i><span>By: </span><span>{coachingRecord.created_by}</span></i>
                            </Typography>
                            {/* <Typography style={{textAlign:"center",fontSize:"0.8rem"}}>
                                <i><span>Status: </span><span>Pending</span></i>
                            </Typography> */}
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{textAlign:"right",fontSize:"0.8rem"}}>
                                <i>{coachingRecord.created_at}</i>
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
                                onClick={()=>{ editCoachings(cid, coachingRecord.uid) }}
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
								onClick={()=>{ showCoachingDeleteModel(cid, coachingRecord.uid) }}
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
                                        uplodSupportingDoc(event, cid, coachingRecord.uid);
                                    }}
                                    onClick={(event)=> { 
                                        event.target.value = null
                                    }}
                                />
                            </Button>    
						</Grid>
                    </Box>
                    {coachingRecord.docs ? Object.values(coachingRecord.docs).map((imgr) => <SupportDocBtn key={imgr.uid} cid={cid} detail_id={coachingRecord.uid} showDocDeleteModel={showDocDeleteModel} imgr={imgr}/>) : ""}
                </Grid>
            </Grid>
        </>
    );
}

export default CoachingDetails;
