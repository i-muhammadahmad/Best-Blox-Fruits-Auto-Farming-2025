import React from "react";
import { Grid, Box, Typography, makeStyles, Button } from "@material-ui/core";
import InsertCommentIcon from '@material-ui/icons/InsertComment';

const useStyles = makeStyles({
    buttonIconStyle: {
       marginRight: '3px'
    }
}); 

const CoachingDetails = props => {
    const { cid, coachingRecord, setOpenImageViewModel, setImageRecord, ...rest } = props;
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
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{textAlign:"right",fontSize:"0.8rem"}}>
                                <i>{coachingRecord.date_created}</i>
                            </Typography>
                        </Grid>
                        <Grid item xs={4} style={{textAlign:"right", fontSize:"0.8rem"}}>
							
						</Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Box mt={1} style={{fontSize:"0.8rem"}}>
                        <Grid style={{ display: "flex" }}>
                            Supporting Documents
						</Grid>
                    </Box>
                    {coachingRecord.docs ? Object.values(coachingRecord.docs).map((imgr) => (
						<Button key={imgr.id} onClick={(e)=>{setOpenImageViewModel(true); setImageRecord(imgr)}} variant="text" color="primary" size="small" style={{fontSize:"0.7rem",padding:"0"}}>
							<u>{imgr.name}</u>
						</Button>
					))
					:
					''}
                </Grid>
            </Grid>
        </>
    );
}

export default CoachingDetails;
