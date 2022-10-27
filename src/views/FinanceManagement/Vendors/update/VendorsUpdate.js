import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import { Header } from './components';
import {
	updateVendors,
	hideVendorsValidationError,
	redirectToVendorsList
} from 'actions';
import {
	Card,
	CardHeader,
	CardContent,
	TextField,
	Grid,
	FormControl,
	FormHelperText,
  Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CK_CONFIGS } from 'configs';

const schema = {
	name: {
		presence: { allowEmpty: false, message: '^Vendor Name is required' }
	},
	phone_no: {
		presence: { allowEmpty: false, message: '^Phone No is required' }
	},
	email: {
		email: true
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

const VendorsUpdate = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const vendorsState = useSelector(state => state.vendorsState);
	const session = useSelector(state => state.session);

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
		let record = vendorsState.vendorsRecord;
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				id: record.id,
				name: record.name,
				phone_no: record.phone_no,
				email: record.email,
				address: record.address,
				description: record.description
			},
			touched: {
				...formState.touched,
				id: true,
				name: true,
				phone_no: true,
				email: true,
				address: true,
				description: true
			}
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vendorsState.vendorsRecord]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}));
	}, [formState.values]);

	useEffect(() => {
		if (!isEmpty(vendorsState.validation_error)) {
			const errors = vendorsState.validation_error;
			setFormState(formState => ({
				...formState,
				isValid: errors ? false : true,
				errors: errors || {}
			}));
		}
	}, [vendorsState.validation_error]);

	useEffect(() => {
		if (!vendorsState.showViewPage && !vendorsState.showUpdateForm) {
			router.history.push('/vendors');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vendorsState.showViewPage, vendorsState.showUpdateForm]);

	useEffect(() => {
		if (vendorsState.redirect_to_list) {
			router.history.push('/vendors');
		}
	}, [vendorsState.redirect_to_list, router.history]);

	const setAddress = address => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				address: address
			},
			touched: {
				...formState.touched,
				address: true
			}
		}));
		dispatch(hideVendorsValidationError('address'));
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
		dispatch(hideVendorsValidationError('description'));
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
		dispatch(hideVendorsValidationError(event.target.name));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		dispatch(updateVendors(formState.values));
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;

	return (
		<Page className={classes.root} title="Update Vendors">
			<Header />
			<Card className={classes.projectDetails}>
				<CardHeader title="Update Vendors" />
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className={classes.formGroup}>
							<Grid container spacing={3}>
								<Grid item xs={6} sm={4}>
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
								<Grid item xs={6} sm={4}>
									<TextField
										error={hasError('phone_no')}
										fullWidth
										helperText={
											hasError('phone_no') ? formState.errors.phone_no[0] : null
										}
										label="Phone No"
										name="phone_no"
										onChange={handleChange}
										value={formState.values.phone_no || ''}
										variant="outlined"
										size="small"
									/>
								</Grid>
								<Grid item xs={6} sm={4}>
									<TextField
										error={hasError('email')}
										fullWidth
										helperText={
											hasError('email') ? formState.errors.email[0] : null
										}
										label="Email"
										name="email"
										onChange={handleChange}
										value={formState.values.email || ''}
										variant="outlined"
										size="small"
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<FormHelperText id="Address">
										<Typography component="b">Address</Typography>
									</FormHelperText>
									<CKEditor
										editor={ClassicEditor}
										config={CK_CONFIGS(localStorage.getItem('token'))}
										data={formState.values.address || ''}
										onChange={(event, editor) => {
											const data = editor.getData();
											setAddress(data);
										}}
									/>
									<FormControl error={hasError('address')}>
										<FormHelperText id="component-error-text">
											{hasError('address') ? formState.errors.address[0] : null}
										</FormHelperText>
									</FormControl>
								</Grid>
							</Grid>
						</div>
						<div className={classes.formGroup}>
							<FormHelperText id="description">
								<Typography component="b">Description</Typography>
							</FormHelperText>
							<CKEditor
								editor={ClassicEditor}
								config={CK_CONFIGS(localStorage.getItem('token'))}
								data={vendorsState.vendorsRecord.description || ''}
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
							Update Vendor
						</StyledButton>{' '}
						&nbsp; &nbsp;
						<StyledButton
							variant="contained"
							color="blight"
							size="small"
							onClick={() => {
								dispatch(redirectToVendorsList());
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

export default VendorsUpdate;
