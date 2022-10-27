import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
	TextField,
	Grid,
	FormControl,
	FormHelperText,
	Typography
} from '@material-ui/core';
import {
	hideQuizSetupValidationError,
	setQuizAddUpdateStatusFalse,
	courseCategoryDropdownListFetch
} from 'actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { find, isEmpty } from 'lodash';
import { CK_CONFIGS } from 'configs';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
	root: {},
	projectDetails: {
		marginTop: theme.spacing(3)
	},
	formGroup: {
		marginBottom: theme.spacing(3)
	}
}));

const QuizSetupForm = props => {
	const { formState, setFormState, ...rest } = props;

	const classes = useStyles();
	const dispatch = useDispatch();
	const quizSetupState = useSelector(state => state.quizSetupState);
	const courseCategoryState = useSelector(state => state.courseCategoryState);
	const session = useSelector(state => state.session);
	const [QuizLevelValue, setQuizLevelValue] = useState(null);
	const [CategoryValue, setCategoryValue] = useState(null);

	useEffect(() => {
		dispatch(setQuizAddUpdateStatusFalse());
		dispatch(courseCategoryDropdownListFetch(session.current_page_permissions.object_id));
	}, []);

	useEffect(() => {
		if (!isEmpty(formState.values.level_id)) {
			const item = find(quizSetupState.quizLevelList, [
				'id',
				formState.values.level_id
			]);
			setQuizLevelValue(item);
		}
    if (!isEmpty(formState.values.category_id)) {
			const item = find(courseCategoryState.courseCategoriesDropdownList, [
				'id',
				formState.values.category_id
			]);
			setCategoryValue(item);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let record = quizSetupState.quizSetupRecord;
		const item = find(quizSetupState.quizLevelList, ['id', record.level_id]);
    const catItem = find(courseCategoryState.courseCategoriesDropdownList, ['id', record.category_id]);
		setQuizLevelValue(item);
    setCategoryValue(catItem);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quizSetupState.quizLevelList]);

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
		dispatch(hideQuizSetupValidationError('description'));
	};

	const setQuizLevelId = level_id => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				level_id: level_id
			},
			touched: {
				...formState.touched,
				level_id: true
			}
		}));
		dispatch(hideQuizSetupValidationError('level_id'));
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
		dispatch(hideQuizSetupValidationError('category_id'));
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
		dispatch(hideQuizSetupValidationError(event.target.name));
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;

	return (
		<form>
			<div className={classes.formGroup}>
				<Grid container spacing={3}>
					<Grid item xs={6} sm={4}>
						<TextField
							error={hasError('name')}
							fullWidth
							helperText={hasError('name') ? formState.errors.name[0] : null}
							label="Name"
							name="name"
							onChange={handleChange}
							value={formState.values.name || ''}
							variant="outlined"
							size="small"
						/>
					</Grid>
					<Grid item xs={6} sm={4}>
						{courseCategoryState.courseCategoriesDropdownList ? (
							<>
								<Autocomplete
									id="category_id"
									value={CategoryValue}
									onChange={(event, newValue) => {
										if (newValue) {
											setCategoryValue(newValue);
											setCategoryId(newValue.id);
										} else {
											setCategoryValue(newValue);
											setCategoryId('');
										}
									}}
									options={courseCategoryState.courseCategoriesDropdownList}
									getOptionLabel={option => option.opt_display}
									renderOption={option => (
										<React.Fragment>
											<div
												style={{
													paddingLeft: !isEmpty(option.parent_id) ? '25px' : ''
												}}>
												{option.opt_display}
											</div>
										</React.Fragment>
									)}
									renderInput={params => (
										<TextField
											{...params}
											size="small"
											label="Select Course Category"
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
								{!isEmpty(CategoryValue) && CategoryValue.parent_id != null ? (
									<FormControl>
										<FormHelperText id="component-error-text">
											{CategoryValue.label}
										</FormHelperText>
									</FormControl>
								) : (
									''
								)}
							</>
						) : (
							''
						)}
					</Grid>
					<Grid item xs={6} sm={4}>
						<Autocomplete
							id="level_id"
							name="level_id"
							value={QuizLevelValue}
							onChange={(event, newValue) => {
								if (newValue) {
									setQuizLevelValue(newValue);
									setQuizLevelId(newValue.id);
								} else {
									setQuizLevelValue(newValue);
									setQuizLevelId('');
								}
							}}
							options={quizSetupState.quizLevelList}
							getOptionLabel={option => option.opt_display}
							size="small"
							renderInput={params => (
								<TextField
									{...params}
									size="small"
									label="Select Level"
									variant="outlined"
									error={hasError('level_id')}
									helperText={
										hasError('level_id') ? formState.errors.level_id[0] : null
									}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6} sm={4}>
						<TextField
							error={hasError('passing_percentage')}
							fullWidth
							helperText={
								hasError('passing_percentage')
									? formState.errors.passing_percentage[0]
									: null
							}
							label="Passing Percentage (%)"
							name="passing_percentage"
							onChange={handleChange}
							value={formState.values.passing_percentage || ''}
							variant="outlined"
							size="small"
							type="number"
							InputProps={{ inputProps: { min: 0, max: 100 } }}
						/>
					</Grid>
				</Grid>
			</div>
			<div className={classes.formGroup}>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<TextField
							error={hasError('certificate_emails')}
							fullWidth
							helperText={
								hasError('certificate_emails')
									? formState.errors.certificate_emails[0]
									: null
							}
							label="Certificate Emails"
							name="certificate_emails"
							onChange={handleChange}
							value={formState.values.certificate_emails || ''}
							variant="outlined"
							size="small"
							multiline
							rowsMax={4}
							InputLabelProps={{
								shrink: true
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<MuiAlert
							style={{ display: 'none' }}
							elevation={6}
							variant="filled"
							severity="warning"></MuiAlert>
						<div
							class="MuiPaper-root MuiAlert-root MuiAlert-filledWarning MuiPaper-elevation6"
							role="alert">
							<div class="MuiAlert-icon" style={{ padding: '0px' }}>
								<svg
									class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
									focusable="false"
									viewBox="0 0 24 24"
									aria-hidden="true">
									<path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path>
								</svg>
							</div>
							<div class="MuiAlert-message" style={{ padding: '2px 0px' }}>
								Add multiple emails separated by ";"
							</div>
						</div>
					</Grid>
				</Grid>
			</div>
			<div className={classes.formGroup}>
				<CKEditor
					editor={ClassicEditor}
					data={formState.values.description || ''}
					config={CK_CONFIGS(localStorage.getItem('token'))}
					onChange={(event, editor) => {
						const data = editor.getData();
						setDescription(data);
					}}
				/>
				<FormControl error={hasError('description')}>
					<FormHelperText component="div" id="component-error-text">
						{hasError('description') ? formState.errors.description[0] : null}
					</FormHelperText>
				</FormControl>
			</div>
		</form>
	);
};

export default QuizSetupForm;
