import React from "react";
import { Grid, Box, Typography, Button, makeStyles } from "@material-ui/core";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

const useStyles = makeStyles({
    buttonIconStyle: {
       marginRight: '3px'
    }
}); 

const InfractioDetails = props => {
	const { infractionRecord, setOpenImageViewModel, setImageRecord, ...rest } = props;
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
								<i>{infractionRecord.date_created}</i>
							</Typography>
						</Grid>
						<Grid item xs={4} style={{textAlign:"right",fontSize:"0.8rem"}}>
							
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={3}>
					<Box mt={1} style={{fontSize:"0.8rem"}}>
                        <Grid style={{ display: "flex" }}>
                            Supporting Documents
						</Grid>
                    </Box>
					{infractionRecord.docs ? Object.values(infractionRecord.docs).map((imgr) => (
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

export default InfractioDetails;
