import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Header, PoDetailsItem } from './components';
import {
	updatePurchaseOrders,
	hidePurchaseOrdersValidationError,
	redirectToPurchaseOrdersList,
	vendorsDropdownListFetch
} from 'actions';
import {
	Card,
	CardHeader,
	CardContent,
	TextField,
	Grid,
	FormControl,
	FormHelperText,
	List,
	ListItem,
	ListItemText,
	IconButton,
	ListSubheader,
	InputAdornment
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Page, StyledButton, StyledFab } from 'components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { isEmpty, forEach, find, each } from 'lodash';
import useRouter from 'utils/useRouter';
import moment from 'moment';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { OfficesDropdown, DocumentDropdown } from 'commonDropdowns';
import { CK_CONFIGS, API_URL } from 'configs';
import { AddDocument } from 'components';
import { FileIcon, defaultStyles } from 'react-file-icon';
import RefreshIcon from '@material-ui/icons/Refresh';

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
	thumb: {
		display: 'inline-flex',
		borderRadius: 2,
		border: '1px solid #eaeaea',
		marginBottom: 8,
		marginRight: 8,
		width: 100,
		height: 100,
		padding: 2,
		boxSizing: 'border-box'
	},
	svgIcon: {
		height: '100%',
		'& svg': {
			height: '100%'
		}
	},
	svgTitle: {
		fontSize: '10px',
		position: 'relative',
		left: '10px',
		top: '35px'
	},
	image: {
		width: '100%',
		height: 'auto'
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	}
}));

