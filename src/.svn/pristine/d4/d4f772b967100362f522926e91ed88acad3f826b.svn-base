import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
	Page,
	StyledButton,
	FilesDropzone,
	AttachmentsPreviewer
} from 'components';
import { Header } from './components';
import {
	addEmailTemplates,
	hideEmailTemplatesValidationError,
	redirectToEmailTemplatesList
} from 'actions';
import {
	Card,
	CardHeader,
	CardContent,
	TextField,
	Grid,
	FormControl,
	FormHelperText,
	Tooltip,
  Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, forEach, map } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';
import { ClientDropdown } from 'commonDropdowns';

const schema = {
	name: {
		presence: { allowEmpty: false, message: '^Template Name is required' }
	},
	client_ids: {
		presence: { allowEmpty: false, message: '^Client is required' }
	},
  to: {
		presence: { allowEmpty: false, message: '^Please Add To Email.' }
	},
  subject: {
		presence: { allowEmpty: false, message: '^Please Add Email Subject.' }
	},
  body: {
		presence: { allowEmpty: false, message: '^Please Add Email Body.' }
	},
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
	}
}));

const useStylesBootstrap = makeStyles(theme => ({
	arrow: {
		color: theme.palette.common.black
	},
	tooltip: {
		backgroundColor: theme.palette.common.black
	}
}));

function BootstrapTooltip(props) {
	const classes = useStylesBootstrap();

	return <Tooltip arrow classes={classes} {...props} />;
}

