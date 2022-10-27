import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { StyledButton } from 'components';
import {
	saveSettings,
	getITNotificationSettings,
	officesListFetch,
	designationsDropdownListFetch,
	hideSettingsValidationError
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
import { isEmpty, forEach, find } from 'lodash';
import useRouter from 'utils/useRouter';
import SaveIcon from '@material-ui/icons/Save';
import { CK_CONFIGS } from 'configs';
import AccessRights from 'utils/AccessRights';

const useStyles = makeStyles(theme => ({
	root: {
		width: theme.breakpoints.values.lg,
		maxWidth: '100%',
		margin: '0 auto',
		padding: theme.spacing(3, 3, 6, 3)
	},
	projectDetails: {},
	formGroup: {
		marginBottom: theme.spacing(3)
	}
}));

const schema = {
	
};

const ITNotifications = props => {
	const { activeTab, ...other } = props;

	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const settingsState = useSelector(state => state.settingsState);
	const officesState = useSelector(state => state.officesState);
	const designationState = useSelector(state => state.designationState);
	const session = useSelector(state => state.session);

	const [designationValue, setDesignationValue] = useState([])

	/* useEffect(() => {
		const dataArray = [];
		officesState.officesList.map((data, i) => {
			dataArray[data.id] = {};
		});
		setDesignationValue(dataArray);
	}, []); */

	const [formState, setFormState] = useState({
		isValid: false,
		values: {
			object_viewed_id: session.current_page_permissions.object_id,
			setting_type: 'OfficesITNotification',
			settings: {},
			setting_descriptor: {
				setting_type:
					'This settings is used to save Designation ID of IT to send notification to IT against office',
				setting_key: 'Office Id',
				setting_val: 'Designation Id'
			}
		},
		touched: {
			object_viewed_id: true,
			setting_type: true
		},
		errors: {}
	});
	
	const dispatchFunctions = async () => {
		await dispatch(officesListFetch(session.current_page_permissions.object_id));
		await dispatch(designationsDropdownListFetch(session.current_page_permissions.object_id));
		await dispatch(getITNotificationSettings('OfficesITNotification', session.current_page_permissions.object_id));
	}
	useEffect(() => {
		dispatchFunctions();
	}, []);

	useEffect(() => {
		if (!isEmpty(officesState.officesList) && !isEmpty(designationState.designationsDropdownList)){
			const e_settings = {};
			forEach(settingsState.settingsITNotification, function(set, key) {
				let item = find(designationState.designationsDropdownList, ['id', set.setting_val]);
				let officeID = find(officesState.officesList, ['id', set.setting_key]);
				setDesignationValue((designationValue) => ({
					...designationValue,
					[officeID.id]: item
				}));
				
				e_settings[set.setting_key] = set.setting_val;
			});
			setFormState(formState => ({
				...formState,
				values: {
					...formState.values,
					settings: e_settings
				}
			}));
		}
	}, [settingsState.settingsITNotification]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}));
	}, [formState.values]);

	useEffect(() => {
		if (!isEmpty(settingsState.validation_error)) {
			const errors = settingsState.validation_error;
			setFormState(formState => ({
				...formState,
				isValid: errors ? false : true,
				errors: errors || {}
			}));
		}
	}, [settingsState.validation_error]);

	useEffect(() => {
		if (settingsState.redirect_to_list) {
			router.history.push('/settings');
		}
	}, [settingsState.redirect_to_list, router.history]);

	const handleChange = (event, office_id, newValue) => {
		event.persist();
		// setting the designation value state
		setDesignationValue((designationValue) => ({
			...designationValue,
			[office_id]: newValue
		}));
		// setting formState
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value,
				settings: {
					...formState.values.settings,
					[office_id]: newValue.id
				}
			},
			touched: {
				...formState.touched,
				[event.target.name]: true
			}
		}));
		dispatch(hideSettingsValidationError(event.target.name));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		dispatch(saveSettings(formState.values));
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;
		
	return (
		<Card className={classes.projectDetails}>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className={classes.formGroup}>
					<p style={{marginBottom: '25px'}}>Select Entity to recieve notification in MIS whenever a new ticket is created.</p>
						{!isEmpty(officesState.officesList) ? (
							<Grid container spacing={3}>
								{officesState.officesList.map((val, i) => (
									<Grid item xs={6} sm={4} key={val.id}>
										<Autocomplete
											id={'designation_id_' + val.id}
											name={'designation_id_' + val.id}
											value={designationValue[val.id] || null}
											onChange={(event, newValue) => {
												if (newValue) {
													handleChange(event, val.id, newValue);
												}
											}}
											options={designationState.designationsDropdownList}
											getOptionLabel={option => option.name}
											renderInput={params => (
												<TextField
													{...params}
													size="small"
													label={val.name}
													variant="outlined"
												/>
											)}
										/>
									</Grid>
								))}
							</Grid>
						) : (
							''
						)}
					</div>
					{ (AccessRights(session.current_page_permissions, 'add'))?
						<StyledButton
							color="bprimary"
							disabled={!formState.isValid}
							size="small"
							type="submit"
							variant="contained"
							startIcon={<SaveIcon />}>
							Save Settings
						</StyledButton>
						:''
					}
				</form>
			</CardContent>
		</Card>
	);
};

export default ITNotifications;
