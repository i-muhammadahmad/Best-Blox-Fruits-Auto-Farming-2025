import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import { Header } from './components';
import {
	addActivityCategory,
	hideActivityCategoryValidationError,
	activityCategoryParentListFetch,
	redirectToActivityCategoryList
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
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';
import { ClientDropdown } from 'commonDropdowns';

const schema = {
	opt_display: {
		presence: { allowEmpty: false, message: '^Activity Category is required' }
	},
  client_id: {
		presence: { allowEmpty: false, message: 'is required' }
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

const ActivityCategoryAdd = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const activityCategoryState = useSelector(
		state => state.activityCategoryState
	);
	const session = useSelector(state => state.session);

  const [ClientValue, setClientValue] = useState(null);
	const [ParentValue, setParentValue] = useState(null);
	const [showParent, setShowParent] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

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
			activityCategoryParentListFetch(
				session.current_page_permissions.object_id
			)
		);
	}, [dispatch]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}));
	}, [formState.values]);

	useEffect(() => {
		if (!isEmpty(activityCategoryState.validation_error)) {
			const errors = activityCategoryState.validation_error;
			setFormState(formState => ({
				...formState,
				isValid: errors ? false : true,
				errors: errors || {}
			}));
		}
	}, [activityCategoryState.validation_error]);

	useEffect(() => {
		if (activityCategoryState.redirect_to_list) {
			router.history.push('/activity-category');
		}
	}, [activityCategoryState.redirect_to_list, router.history]);

  const clientOnChange = (event, newValue) => {
		if (newValue) {
			setClientValue(newValue);
			setClientId(newValue.id);
		} else {
			setClientValue(newValue);
			setClientId('');
		}
	};

  const changeClientOnParentChange = (newValue) => {
    if (newValue.client_id !== null) {
			setClientId(newValue.client_id);
      setSelectedClientId(newValue.client_id);
		}
    else{
      setClientId(null);
      setSelectedClientId(null);
    }
  }

	const setClientId = client_id => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				client_id: client_id
			},
			touched: {
				...formState.touched,
				client_id: true
			}
		}));
		dispatch(hideActivityCategoryValidationError('client_id'));
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
		dispatch(hideActivityCategoryValidationError('parent_id'));
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
		dispatch(hideActivityCategoryValidationError('description'));
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
		dispatch(hideActivityCategoryValidationError(event.target.name));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		dispatch(addActivityCategory(formState.values));
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;

	const addParent = () => {
		setShowParent(true);
	};

	return (
		<Page className={classes.root} title="Add Activity Category">
			<Header />
			<Card className={classes.projectDetails}>
				<CardHeader title="Add Activity Category" />
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
									<ClientDropdown
										ClientValue={ClientValue}
										setClientValue={setClientValue}
										id="client_id"
										name="client_id"
										clientOnChange={clientOnChange}
                    selectedChangingId={selectedClientId}
										renderInput={params => (
											<TextField
												{...params}
												label="Select Client"
												variant="outlined"
												error={hasError('client_id')}
												helperText={
													hasError('client_id')
														? formState.errors.client_id[0]
														: null
												}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={6} sm={4}>
									{activityCategoryState.activityCategoryParentsList &&
									showParent ? (
										<Autocomplete
											id="parent_id"
											value={ParentValue}
											onChange={(event, newValue) => {
												if (newValue) {
													setParentValue(newValue);
													setParentId(newValue.id);
                          changeClientOnParentChange(newValue);
												} else {
													setParentValue(newValue);
													setParentId('');
												}
											}}
											options={
												activityCategoryState.activityCategoryParentsList
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
									{showParent === false ? (
										<StyledButton
											color="bprimary"
											variant="contained"
											onClick={addParent}>
											Add Parent Activity
										</StyledButton>
									) : (
										''
									)}
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
							Create Activity Category
						</StyledButton>{' '}
						&nbsp; &nbsp;
						<StyledButton
							variant="contained"
							color="blight"
							size="small"
							onClick={() => {
								dispatch(redirectToActivityCategoryList());
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

export default ActivityCategoryAdd;
