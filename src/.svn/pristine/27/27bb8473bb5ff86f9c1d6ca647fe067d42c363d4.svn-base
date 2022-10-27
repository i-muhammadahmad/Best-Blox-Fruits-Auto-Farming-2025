import React, { useState, useEffect } from "react";
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
import uuid from 'uuid/v1';
import InfractionButton from "./InfractionButton";
import NoteButton from "./NoteButton";
import NoteDetails from "./NoteDetails";
import InfractionDetail from "./InfractionDetail";
import CoachingButton from "./CoachingButton";
import CoachingDetails from "./CoachingDetails";

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
		...rest 
	} = props;

  const classes = useStyles(); 
	let cid = crecord.cid;

	const [infractionRecord, setInfractionRecord] = useState([]);
	const [infractionModelOpen, setInfractionModelOpen] = useState(false);
	const [noteRecord, setNoteRecord] = useState([]);
	const [noteModelOpen, setNoteModelOpen] = useState(false);
	const [coachingRecord, setCoachingRecord] = useState([]);
	const [coachingModelOpen, setCoachingModelOpen] = useState(false);

	const editNotes = async (chk_id, detail_id) => {
		await setNoteRecord(checkpoints[chk_id]['details'][detail_id]);
		await setNoteModelOpen(true);
	} 

	const editCoachings = async (chk_id, detail_id) => {
		await setCoachingRecord(checkpoints[chk_id]['details'][detail_id]);
		await setCoachingModelOpen(true);
	}

	const editInfractions = async (chk_id, detail_id) => {
		await setInfractionRecord(checkpoints[chk_id]['details'][detail_id]);
		await setInfractionModelOpen(true);
	} 
	
	const uplodSupportingDoc = (event, chk_id, detail_id) => { 
		let imgid = uuid();
		let file = event.target.files[0];
		setCheckpoints(checkpoints => ({
			...checkpoints,
			[chk_id]:{
				...checkpoints[chk_id],
				details: {
					...checkpoints[chk_id]['details'],
					[detail_id]: {
						...checkpoints[chk_id]['details'][detail_id],
						['docs']: {
							...checkpoints[chk_id]['details'][detail_id]['docs'],
							[imgid]:{
								id: '',
								uid: imgid,
								name: file.name
							}
						}
					}
				}
			}
		}));

		setFiles(files => ({
			...files,
			[detail_id]:{
				...files[detail_id],
				[imgid]:file
			}
		}));
		
	}

	const showDocDeleteModel = async (chk_id, detail_id, image_id) => {
		await setdeleteAlertDetails({
			title: 'Delete Supporting Document',
			desc: 'Are you sure, You want delete this supporting document?',
			delCallback: () => { removeSupportingDoc(chk_id, detail_id, image_id)},
			onModelClose: () => { /*nothing to do*/ }
		});
		await setShowDeleteAlert(true);
	}

	const removeSupportingDoc = (chk_id, detail_id, image_id) => {
		let checkpoints_docs_arr = {...checkpoints[chk_id]['details'][detail_id]['docs']};
		let detail_files_arr = {...files[detail_id]};

		delete checkpoints_docs_arr[image_id];
		delete detail_files_arr[image_id];

		setCheckpoints(checkpoints => ({
			...checkpoints,
			[chk_id]:{
				...checkpoints[chk_id],
				details: {
					...checkpoints[chk_id]['details'],
					[detail_id]: {
						...checkpoints[chk_id]['details'][detail_id],
						['docs']: checkpoints_docs_arr
					}
				}
			}
		}));

		setFiles(files => ({
			...files,
			[detail_id]: detail_files_arr
		}));

	}

	const showInfractionDeleteModel = async (chk_id, detail_id) => {
		await setdeleteAlertDetails({
			title: 'Delete Infraction',
			desc: 'Are you sure, You want delete this infraction?',
			delCallback: () => { removeCheckpointDetail(chk_id, detail_id)},
			onModelClose: () => { /*nothing to do*/ }
		});
		await setShowDeleteAlert(true);
	}

	const showNoteDeleteModel = async (chk_id, detail_id) => {
		await setdeleteAlertDetails({
			title: 'Delete Note',
			desc: 'Are you sure, You want delete this note?',
			delCallback: () => { removeCheckpointDetail(chk_id, detail_id)},
			onModelClose: () => { /*nothing to do*/ }
		});
		await setShowDeleteAlert(true);
	}

	const showCoachingDeleteModel = async (chk_id, detail_id) => {
		await setdeleteAlertDetails({
			title: 'Delete Coaching',
			desc: 'Are you sure, You want delete this coaching?',
			delCallback: () => { removeCheckpointDetail(chk_id, detail_id)},
			onModelClose: () => { /*nothing to do*/ }
		});
		await setShowDeleteAlert(true);
	}

	const removeCheckpointDetail = async (chk_id, detail_id) => {
		let checkpoints_deatil_arr = {...checkpoints[chk_id]['details']};
		let formstate_arr = {...formState};
		let schema_arr = {...schema};
		let files_arr = {...files};

		if(checkpoints_deatil_arr[detail_id]['detail_type'] === 'infraction'){
			delete detections[detail_id];
		}

		delete checkpoints_deatil_arr[detail_id];
		delete formstate_arr['values']['setup_checkpoint_'+detail_id];
		delete formstate_arr['touched']['setup_checkpoint_'+detail_id];
		delete formstate_arr['errors']['setup_checkpoint_'+detail_id];
		delete schema_arr['setup_checkpoint_'+detail_id];
		delete files_arr[detail_id];

		await setCheckpoints(checkpoints => ({
			...checkpoints,
			[chk_id]:{
				...checkpoints[chk_id],
				details: checkpoints_deatil_arr
			}
		}));

		await setSchema(schema_arr);

		await setFormState(formstate => ({
			...formstate,
			values: formstate_arr['values'],
			touched: formstate_arr['touched'],
			errors: formstate_arr['errors']
		}));

		await setDetections({...detections});

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
                        control={<Checkbox checked={formState.values["setup_checkpoint_"+cid] || false} onChange={(event) => {handleCheckpointChange(event, cid)}} name={"setup_checkpoint_"+cid} />}
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
													{(c_detail.detail_type === 'infraction')?
														<InfractionDetail
															infractionRecord={c_detail}
															cid={cid}
															key={c_detail.uid}
															uplodSupportingDoc={uplodSupportingDoc}
															showDocDeleteModel={showDocDeleteModel}
															showInfractionDeleteModel={showInfractionDeleteModel}
															editInfractions={editInfractions}
															setDetections={setDetections}
														/>
														: (c_detail.detail_type === 'notes') ?
														<NoteDetails
															noteRecord={c_detail}
															cid={cid}
															key={c_detail.uid}
															uplodSupportingDoc={uplodSupportingDoc}
															showDocDeleteModel={showDocDeleteModel}
															showNoteDeleteModel={showNoteDeleteModel}
															editNotes={editNotes}
														/>
														:
														<CoachingDetails
															coachingRecord={c_detail}
															cid={cid}
															key={c_detail.uid}
															uplodSupportingDoc={uplodSupportingDoc}
															showDocDeleteModel={showDocDeleteModel}
															showCoachingDeleteModel={showCoachingDeleteModel}
															editCoachings={editCoachings}
														/>
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
				<Grid item xs={2}>
					<Grid container spacing={3}>
						<Box pt={2}>
							<Grid item xs={12}>
								<InfractionButton
									setCheckpoints={setCheckpoints}
									cid={cid}
									infractionRecord={infractionRecord}
									setInfractionRecord={setInfractionRecord} 
									infractionModelOpen={infractionModelOpen} 
									setInfractionModelOpen={setInfractionModelOpen}
									setFormState={setFormState}
									formState={formState}
									setDetections={setDetections}
								/>
							</Grid>
							<Grid item xs={12}>
								<NoteButton 
									setCheckpoints={setCheckpoints}
									cid={cid}
									noteRecord={noteRecord} 
									setNoteRecord={setNoteRecord} 
									noteModelOpen={noteModelOpen}
									setNoteModelOpen={setNoteModelOpen}
								/>
							</Grid>
							<Grid item xs={12}>
								<CoachingButton
									setCheckpoints={setCheckpoints}
									cid={cid}
									coachingRecord={coachingRecord} 
									setCoachingRecord={setCoachingRecord} 
									coachingModelOpen={coachingModelOpen}
									setCoachingModelOpen={setCoachingModelOpen}
								/>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Grid>
  );
};

export default CheckpointDetails;
