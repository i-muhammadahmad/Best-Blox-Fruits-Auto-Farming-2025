import React from "react";
import { Grid, Box, Typography, Button, makeStyles } from "@material-ui/core";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SupportDocBtn from "./SupportDocBtn";
import DeleteIcon from '@material-ui/icons/Delete'; 
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    buttonIconStyle: {
       marginRight: '3px'
    }
}); 

const InfractioDetails = props => {
	const { cid, infractionRecord, uplodSupportingDoc, showDocDeleteModel, showInfractionDeleteModel, editInfractions, ...rest } = props;
	const classes = useStyles();

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={9}>
					<Box my={1} pl={4}>
						<Grid style={{ display: "flex" }}>
							<WarningRoundedIcon style={{ fontSize: "1rem", color: '#dc3545' }} />
							<Typography color="secondary" style={{color: '#dc3545'}}>
								{infractionRecord.infraction_name}
								<div
									className="ck-content" dangerouslySetInnerHTML={{ __html: infractionRecord.description }}
								/>
							</Typography>
						</Grid>
					</Box>
					<Grid container justifyContent="flex-end" style={{color:"grey"}}>
						<Grid item xs={4}>
							<Typography style={{textAlign:"right",fontSize:"0.8rem"}}>
								<i><span>By: </span><span>{infractionRecord.created_by}</span></i>
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography style={{textAlign:"right",fontSize:"0.8rem"}}>
								<i>{infractionRecord.created_at}</i>
							</Typography>
						</Grid>
						<Grid item xs={4} style={{textAlign:"right",fontSize:"0.8rem"}}>
							<Button
                                classes={{
                                    startIcon: classes.buttonIconStyle
                                }}
								variant="text"
								size="small"
								color="secondary"
								startIcon={<EditIcon />}
								onClick={()=>{ editInfractions(cid, infractionRecord.uid) }}
								style={{color: '#007bff'}}
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
								onClick={()=>{ showInfractionDeleteModel(cid, infractionRecord.uid) }}
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
                                        uplodSupportingDoc(event, cid, infractionRecord.uid);
                                    }}
                                    onClick={(event)=> { 
                                        event.target.value = null
                                    }}
                                />
                            </Button>    
						</Grid>
                    </Box>
					{infractionRecord.docs ? Object.values(infractionRecord.docs).map((imgr) => <SupportDocBtn key={imgr.id} cid={cid} detail_id={infractionRecord.uid} showDocDeleteModel={showDocDeleteModel} imgr={imgr}/>) : ""}
				</Grid>
			</Grid>
		</>
	);
}

export default InfractioDetails;
