import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import { Header, Checkpoints } from './components';
import {
	updateAuditForm,
	auditFormSetupDropdownListFetch,
	hideAuditFormValidationError,
	auditSetupCheckpointsListFetch,
	redirectToAuditFormList,
	auditFormInfractionDropdownListFetch
} from 'actions';
import {
	Card,
	CardHeader,
	CardContent,
	TextField,
	Grid,
	FormControl,
	FormHelperText,
	Typography,
	Button
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, forEach, find } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';
import { EmployeeDropdown, AuditFormCategoryDropdown } from 'commonDropdowns';
import moment from 'moment';

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

const AuditFormUpdate = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const auditFormSetupState = useSelector(state => state.auditFormSetupState);
	const auditFormState = useSelector(state => state.auditFormState);
	const session = useSelector(state => state.session);

	const [AuditFormCategoryValue, setAuditFormCategoryValue] = useState(null);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);
	const [auditFormSetupValue, setAuditFormSetupValue] = useState(null);
	const [employeeValue, setEmployeeValue] = useState(null);
	const [checkpoints, setCheckpoints] = useState([]);
	const [clientIds, setClientIds] = useState([]);
	const [detections, setDetections] = useState([]);
	const [deletedDetails, setDeletedDetails] = useState([]);
	const [deletedFiles, setDeletedFiles] = useState([]);
	const [auditSetupId, setAuditSetupId] = useState('');
	const [files, setFiles] = useState([]);

	const [schema, setSchema] = useState({
		reference: {
			presence: { allowEmpty: false, message: '^Transaction Refrence is required' }
		},
		employee_id: {
			presence: { allowEmpty: false, message: '^Please select employee' }
		},
		audit_form_setup_id: {
			presence: {
				allowEmpty: false,
				message: '^Please select audit form.'
			}
		},
		date_processed: {
			presence: { allowEmpty: false, message: ' is required' }
		},
		/* category_id: {
			presence: {
				allowEmpty: false,
				message: '^Audit Form Category is required'
			}
		} */
	});

	const [formState, setFormState] = useState({
		isValid: false,
		values: {
			object_viewed_id: session.current_page_permissions.object_id,
			date_processed: moment(moment().toDate()).format('YYYY-MM-DD'),
			obtained_score: 100,
			audit_result: 'pass',
			passing_score: 100
		},
		touched: {
			object_viewed_id: true,
			date_processed: true,
			obtained_score: true,
			audit_result: true,
			passing_score: true
		},
		errors: {}
	});

	useEffect(() => {
		let record = auditFormState.auditFormRecord;
		let checkpoints = auditFormState.auditFormRecord.cheackpoints;
		let schema_arr = { ...schema };
		let formstate_arr = {
			...formState,
			values: {
				...formState.values,
				id: record.id,
				reference: record.reference,
				date_processed: record.date_processed,
				obtained_score: record.obtained_score,
				audit_result: record.audit_result,
				passing_score: record.passing_score,
				description: record.description,
				employee_id: record.employee_id,
        category_id: record.category_id
			},
			touched: {
				...formState.touched,
				id: true,
				reference: true,
				date_processed: true,
				obtained_score: true,
				audit_result: true,
				passing_score: true,
				description: true,
				employee_id: true,
        category_id: true
			}
		};

		if (!isEmpty(checkpoints)) {
			forEach(checkpoints, function(value, key) {
				let cid = value.cid;
				//setting schema
				if (value.is_required == 1) {
					schema_arr = {
						...schema_arr,
						['setup_checkpoint_' + cid]: {
							presence: {
								allowEmpty: false,
								message: '^This feild is required'
							}
						}
					};
				}
				if (value.is_checked == 1) {
					formstate_arr = {
						...formstate_arr,
						values: {
							...formstate_arr.values,
							['setup_checkpoint_' + cid]: value.is_checked
						},
						touched: {
							...formstate_arr.touched,
							['setup_checkpoint_' + cid]: true
						}
					};
				}
			});
		}
		setCheckpoints(checkpoints);
		setFormState(formState => ({
			...formState,
			values: formstate_arr.values,
			touched: formstate_arr.touched
		}));
		setSchema(schema_arr);
		setDetections(auditFormState.auditFormRecord.detections);
    setSelectedCategoryId(isEmpty(record.category_id) ? 'null' : record.category_id);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auditFormState.auditFormRecord]);
	
	useEffect(() => {}, [auditFormState.auditFormRecord]);

	useEffect(() => {
		let record = auditFormState.auditFormRecord;
		const item = find(auditFormSetupState.auditFormSetupDropdownList, [
			'id',
			record.audit_form_setup_id
		]);
		if (item) {
			setAuditFormSetupValue(item);
			setAuditFormSetup(item.id, item.client_id, item.passing_score);
			setClientIds([item.client_id]);
			dispatch(
				auditSetupCheckpointsListFetch(
					session.current_page_permissions.object_id,
					item.id
				)
			);
			dispatch(
				auditFormInfractionDropdownListFetch(
					session.current_page_permissions.object_id,
					item.client_id
				)
			);
		} else {
			setAuditFormSetupValue(item);
			setAuditFormSetup('', '', 100);
			setClientIds([]);
			dispatch(
				auditSetupCheckpointsListFetch(
					session.current_page_permissions.object_id,
					''
				)
			);
			dispatch(
				auditFormInfractionDropdownListFetch(
					session.current_page_permissions.object_id,
					''
				)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auditFormSetupState.auditFormSetupDropdownList]);

	useEffect(() => {
		let dect_sum = 0;
		forEach(detections, function(value, key) {
			dect_sum = dect_sum + parseFloat(value);
		});

		let obt_score = Math.max(0, 100 - dect_sum);
		let adt_status =
			obt_score >= formState.values.passing_score ? 'pass' : 'fail';

		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				obtained_score: obt_score,
				audit_result: adt_status
			},
			touched: {
				...formState.touched,
				obtained_score: true,
				audit_result: true
			}
		}));
	}, [detections]);

	useEffect(() => {
		dispatch(
			auditFormSetupDropdownListFetch(
				session.current_page_permissions.object_id
			)
		);
	}, []);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}));
	}, [formState.values]);

	useEffect(() => {
		if (!isEmpty(auditFormState.validation_error)) {
			const errors = auditFormState.validation_error;
			setFormState(formState => ({
				...formState,
				isValid: errors ? false : true,
				errors: errors || {}
			}));
		}
	}, [auditFormState.validation_error]);

	useEffect(() => {
		if (!auditFormState.showViewPage && !auditFormState.showUpdateForm) {
			router.history.push('/audit-form');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auditFormState.showViewPage, auditFormState.showUpdateForm]);

	useEffect(() => {
		if (auditFormState.redirect_to_list) {
			router.history.push('/audit-form');
		}
	}, [auditFormState.redirect_to_list, router.history]);

  const auditFormCategoryOnChange = (event, newValue) => {
		if (newValue) {
			setAuditFormCategoryValue(newValue);
			setCategoryId(newValue.id);
			setSelectedCategoryId(newValue.id);
		} else {
			setAuditFormCategoryValue(newValue);
			setCategoryId('');
			setSelectedCategoryId('');
		}

    if(!isEmpty(auditFormSetupValue))
    {
      setAuditFormSetupValue(null);
      setAuditFormSetup('', '', 100)
      setClientIds([]);
			dispatch(
				auditSetupCheckpointsListFetch(
					session.current_page_permissions.object_id,
					''
				)
			);
			dispatch(
				auditFormInfractionDropdownListFetch(
					session.current_page_permissions.object_id,
					''
				)
			);
    }
	};

	const setCategoryId = category_id => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				category_id: category_id
			},
			touched: {
				...formState.touched,
				category_id: true
			}
		}));
		dispatch(hideAuditFormValidationError('category_id'));
	};

	const employeeOnChange = (event, newValue) => {
		if (newValue) {
			setEmployeeValue(newValue);
			setEmployeeId(newValue.id);
		} else {
			setEmployeeValue(newValue);
			setEmployeeId('');
		}
	};

	const setEmployeeId = employee_id => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				employee_id: employee_id
			},
			touched: {
				...formState.touched,
				employee_id: true
			}
		}));
		dispatch(hideAuditFormValidationError('employee_id'));
	};

	const auditFormSetupOnChange = (event, newValue) => {
		/*if (newValue) {
      setAuditFormSetupValue(newValue);
      setAuditFormSetup(newValue.id, newValue.client_id, newValue.passing_score);
      dispatch(auditSetupCheckpointsListFetch(session.current_page_permissions.object_id, newValue.id));
      dispatch(auditFormInfractionDropdownListFetch(session.current_page_permissions.object_id, newValue.client_id));
    }
    else {
      setAuditFormSetupValue(newValue);
      setAuditFormSetup('', '', 100);
      dispatch(auditSetupCheckpointsListFetch(session.current_page_permissions.object_id, ''));
      dispatch(auditFormInfractionDropdownListFetch(session.current_page_permissions.object_id, ''));
    }*/
	};

	const setAuditFormSetup = (
		audit_form_setup_id,
		client_id,
		passing_score = 100
	) => {
		setAuditSetupId(audit_form_setup_id);

		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				audit_form_setup_id: audit_form_setup_id,
				client_id: client_id
				/*'passing_score': passing_score*/
			},
			touched: {
				...formState.touched,
				audit_form_setup_id: true,
				client_id: true
				/*'passing_score': true*/
			}
		}));
		dispatch(hideAuditFormValidationError('audit_form_setup_id'));
	};

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
		dispatch(hideAuditFormValidationError('description'));
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
		dispatch(hideAuditFormValidationError(event.target.name));
	};

	const handleSubmit = async event => {
		event.preventDefault();

		let data = new FormData();
		//appending form state to data object
		forEach(formState.values, function(value, key) {
			data.append(key, value);
		});

		//appending checkpoints to formdata object
		data.append('checkpoints', JSON.stringify(checkpoints));

		//appending removed data
		data.append('delete_details', JSON.stringify(deletedDetails));
		data.append('delete_files', JSON.stringify(deletedFiles));

		//apending supporting doc
		//appending approvalProfile values
		forEach(files, function(detail_files, detail_id) {
			forEach(detail_files, function(spdoc, spd_id) {
				data.append(spd_id, spdoc);
			});
		});

		dispatch(updateAuditForm(data));
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;

	return (
		<Page className={classes.root} title="Add Audit Form">
			<Header />
			<Card className={classes.projectDetails}>
				<CardHeader title="Add Audit Form" />
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className={classes.formGroup}>
							<Grid container spacing={3}>
								<Grid item xs={6} sm={4}>
									{auditFormSetupState.auditFormSetupDropdownList ? (
										<Autocomplete
											id="audit_form_setup_id"
											value={auditFormSetupValue}
											onChange={auditFormSetupOnChange}
											options={auditFormSetupState.auditFormSetupDropdownList}
											getOptionLabel={option => option.name}
											size="small"
											disabled={true}
											renderInput={params => (
												<TextField
													{...params}
													size="small"
													label="Select Audit Form"
													variant="outlined"
													error={hasError('audit_form_setup_id')}
													helperText={
														hasError('audit_form_setup_id')
															? formState.errors.audit_form_setup_id[0]
															: null
													}
												/>
											)}
										/>
									) : (
										''
									)}
								</Grid>
                <Grid item xs={6} sm={4}>
										<AuditFormCategoryDropdown
											AuditFormCategoryValue={AuditFormCategoryValue}
											setAuditFormCategoryValue={setAuditFormCategoryValue}
											id="category_id"
											name="category_id"
											auditFormCategoryOnChange={auditFormCategoryOnChange}
											showNone={false}
                      disabled={true}
                      selectedId={selectedCategoryId}
											renderInput={params => (
												<TextField
													{...params}
													label="Select Transaction Category"
													variant="outlined"
													error={hasError('category_id')}
													helperText={
														hasError('category_id')
															? formState.errors.category_id[0]
															: null
													}
												/>
											)}
										/>
								</Grid>
                <Grid item xs={6} sm={4}>
									<TextField
										error={hasError('reference')}
										fullWidth
										helperText={
											hasError('reference')
												? formState.errors.reference[0]
												: null
										}
										label="Transaction Reference"
										name="reference"
										onChange={handleChange}
										value={formState.values.reference || ''}
										variant="outlined"
										size="small"
									/>
								</Grid>
								<Grid item xs={6} sm={4}>
									{!isEmpty(clientIds) ? (
										<EmployeeDropdown
											EmployeeValue={employeeValue}
											setEmployeeValue={setEmployeeValue}
											disabled={isEmpty(clientIds)}
											clientIds={clientIds}
											id="employee_id"
											name="employee_id"
											selectedId={auditFormState.auditFormRecord.employee_id}
											employeeOnChange={employeeOnChange}
											renderInput={params => (
												<TextField
													{...params}
													size="small"
													label="Select Employee"
													variant="outlined"
													error={hasError('employee_id')}
													helperText={
														hasError('employee_id')
															? formState.errors.employee_id[0]
															: null
													}
												/>
											)}
										/>
									) : (
										<Autocomplete
											id="audit_form_setup_id"
											value={employeeValue}
											onChange={employeeOnChange}
											disabled={true}
											options={[]}
											getOptionLabel={option => option.name}
											size="small"
											renderInput={params => (
												<TextField
													{...params}
													size="small"
													label="Select Employee"
													variant="outlined"
													error={hasError('employee_id')}
													helperText={
														hasError('employee_id')
															? formState.errors.employee_id[0]
															: null
													}
												/>
											)}
										/>
									)}
								</Grid>
								<Grid item xs={6} sm={4}>
									<TextField
										error={hasError('date_processed')}
										type="date"
										fullWidth
										helperText={
											hasError('date_processed')
												? formState.errors.date_processed[0]
												: null
										}
										label="Date Processed"
										name="date_processed"
										onChange={handleChange}
										value={formState.values.date_processed || ''}
										variant="outlined"
										size="small"
									/>
								</Grid>
								<Grid item xs={6} sm={4} style={{ textAlign: 'right' }}>
									<Typography variant="body1" component="span">
										<b>Score:</b> &nbsp;
									</Typography>
									<Button
										variant="contained"
										color="primary"
										disabled
										style={{ backgroundColor: '#1a237e', color: '#FFFFFF' }}>
										{parseInt(formState.values.obtained_score)}
									</Button>{' '}
									&nbsp; &nbsp; &nbsp;
									<Typography variant="body1" component="span">
										<b>Audit Result:</b> &nbsp;
									</Typography>
									<Button
										variant="contained"
										color="primary"
										disabled
										style={{
											backgroundColor:
												formState.values.audit_result === 'pass'
													? '#28a745'
													: '#dc3545',
											color: '#FFFFFF'
										}}>
										{formState.values.audit_result}
									</Button>
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={12}>
									<Checkpoints
										checkpoints={checkpoints}
										setCheckpoints={setCheckpoints}
										hasError={hasError}
										formState={formState}
										setFormState={setFormState}
										schema={schema}
										setSchema={setSchema}
										files={files}
										setFiles={setFiles}
										setDetections={setDetections}
										detections={detections}
										setDeletedDetails={setDeletedDetails}
										setDeletedFiles={setDeletedFiles}
									/>
								</Grid>
							</Grid>
						</div>
						<div className={classes.formGroup}>
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
						</div>
						<StyledButton
							color="bprimary"
							disabled={!formState.isValid}
							size="small"
							type="submit"
							variant="contained"
							startIcon={<SaveIcon />}>
							Update Audit Form
						</StyledButton>{' '}
						&nbsp; &nbsp;
						<StyledButton
							variant="contained"
							color="blight"
							size="small"
							onClick={() => {
								dispatch(redirectToAuditFormList());
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

export default AuditFormUpdate;