const EmailTemplatesAdd = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const emailTemplatesState = useSelector(state => state.emailTemplatesState);
	const session = useSelector(state => state.session);
	const [ClientValue, setClientValue] = useState([]);
	const [files, setFiles] = useState([]);
	const [serverFileErrors, setServerFileErrors] = useState([]);
	const [dropZoneConfig, setDropZoneConfig] = useState({
		maxSize: 5000000,
		maxFiles: 1,
	});

	const [formState, setFormState] = useState({
		isValid: false,
		values: {
			object_viewed_id: session.current_page_permissions.object_id
		},
		touched: {
			object_viewed_id: true
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
		if (!isEmpty(emailTemplatesState.validation_error)) {
			const errors = emailTemplatesState.validation_error;
			setFormState(formState => ({
				...formState,
				isValid: errors ? false : true,
				errors: errors || {}
			}));
		}
	}, [emailTemplatesState.validation_error]);

	useEffect(() => {
		if (emailTemplatesState.redirect_to_list) {
			router.history.push('/email-template');
		}
	}, [emailTemplatesState.redirect_to_list, router.history]);

	const setBody = body => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				body: body
			},
			touched: {
				...formState.touched,
				body: true
			}
		}));
		dispatch(hideEmailTemplatesValidationError('body'));
	};

	const clientOnChange = (event, newValue) => {
		if (newValue) { 
      setClientValue(newValue)
      let camp_ids = (map(newValue,'id'))
      setClientIds(camp_ids)
    }
    else {
      setClientValue(newValue)
      setClientIds([])
    }
	};

	const setClientIds = client_ids => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				client_ids: client_ids
			},
			touched: {
				...formState.touched,
				client_ids: true
			}
		}));
		dispatch(hideEmailTemplatesValidationError('client_ids'));
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
		dispatch(hideEmailTemplatesValidationError(event.target.name));
	};

	const handleSubmit = async event => {
		event.preventDefault();
    const data = new FormData();
		if(!isEmpty(files[0])){
			data.append('attachment', files[0]);
		}

    //appending form state to data object
    forEach(formState.values, function(value, key) {
      data.append(key, value);
    });
		dispatch(addEmailTemplates(data));
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;

	return (
		<Page className={classes.root} title="Add Email Template">
			<Header />
			<Card className={classes.projectDetails}>
				<CardHeader title="Add Email Template" />
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className={classes.formGroup}>
							<Grid container spacing={3}>
								<Grid item xs={8} sm={8}>
									<Grid container spacing={3}>
										<Grid item xs={6}>
											<TextField
												error={hasError('name')}
												fullWidth
												helperText={
													hasError('name') ? formState.errors.name[0] : null
												}
												label="Name"
												name="name"
												onChange={handleChange}
												value={formState.values.name || ''}
												variant="outlined"
												size="small"
											/>
										</Grid>
										<Grid item xs={6}>
											<ClientDropdown
												ClientValue={ClientValue}
												setClientValue={setClientValue}
												id="client_ids"
												name="client_ids"
												clientOnChange={clientOnChange}
												showSelectAllOption={true}
                        multiple={true}
                        limitTags={2}
												renderInput={params => (
													<TextField
														{...params}
														size="small"
														label="Select Client"
														variant="outlined"
														error={hasError('client_ids')}
														helperText={
															hasError('client_ids')
																? formState.errors.client_ids[0]
																: null
														}
													/>
												)}
											/>
										</Grid>
										<Grid item xs={12}>
											<BootstrapTooltip title="Add multiple emails separated by semicolon ';'">
												<TextField
													error={hasError('to')}
													fullWidth
													helperText={
														hasError('to') ? formState.errors.to[0] : null
													}
													label="To"
													name="to"
													onChange={handleChange}
													value={formState.values.to || ''}
													variant="outlined"
													size="small"
                          multiline
                          rowsMax={4}
												/>
											</BootstrapTooltip>
										</Grid>
										<Grid item xs={12}>
											<TextField
												error={hasError('cc')}
												fullWidth
												helperText={
													hasError('cc') ? formState.errors.cc[0] : null
												}
												label="CC"
												name="cc"
												onChange={handleChange}
												value={formState.values.cc || ''}
												variant="outlined"
												size="small"
                        multiline
                        rowsMax={4}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												error={hasError('bcc')}
												fullWidth
												helperText={
													hasError('bcc') ? formState.errors.bcc[0] : null
												}
												label="BCC"
												name="bcc"
												onChange={handleChange}
												value={formState.values.bcc || ''}
												variant="outlined"
												size="small"
                        multiline
                        rowsMax={4}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												error={hasError('subject')}
												fullWidth
												helperText={
													hasError('subject')
														? formState.errors.subject[0]
														: null
												}
												label="Subject"
												name="subject"
												onChange={handleChange}
												value={formState.values.subject || ''}
												variant="outlined"
												size="small"
                        multiline
                        rowsMax={4}
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={4} sm={4}>
									<FilesDropzone
										files={files}
										setFiles={setFiles}
										thumbsAt={'bottom'}
										customDZconfigs={dropZoneConfig}
										title={'Add Attachment'}
										serverRejectedFiles={serverFileErrors}
									/>
								</Grid>
							</Grid>
						</div>
						<div className={classes.formGroup}>
							<FormHelperText id="body">
								<Typography component="b">Email Body </Typography>
							</FormHelperText>
							<CKEditor
								editor={ClassicEditor}
								config={CK_CONFIGS(localStorage.getItem('token'))}
								data={formState.values.body || ''}
								onChange={(event, editor) => {
									const data = editor.getData();
									setBody(data);
								}}
							/>
							<FormControl error={hasError('body')}>
								<FormHelperText id="component-error-text">
									{hasError('body')
										? formState.errors.body[0]
										: null}
								</FormHelperText>
							</FormControl>
						</div>
						<StyledButton
							color="bprimary"
							disabled={!formState.isValid}
							size="small"
							type="submit"
							variant="contained"
							startIcon={<SaveIcon />}>
							Create Email Template
						</StyledButton>{' '}
						&nbsp; &nbsp;
						<StyledButton
							variant="contained"
							color="blight"
							size="small"
							onClick={() => {
								dispatch(redirectToEmailTemplatesList());
							}}
							startIcon={<CancelIcon />}>
							CLOSE
						</StyledButton>
					</form>
				</CardContent>
			</Card>
		</Page>
	);
};

export default EmailTemplatesAdd;
