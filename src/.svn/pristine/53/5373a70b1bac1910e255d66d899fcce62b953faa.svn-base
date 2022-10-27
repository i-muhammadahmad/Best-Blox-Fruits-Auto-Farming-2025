import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import { Header } from './components';
import {
	updateAuditFormCategory,
	hideAuditFormCategoryValidationError,
	auditFormCategoryParentListFetch,
	redirectToAuditFormCategoryList,
	auditFormSetupDropdownListFetch
} from 'actions';
import {
	Card,
	CardHeader,
	CardContent,
	TextField,
	Grid,
	FormControl,
	FormHelperText
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, find, map, forEach } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';

const schema = {
	opt_display: {
		presence: { allowEmpty: false, message: '^Audit Form Category is required' }
	},
	audit_form_setup_ids: {
		presence: { allowEmpty: false, message: '^Please Select Audit Form.' }
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
	}
}));

const AuditFormCategoryUpdate = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const auditFormCategoryState = useSelector(
		state => state.auditFormCategoryState
	);
	const auditFormSetupState = useSelector(state => state.auditFormSetupState);
	const session = useSelector(state => state.session);

	const [auditFormSetupValue, setAuditFormSetupValue] = useState([]);
	const [ParentValue, setParentValue] = useState(null);

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
		dispatch(
			auditFormCategoryParentListFetch(
				session.current_page_permissions.object_id
			)
		);
		dispatch(
			auditFormSetupDropdownListFetch(
				session.current_page_permissions.object_id
			)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let record = auditFormCategoryState.auditFormCategoryRecord;
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				description: record.description,
				parent_id: record.parent_id,
				opt_display: record.opt_display,
				id: record.id
			},
			touched: {
				...formState.touched,
				description: true,
				parent_id: true,
				opt_display: true,
				id: true
			}
		}));

		const item = find(auditFormCategoryState.auditFormCategoryParentsList, [
			'id',
			record.parent_id
		]);
		setParentValue(item);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auditFormCategoryState.auditFormCategoryParentsList]);

	useEffect(() => {
		let record = auditFormCategoryState.auditFormCategoryRecord;
		if (!isEmpty(record.category_setups)) {
			let cSetupIds = [];
			let cSetupValue = [];
			if(!isEmpty(auditFormSetupState.auditFormSetupDropdownList)){
				forEach(record.category_setups, function(value, key) {
					cSetupIds.push(value.setup_id);
					let item = find(auditFormSetupState.auditFormSetupDropdownList, [
						'id',
						value.setup_id
					]);
					cSetupValue.push(item);
				});
			}
			setAuditFormSetupValue(cSetupValue);
			setAuditFormSetupIds(cSetupIds);
		}
	}, [auditFormSetupState.auditFormSetupDropdownList]);

	useEffect(() => {
		if (
			!auditFormCategoryState.showViewPage &&
			!auditFormCategoryState.showUpdateForm
		) {
			router.history.push('/audit-form-category');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		auditFormCategoryState.showViewPage,
		auditFormCategoryState.showUpdateForm
	]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}));
	}, [formState.values]);

	useEffect(() => {
		if (!isEmpty(auditFormCategoryState.validation_error)) {
			const errors = auditFormCategoryState.validation_error;
			setFormState(formState => ({
				...formState,
				isValid: errors ? false : true,
				errors: errors || {}
			}));
		}
	}, [auditFormCategoryState.validation_error]);

	useEffect(() => {
		if (auditFormCategoryState.redirect_to_list) {
			router.history.push('/audit-form-category');
		}
	}, [auditFormCategoryState.redirect_to_list, router.history]);

	const auditFormSetupOnChange = (event, newValue) => {
		if (newValue) {
			setAuditFormSetupValue(newValue);
			let audit_form_setup_ids = map(newValue, 'id');
			setAuditFormSetupIds(audit_form_setup_ids);
		} else {
			setAuditFormSetupValue(newValue);
			let audit_form_setup_ids = map(newValue, 'id');
			setAuditFormSetupIds(audit_form_setup_ids);
		}
	};

	const setAuditFormSetupIds = audit_form_setup_ids => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				audit_form_setup_ids: audit_form_setup_ids
			},
			touched: {
				...formState.touched,
				audit_form_setup_ids: true
			}
		}));
		dispatch(hideAuditFormCategoryValidationError('audit_form_setup_ids'));
	};

	const setParentId = parent_id => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				parent_id: parent_id
			},
			touched: {
				...formState.touched,
				parent_id: true
			}
		}));
		dispatch(hideAuditFormCategoryValidationError('parent_id'));
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
		dispatch(hideAuditFormCategoryValidationError('description'));
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
		dispatch(hideAuditFormCategoryValidationError(event.target.name));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		dispatch(updateAuditFormCategory(formState.values));
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;

	return (
		<Page className={classes.root} title="Update Audit Form Category">
			<Header />
			<Card className={classes.projectDetails}>
				<CardHeader title="Update Audit Form Category" />
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className={classes.formGroup}>
							<Grid container spacing={3}>
								<Grid item xs={6} sm={4}>
									<TextField
										error={hasError('opt_display')}
										fullWidth
										helperText={
											hasError('opt_display')
												? formState.errors.opt_display[0]
												: null
										}
										label="Category Name"
										name="opt_display"
										onChange={handleChange}
										value={formState.values.opt_display || ''}
										variant="outlined"
										size="small"
									/>
								</Grid>
								<Grid item xs={6} sm={4}>
									{auditFormCategoryState.auditFormCategoryParentsList ? (
										<Autocomplete
											id="parent_id"
											value={ParentValue}
											onChange={(event, newValue) => {
												if (newValue) {
													setParentValue(newValue);
													setParentId(newValue.id);
												} else {
													setParentValue(newValue);
													setParentId('');
												}
											}}
											options={
												auditFormCategoryState.auditFormCategoryParentsList
											}
											getOptionLabel={option => option.opt_display}
											size="small"
											renderInput={params => (
												<TextField
													{...params}
													size="small"
													label="Select Parent Category"
													variant="outlined"
													error={hasError('parent_id')}
													helperText={
														hasError('parent_id')
															? formState.errors.parent_id[0]
															: null
													}
												/>
											)}
										/>
									) : (
										''
									)}
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={6} sm={4}>
									<Autocomplete
										id="audit_form_setup_ids"
										value={auditFormSetupValue || []}
										onChange={auditFormSetupOnChange}
										limitTags={2}
										multiple={true}
										options={auditFormSetupState.auditFormSetupDropdownList}
										getOptionLabel={option => option.name}
										size="small"
										renderInput={params => (
											<TextField
												{...params}
												size="small"
												label="Select Audit Form"
												variant="outlined"
												error={hasError('audit_form_setup_ids')}
												helperText={
													hasError('audit_form_setup_ids')
														? formState.errors.audit_form_setup_ids[0]
														: null
												}
											/>
										)}
									/>
								</Grid>
							</Grid>
						</div>
						<div className={classes.formGroup}>
							<CKEditor
								editor={ClassicEditor}
								config={CK_CONFIGS(localStorage.getItem('token'))}
								data={
									auditFormCategoryState.auditFormCategoryRecord.description ||
									''
								}
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
							Update Audit Form Category
						</StyledButton>{' '}
						&nbsp; &nbsp;
						<StyledButton
							variant="contained"
							color="blight"
							size="small"
							onClick={() => {
								dispatch(redirectToAuditFormCategoryList());
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

export default AuditFormCategoryUpdate;
