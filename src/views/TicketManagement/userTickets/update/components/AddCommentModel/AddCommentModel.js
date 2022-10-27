import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
	CardContent,
	FormControl,
	FormHelperText,
	TextField,
	Typography
} from '@material-ui/core';
import {
	addComment,
	hideTicketsValidationError,
	getTicketsById
} from 'actions';
import { makeStyles } from '@material-ui/styles';
import { StyledButton, FilesDropzone } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, forEach } from 'lodash';
import useRouter from 'utils/useRouter';
import { CK_CONFIGS } from 'configs';

const schema = {
	description: {
		presence: { allowEmpty: false, message: 'is required' }
	}
};

const useStyles = makeStyles(theme => ({
	root: {
		width: theme.breakpoints.values.lg,
		maxWidth: '100%',
		margin: '0 auto',
		padding: theme.spacing(3, 3, 6, 3)
	},
	projectDetails: {
		marginTop: theme.spacing(3)
	},
	formGroup: {
		marginBottom: theme.spacing(3)
	},
	content: {
		padding: 0
	},
	inner: {
		margin: '10px'
	},
	nameCell: {
		display: 'flex',
		alignItems: 'center'
	}
}));

const AddCommentModel = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const ticketsState = useSelector(state => state.ticketsState);
	const session = useSelector(state => state.session);

	const { showAddCommentModel, setShowAddCommentModel, ...rest } = props;
	const [files, setFiles] = useState([]);
	const [serverFileErrors, setServerFileErrors] = useState([]);
	const [dropZoneConfig, setDropZoneConfig] = useState({
		maxSize: 5000000
	});

	const [formState, setFormState] = useState({
		isValid: false,
		values: {
			object_viewed_id: session.current_page_permissions.object_id,
			id: ticketsState.ticketsRecord.id
		},
		touched: {
			object_viewed_id: true,
			id: true
		},
		errors: {}
	});

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}));
	}, [formState.values]);

	useEffect(() => {
		if (!isEmpty(ticketsState.validation_error)) {
			const errors = ticketsState.validation_error;
			setFormState(formState => ({
				...formState,
				isValid: errors ? false : true,
				errors: errors || {}
			}));
		}
	}, [ticketsState.validation_error]);

	const setDescription = description => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				description: description
			},
			touched: {
				...formState.touched,
				description: true
			}
		}));
		dispatch(hideTicketsValidationError('description'));
	};

	const handleChange = event => {
		event.persist();
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value
			},
			touched: {
				...formState.touched,
				[event.target.name]: true
			}
		}));
		dispatch(hideTicketsValidationError(event.target.name));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		const data = new FormData();
		if(!isEmpty(files)){
      for (let i = 0; i < files.length; i++) {
				console.log(files[i]);
        data.append('attachments[]', files[i]);
      }
    }

		//appending form state to data object
		forEach(formState.values, function(value, key) {
			data.append(key, value);
		});
		data.append('userType','user');
		await dispatch(addComment(data));
		// clearing form data 
		setDescription('');
		setFiles([]);
		await handleModalClose();
		dispatch(getTicketsById(formState.values.id, 'update'));
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;

	const handleModalClose = () => {
		setShowAddCommentModel(false);
	};
	return (
		<>
			<Dialog
				open={showAddCommentModel}
				onClose={handleModalClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				maxWidth="md">
				<DialogTitle id="alert-dialog-title">Add New Comment</DialogTitle>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className={classes.formGroup}>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={12}>
									<Grid container spacing={3}>
										<Grid item xs={12} sm={12}>
											<FormHelperText id="description">
												<Typography component="b">Description</Typography>
											</FormHelperText>
											<CKEditor
												editor={ClassicEditor}
												config={CK_CONFIGS(localStorage.getItem('token'))}
												data={formState.values.description || ''}
												onChange={(event, editor) => {
													const data = editor.getData();
													setDescription(data);
												}}
											/>
											<FormControl error={hasError('description')}>
												<FormHelperText id="component-error-text">
													{hasError('description')
														? formState.errors.description[0]
														: null}
												</FormHelperText>
											</FormControl>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} sm={12}>
									<FilesDropzone
										files={files}
										setFiles={setFiles}
										thumbsAt={'right'}
										customDZconfigs={dropZoneConfig}
										title={'Add Attachments'}
										serverRejectedFiles={serverFileErrors}
									/>
								</Grid>
							</Grid>
						</div>
						<DialogActions>
							<StyledButton color="bdanger" onClick={handleModalClose}>
								Cancel
							</StyledButton>
							<StyledButton
								variant="contained"
								color="bprimary"
								type="submit"
								disabled={!formState.isValid}
								autoFocus={true}>
								Add Comment
							</StyledButton>
						</DialogActions>
					</form>
				</CardContent>
			</Dialog>
		</>
	);
};

export default AddCommentModel;
