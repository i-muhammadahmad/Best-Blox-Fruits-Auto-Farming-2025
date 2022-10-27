import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  FormGroup,
	FormControlLabel,
	FormHelperText,
  FormControl,
	Checkbox,
	Box,
	Typography,
	Grid,
	Button
} from "@material-ui/core";
import { isEmpty } from 'lodash';
import CoachingDetails from "./CoachingDetails";
import {
	updateCoaching
} from 'actions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CheckpointDetails = props => {
  const { 
		crecord,
		hasError,
		formState,
		setFormState,
		schema,
		setSchema, 
		handleCheckpointChange,
		setCheckpoints,
		checkpoints,
		files,
		setFiles,
		showDeleteAlert,
		setShowDeleteAlert,
		deleteAlertDetails,
		setdeleteAlertDetails,
		detections,
		setDetections,
		setDeletedDetails,
		setDeletedFiles,
		completeCoaching,
		updateCoachingModelOpen,
		setUpdateCoachingModelOpen,
		...rest 
	} = props;
	const dispatch = useDispatch();
	const session = useSelector(state => state.session);

  const classes = useStyles(); 
	let cid = crecord.cid;

	const [coachingRecord, setCoachingRecord] = useState([]);
	const [updatingCoachingId, setUpdatingCoachingId] = useState(null);


	const editCoachings = async (chk_id, detail_id, coachingId) => {
		await setCoachingRecord(checkpoints[chk_id]['details'][detail_id]);
		await setUpdatingCoachingId(coachingId);
		await setUpdateCoachingModelOpen(true);
	} 

  return (
    <Grid container spacing={3}>
				<Grid item xs={10}>
					<Paper elevation={2}>
						<Box mb={1} p={2} style={{ borderRadius: "15px" }}>
							<Grid container>
								<Grid item xs={8}>
                  <FormControl style={{margin: '0px'}} component="fieldset" className={classes.formControl} error={hasError('checkpoint_isrequried_'+cid)}>
                    <FormGroup row>
                      <FormControlLabel
                        control={<Checkbox checked={formState.values["setup_checkpoint_"+cid] || false} disabled={true} onChange={(event) => {handleCheckpointChange(event, cid)}} name={"setup_checkpoint_"+cid} />}
                        label={
                          <Typography>
                            <b>{crecord.title}</b>
                          </Typography>
                        }
                      />
                    </FormGroup>
                    <FormHelperText component="div" id="bound-error-text">{hasError("setup_checkpoint_"+cid) ? formState.errors["setup_checkpoint_"+cid][0] : null}</FormHelperText> 
                  </FormControl>
								</Grid>
								<Grid item xs={4}>
								</Grid>
							</Grid>
							<Box>
								<div
									className="ck-content" dangerouslySetInnerHTML={{ __html: crecord.description }}
								/>
							</Box>
							{/* Showing Details Of Notes And Infractions */}
							<Box mt={2}>
								<Grid container>
									<Grid item xs={12}>
										{!isEmpty(crecord.details)?
											<>
											{Object.values(crecord.details).map((c_detail) => (
												<>
													{(c_detail.detail_type === 'coachings')?
														<CoachingDetails 
															coachingRecord={c_detail}
															setCoachingRecord={setCoachingRecord}
															cid={cid}
															key={c_detail.uid}
															updatingCoachingId={updatingCoachingId}
															editCoachings={editCoachings}
															completeCoaching={completeCoaching}
															updateCoachingModelOpen={updateCoachingModelOpen}
															setUpdateCoachingModelOpen={setUpdateCoachingModelOpen}
														/>
														: ''
													}
												</>											
											))}
											</>
										:''
										}
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Paper>
				</Grid>
			</Grid>
  );
};

export default CheckpointDetails;
