import React, { useState, useEffect } from 'react';
import {
	Grid,
	Box,
	Typography,
	Button,
	makeStyles,
	Backdrop,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from '@material-ui/core';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SupportDocBtn from './SupportDocBtn';
import { StyledButton } from 'components';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CK_CONFIGS } from 'configs';
import CancelIcon from '@material-ui/icons/Cancel';
import { isEmpty } from 'lodash';

const useStyles = makeStyles({
	buttonIconStyle: {
		marginRight: '3px'
	}
});

const CoachingDetails = props => {
	const {
		cid,
		coachingRecord,
		updatingCoachingId,
		editCoachings,
		completeCoaching,
		updateCoachingModelOpen,
		setUpdateCoachingModelOpen,
		...rest
	} = props;
	const [coachingsVal, setCoachingsVal] = useState('');
	const classes = useStyles();

	const handleClose = () => {
		setUpdateCoachingModelOpen(false);
		setCoachingsVal('');
	};


	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={10}>
					<Box my={1} pl={4}>
						<Grid style={{ display: 'flex' }}>
							<InsertCommentIcon
								style={{
									fontSize: '0.8rem',
									color: '#28A745',
									marginRight: '2px',
									marginTop: '4px'
								}}
							/>
							<Typography color="secondary" style={{ color: '#28A745' }}>
								<div
									className="ck-content"
									dangerouslySetInnerHTML={{
										__html: coachingRecord.description
									}}
								/>
							</Typography>
						</Grid>
					</Box>
					<Grid container justifyContent="flex-end" style={{ color: 'grey' }}>
						<Grid item xs={4}>
							<Typography style={{ textAlign: 'right', fontSize: '0.8rem' }}>
								<i>
									<span>By: </span>
									<span>{coachingRecord.created_by}</span>
								</i>
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography style={{ textAlign: 'center', fontSize: '0.8rem' }}>
								<i>{coachingRecord.date_created}</i>
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography style={{ textAlign: 'center', fontSize: '0.8rem' }}>
								<i>
									<span>Status: </span>
									<span
										style={{
											color:
												coachingRecord.coaching_status === 0
													? '#dc3545'
													: '#28A745'
										}}>
										{(coachingRecord.coaching_status === 0 && isEmpty(coachingRecord.ack_by_supervisor))
											? 'Pending From Supervisor'
											: coachingRecord.coaching_status === 0
											? 'Pending'
											: 'Completed'}
									</span>
								</i>
							</Typography>
						</Grid>
						{(!isEmpty(coachingRecord.ack_by_supervisor) && coachingRecord.coaching_status == 0) ? (
							<Grid
								item
								xs={2}
								style={{ textAlign: 'right', fontSize: '0.8rem' }}>
								<Button
									classes={{
										startIcon: classes.buttonIconStyle
									}}
									variant="contained"
									size="small"
									color="primary"
									style={{ fontSize: '0.62rem' }}
									onClick={() => {
										editCoachings(cid, coachingRecord.uid, coachingRecord.id);
									}}>
									Complete Coaching
								</Button>
							</Grid>
						) : (
							''
						)}
					</Grid>
				</Grid>
				<Grid item xs={2}>
					<Box mt={1} style={{ fontSize: '0.8rem' }}>
						<Grid style={{ display: 'flex' }}>Supporting Documents</Grid>
					</Box>
					{coachingRecord.docs
						? Object.values(coachingRecord.docs).map(imgr => (
								<SupportDocBtn
									key={imgr.uid}
									cid={cid}
									detail_id={coachingRecord.uid}
									imgr={imgr}
								/>
						  ))
						: ''}
				</Grid>
			</Grid>

			{/* Complete Coaching Model */}
			<div>
				<Dialog
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={updateCoachingModelOpen}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500
					}}>
					<DialogTitle id="form-dialog-title">Complete Coaching</DialogTitle>
					<DialogContent style={{ overflow: 'hidden' }}>
						<Box>
							<CKEditor
								editor={ClassicEditor}
								config={CK_CONFIGS(localStorage.getItem('token'))}
								onInit={editor => {
									editor.editing.view.change(writer => {
										writer.setStyle(
											'height',
											'120px',
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
							onClick={handleClose}>
							CLOSE
						</StyledButton>
						<Button
							variant="contained"
							size="small"
							color="primary"
							onClick={() => {
								completeCoaching(
									updatingCoachingId,
									coachingRecord.audit_form_id,
									coachingsVal,
									'agent'
								);
								setCoachingsVal('');
							}}>
							Complete Coaching
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</>
	);
};

export default CoachingDetails;