const PurchaseOrdersUpdate = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();
	const purchaseOrdersState = useSelector(state => state.purchaseOrdersState);
	const vendorsState = useSelector(state => state.vendorsState);
	const session = useSelector(state => state.session);

	const [vendor, setVendor] = useState(null);
	const [OfficeValue, setOfficeValue] = useState(null);
	const [poDetails, setPoDetails] = useState({});
	const [insertedDoc, setInsertedDoc] = useState({});

	const [schema, setSchema] = React.useState({
		purchase_order_number: {
			presence: { allowEmpty: false, message: '^P.O Number is required' }
		},
		date: {
			presence: { allowEmpty: false, message: '^P.O Date is required' }
		},
		vendor_id: {
			presence: { allowEmpty: false, message: '^Please Select Vendor' }
		},
		office_id: {
			presence: { allowEmpty: false, message: '^Please Select Office' }
		},
		exchange_rate: {
			numericality: {
				greaterThan: 0,
				message: 'Must Be grather than or equal to 1'
			}
		}
	});

	const [formState, setFormState] = useState({
		isValid: false,
		values: {
			date: moment(moment().toDate()).format('YYYY-MM-DD'),
			office_id: !isEmpty(session.user) ? session.user.employee.office_id : '',
			object_viewed_id: session.current_page_permissions.object_id
		},
		touched: {
			date: true,
			office_id: true,
			object_viewed_id: true
		},
		errors: {}
	});

	useEffect(() => {
		dispatch(vendorsDropdownListFetch(session.current_page_permissions.object_id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		async function papulateFormData() {
			let record = purchaseOrdersState.purchaseOrdersRecord;
			let schema_arr = { ...schema };
			let poDetails_arr = { ...poDetails };
			let form_val_arr = {
				...formState.values,
				purchase_order_number: record.purchase_order_number,
				date: record.date,
				estimated_delivery_date: record.estimated_date_of_delivery,
				actual_delivery_date: record.actual_date_of_delivery,
				vendor_id: record.vendor_id,
				office_id: record.office_id,
				exchange_rate: record.exchange_rate,
				id: record.id,
				description: record.description
			};
			let form_touch_arr = {
				...formState.touched,
				purchase_order_number: true,
				date: true,
				estimated_delivery_date: true,
				actual_delivery_date: true,
				vendor_id: true,
				office_id: true,
				exchange_rate: true,
				id: true,
				description: true
			};

			forEach(record.po_details, function(value, key) {
				let f_id = value.id;
				schema_arr = {
					...schema_arr,
					['asset_details_' + f_id]: {
						presence: {
							allowEmpty: false,
							message: '^Asset Details are required'
						}
					},
					['quantity_' + f_id]: {
						presence: { allowEmpty: false, message: '^Quantity is required' },
						numericality: {
							greaterThan: 0,
							message: '^Quantity Must Be grather than or equal to 1'
						}
					},
					['unit_price_' + f_id]: {
						numericality: {
							greaterThan: 0,
							message: '^Unit Price Must Be grather than or equal to 1'
						}
					},
					['dollar_total' + f_id]: {
						numericality: {
							greaterThan: 0,
							message: '^US Dollars Total Must Be grather than or equal to 1'
						}
					}
				};

				form_val_arr = {
					...form_val_arr,
					['asset_details_' + f_id]: value.asset_details,
					['quantity_' + f_id]: value.quantity,
					['unit_price_' + f_id]: value.unit_price,
					['extended_price_' + f_id]: value.extended_price,
					['local_currency_total' + f_id]: value.local_currency_total,
					['dollar_total' + f_id]: value.dollars_total
				};
				form_touch_arr = {
					...form_touch_arr,
					['asset_details_' + f_id]: true,
					['quantity_' + f_id]: true,
					['unit_price_' + f_id]: true,
					['extended_price_' + f_id]: true,
					['local_currency_total' + f_id]: true,
					['dollar_total' + f_id]: true
				};

				poDetails_arr = {
					...poDetails_arr,
					[f_id]: {
						...poDetails_arr[f_id],
						asset_details: value.asset_details,
						quantity: value.quantity,
						unit_price: value.unit_price,
						extended_price: value.extended_price,
						local_currency_total: value.local_currency_total,
						dollar_total: value.dollars_total,
						id: f_id
					}
				};
			});

			await setSchema(schema_arr);
			await setFormState(formState => ({
				...formState,
				values: form_val_arr,
				touched: form_touch_arr
			}));
			await setPoDetails(poDetails_arr);
		}

		papulateFormData();

		let record = purchaseOrdersState.purchaseOrdersRecord;
		each(record.po_documents, (doc, key) => {
			let title = !isEmpty(doc.document_title)
				? doc.document_title.title
				: null;
			setInsertedDoc(insertedDoc => ({
				...insertedDoc,
				[doc.id]: { f_id: doc.id, id: doc.document_id, title }
			}));
		});
	}, [purchaseOrdersState.purchaseOrdersRecord]);

	useEffect(() => {
		let record = purchaseOrdersState.purchaseOrdersRecord;
		const item = find(vendorsState.vendorsDropdownList, [
			'id',
			record.vendor_id
		]);
		setVendor(item);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vendorsState.vendorsDropdownList]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}));
	}, [formState.values]);

	useEffect(() => {
		if (!isEmpty(purchaseOrdersState.validation_error)) {
			const errors = purchaseOrdersState.validation_error;
			setFormState(formState => ({
				...formState,
				isValid: errors ? false : true,
				errors: errors || {}
			}));
		}
	}, [purchaseOrdersState.validation_error]);

	useEffect(() => {
		if (!purchaseOrdersState.showViewPage && !purchaseOrdersState.showUpdateForm) {
			router.history.push('/purchase-orders');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [purchaseOrdersState.showViewPage, purchaseOrdersState.showUpdateForm]);

	useEffect(() => {
		if (purchaseOrdersState.redirect_to_list) {
			router.history.push('/purchase-orders');
		}
	}, [purchaseOrdersState.redirect_to_list, router.history]);

	const addPODetail = async () => {
		let f_id = uuid();
		await setPoDetails(poDetails => ({
			[f_id]: {
				...poDetails[f_id],
				asset_details: '',
				quantity: '',
				id: f_id
			},
			...poDetails
		}));

		await setSchema(schema => ({
			...schema,
			['asset_details_' + f_id]: {
				presence: { allowEmpty: false, message: '^Asset Details are required' }
			},
			['quantity_' + f_id]: {
				presence: { allowEmpty: false, message: '^Quantity is required' },
				numericality: {
					greaterThan: 0,
					message: '^Quantity Must Be grather than or equal to 1'
				}
			},
			['unit_price_' + f_id]: {
				presence: { allowEmpty: false, message: '^Unit Price is required' },
				numericality: {
					greaterThan: 0,
					message: '^Unit Price Must Be grather than or equal to 1'
				}
			},
			['dollar_total' + f_id]: {
				numericality: {
					greaterThan: 0,
					message: '^US Dollars Total Must Be grather than or equal to 1'
				}
			}
		}));
	};

	const deletePoItem = async id => {
		let schema_arr = { ...schema };
		let formState_arr = { ...formState };
		let poDetails_arr = { ...poDetails };

		await delete poDetails_arr[id];
		await setPoDetails(poDetails_arr);

		//resting schema for validations
		await delete schema_arr['asset_details_' + id];
		await delete schema_arr['quantity_' + id];
		await setSchema(schema_arr);

		//resting form states
		await delete formState_arr['values']['asset_details_' + id];
		await delete formState_arr['values']['quantity_' + id];
		await delete formState_arr['touched']['asset_details_' + id];
		await delete formState_arr['touched']['quantity_' + id];
		await delete formState_arr['errors']['asset_details_' + id];
		await delete formState_arr['errors']['quantity_' + id];
		await setFormState(formState => ({
			...formState,
			values: {
				...formState_arr['values']
			},
			touched: {
				...formState_arr['touched']
			},
			errors: {
				...formState_arr['errors']
			}
		}));
	};

	const regenratePONumber = e => {
		e.preventDefault();
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				purchase_order_number: uuid()
			},
			touched: {
				...formState.touched,
				purchase_order_number: true
			}
		}));
		dispatch(hidePurchaseOrdersValidationError('purchase_order_number'));
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
		dispatch(hidePurchaseOrdersValidationError('description'));
	};

	const setVendorId = vendor_id => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				vendor_id: vendor_id
			},
			touched: {
				...formState.touched,
				vendor_id: true
			}
		}));
		dispatch(hidePurchaseOrdersValidationError('vendor_id'));
	};

	const officeOnChange = (event, newValue) => {
		if (newValue) {
			setOfficeValue(newValue);
			setOfficeId(newValue.id);
		} else {
			setOfficeValue(newValue);
			setOfficeId('');
		}
	};

	const setOfficeId = office_id => {
		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				office_id: office_id
			},
			touched: {
				...formState.touched,
				office_id: true
			}
		}));
		dispatch(hidePurchaseOrdersValidationError('office_id'));
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
		dispatch(hidePurchaseOrdersValidationError(event.target.name));
	};

	const handleQuantityChange = (event, id) => {
		if (!isEmpty(poDetails[id])) {
			handleChange(event);

			setPoDetails(poDetails => ({
				...poDetails,
				[id]: {
					...poDetails[id],
					quantity: event.target.value
				}
			}));
		}
	};

	const handleUnitPriceChange = (event, id) => {
		if (!isEmpty(poDetails[id])) {
			handleChange(event);

			setPoDetails(poDetails => ({
				...poDetails,
				[id]: {
					...poDetails[id],
					unit_price: event.target.value
				}
			}));
		}
	};

	const handleExtendedPriceChange = (event, id) => {
		if (!isEmpty(poDetails[id])) {
			handleChange(event);

			setPoDetails(poDetails => ({
				...poDetails,
				[id]: {
					...poDetails[id],
					extended_price: event.target.value
				}
			}));
		}
	};

	const handleLocalCurrencyTotalChange = (event, id) => {
		if (!isEmpty(poDetails[id])) {
			handleChange(event);

			setPoDetails(poDetails => ({
				...poDetails,
				[id]: {
					...poDetails[id],
					local_currency_total: event.target.value
				}
			}));
		}
	};

	const handleDollarTotalChange = (event, id) => {
		if (!isEmpty(poDetails[id])) {
			handleChange(event);

			setPoDetails(poDetails => ({
				...poDetails,
				[id]: {
					...poDetails[id],
					dollar_total: event.target.value
				}
			}));
		}
	};

	const handleAssetDetailsChange = (event, desc, id) => {
		if (!isEmpty(poDetails[id])) {
			setFormState(formState => ({
				...formState,
				values: {
					...formState.values,
					['asset_details_' + id]: desc
				},
				touched: {
					...formState.touched,
					['asset_details_' + id]: true
				}
			}));

			setPoDetails(poDetails => ({
				...poDetails,
				[id]: {
					...poDetails[id],
					asset_details: desc
				}
			}));
		}
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (formState.isValid) {
			let form_data = formState.values;
			form_data['poDetails'] = Object.values(poDetails);
			form_data['poDocuments'] = insertedDoc;
			dispatch(updatePurchaseOrders(form_data));
		}
	};

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false;

	const removeDoc = async (e, i) => {
		e.preventDefault();
		let docs_arr = { ...insertedDoc };
		await delete docs_arr[i];
		await setInsertedDoc(Object.values(docs_arr));
	};

	return (
		<Page className={classes.root} title="Update Purchase Order">
			<Header />
			<Card className={classes.projectDetails}>
				<CardHeader title="Update Purchase Order" />
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className={classes.formGroup}>
							<Grid container spacing={3}>
								<Grid item xs={6} sm={4}>
									<TextField
										error={hasError('purchase_order_number')}
										fullWidth
										helperText={
											hasError('purchase_order_number')
												? formState.errors.purchase_order_number[0]
												: null
										}
										label="P.O Number"
										name="purchase_order_number"
										onChange={handleChange}
										value={formState.values.purchase_order_number || ''}
										variant="outlined"
										size="small"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="Regenerate PO number"
														size="small"
														color="primary"
														onClick={e => regenratePONumber(e)}>
														<RefreshIcon />
													</IconButton>
												</InputAdornment>
											)
										}}
									/>
								</Grid>
								<Grid item xs={6} sm={4}>
									<TextField
										className={classes.field}
										value={formState.values.date || ''}
										fullWidth
										label="P.O Date"
										name="date"
										onChange={handleChange}
										type="date"
										variant="outlined"
										size="small"
										InputLabelProps={{
											shrink: true
										}}
										error={hasError('date')}
										helperText={
											hasError('date') ? formState.errors.date[0] : null
										}
									/>
								</Grid>
								<Grid item xs={6} sm={4}>
									<TextField
										className={classes.field}
										value={formState.values.estimated_delivery_date || ''}
										fullWidth
										label="Estimated Delivery Date"
										name="estimated_delivery_date"
										onChange={handleChange}
										type="date"
										variant="outlined"
										size="small"
										InputLabelProps={{
											shrink: true
										}}
										error={hasError('estimated_delivery_date')}
										helperText={
											hasError('estimated_delivery_date')
												? formState.errors.estimated_delivery_date[0]
												: null
										}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={6} sm={4}>
									<TextField
										className={classes.field}
										value={formState.values.actual_delivery_date || ''}
										fullWidth
										label="Actual Delivery Date"
										name="actual_delivery_date"
										onChange={handleChange}
										type="date"
										variant="outlined"
										size="small"
										InputLabelProps={{
											shrink: true
										}}
										error={hasError('actual_delivery_date')}
										helperText={
											hasError('actual_delivery_date')
												? formState.errors.actual_delivery_date[0]
												: null
										}
									/>
								</Grid>
								<Grid item xs={6} sm={4}>
									{vendorsState.vendorsDropdownList ? (
										<Autocomplete
											id="vendor_id"
											value={vendor}
											onChange={(event, newValue) => {
												if (newValue) {
													setVendor(newValue);
													setVendorId(newValue.id);
												} else {
													setVendor(newValue);
													setVendorId('');
												}
											}}
											size="small"
											options={vendorsState.vendorsDropdownList}
											getOptionLabel={option => option.name}
											renderInput={params => (
												<TextField
													{...params}
													label="Select Vendor"
													variant="outlined"
													error={hasError('vendor_id')}
													helperText={
														hasError('vendor_id')
															? formState.errors.vendor_id[0]
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
									<OfficesDropdown
										OfficeValue={OfficeValue}
										setOfficeValue={setOfficeValue}
										selectedId={!isEmpty(session.user) ? session.user.employee.office_id : ''}
										id="office_id"
										name="office_id"
										officeOnChange={officeOnChange}
										disabled={true}
										renderInput={params => (
											<TextField
												{...params}
												label="Select Office"
												variant="outlined"
												error={hasError('office_id')}
												helperText={
													hasError('office_id')
														? formState.errors.office_id[0]
														: null
												}
											/>
										)}
									/>
								</Grid>
								<Grid item xs={6} sm={4}>
									<TextField
										className={classes.field}
										value={formState.values.exchange_rate || ''}
										fullWidth
										type="number"
										label="Exchange Rate"
										name="exchange_rate"
										onChange={handleChange}
										variant="outlined"
										size="small"
										error={hasError('exchange_rate')}
										helperText={
											hasError('exchange_rate')
												? formState.errors.exchange_rate[0]
												: null
										}
									/>
								</Grid>
								<Grid item xs={6} sm={4}>
									<AddDocument
										title="Add Document"
										insertedDoc={insertedDoc}
										setInsertedDoc={setInsertedDoc}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={4} sm={4}>
									{!isEmpty(insertedDoc) ? (
										<div
											style={{
												border: '1px solid #e0dcdc',
												borderRadius: '5px'
											}}>
											<PerfectScrollbar options={{ suppressScrollX: true }}>
												<List
													className={classes.list}
													subheader={
														<ListSubheader
															component="div"
															style={{ lineHeight: '30px', paddingTop: '5px' }}>
															Added Document
														</ListSubheader>
													}>
													{Object.values(insertedDoc).map((doc, i) => (
														<ListItem
															divider={
																i < Object.values(insertedDoc).length - 1
															}
															style={{ paddingTop: '0', paddingBottom: '0' }}
															key={doc.id}>
															<ListItemText
																primary={doc.title}
																primaryTypographyProps={{ variant: 'h5' }}
															/>
															<IconButton
																edge="end"
																onClick={e => {
																	removeDoc(e, doc.f_id);
																}}>
																<StyledFab
																	color="bdanger"
																	aria-label="edit"
																	size="small">
																	<DeleteIcon size="small" />
																</StyledFab>
															</IconButton>
														</ListItem>
													))}
												</List>
											</PerfectScrollbar>
										</div>
									) : (
										''
									)}
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={12}>
									<StyledButton
										color="bsuccess"
										type="button"
										variant="contained"
										onClick={addPODetail}
										size="small"
										startIcon={<AddCircleOutlineIcon />}>
										Add P.O Details
									</StyledButton>
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={12}>
									{!isEmpty(poDetails) ? (
										<PoDetailsItem
											poDetailsList={Object.values(poDetails)}
											formState={formState}
											setFormState={setFormState}
											hasError={hasError}
											handleAssetDetailsChange={handleAssetDetailsChange}
											handleQuantityChange={handleQuantityChange}
											handleUnitPriceChange={handleUnitPriceChange}
											handleExtendedPriceChange={handleExtendedPriceChange}
											handleLocalCurrencyTotalChange={
												handleLocalCurrencyTotalChange
											}
											handleDollarTotalChange={handleDollarTotalChange}
											setPoDetails={setPoDetails}
											deletePoItem={deletePoItem}
										/>
									) : (
										''
									)}
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={12}>
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
						</div>
						<StyledButton
							color="bprimary"
							disabled={!formState.isValid}
							size="small"
							type="submit"
							variant="contained"
							startIcon={<SaveIcon />}>
							Update Purchase Order
						</StyledButton>{' '}
						&nbsp; &nbsp;
						<StyledButton
							variant="contained"
							color="blight"
							size="small"
							onClick={() => {
								dispatch(redirectToPurchaseOrdersList());
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

export default PurchaseOrdersUpdate;
