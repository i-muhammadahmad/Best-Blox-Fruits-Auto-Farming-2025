import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import {
	TextField,
	makeStyles,
	Grid,
	FormControl,
	FormHelperText,
	InputLabel,
	Paper,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Badge,
	Typography
} from '@material-ui/core';
import { StyledFab } from 'components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { CK_CONFIGS } from 'configs';
import Nestable from 'react-nestable';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { forEach } from 'lodash';

const useStylesModal = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	formControl: {
		margin: theme.spacing(1),
		width: '100%'
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	badgeStyle: {
		height: '25px',
		borderRadius: '15px',
		padding: '0px',
		top: '12px',
		right: '12px'
	}
}));

const PoDetailsItem = props => {
	const {
		poDetailsList,
		formState,
		setFormState,
		hasError,
		handleQuantityChange,
		handleAssetDetailsChange,
		handleUnitPriceChange,
		handleExtendedPriceChange,
		handleLocalCurrencyTotalChange,
		handleDollarTotalChange,
		deletePoItem,
		setPoDetails
	} = props;

	const classes = useStylesModal();
	const dispatch = useDispatch();

	const itemSortOrderChanged = (items, changedItem) => {
		let item_obj = {};
		forEach(items, function(value, key) {
			item_obj[value.id] = value;
		});
		setPoDetails(item_obj);
	};

	const badgeContentHtml = fid => {
		return (
			<span
				onClick={() => {
					deletePoItem(fid);
				}}>
				<DeleteIcon />
			</span>
		);
	};

	const ListItemRenderer = ({ item, collapseIcon, index }) => {
		let fid = item['id'];

		return (
			<Paper
				key={fid}
				elevation={3}
				style={{
					width: '100%',
					padding: '20px',
					marginBottom: '20px',
					backgroundColor: '#FFFFF6',
					borderTopRightRadius: '17px'
				}}>
				<StyledFab
					color="bdanger"
					aria-label="edit"
					size="small"
					style={{ top: '0px', right: '0px', position: 'absolute' }}
					onClick={() => deletePoItem(fid)}>
					<DeleteIcon size="small" />
				</StyledFab>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12}>
						<FormHelperText>
							<Typography component="b">Asset Details</Typography>
						</FormHelperText>
						<CKEditor
							editor={ClassicEditor}
							config={CK_CONFIGS(localStorage.getItem('token'))}
							data={formState.values['asset_details_' + fid] || ''}
							onChange={(event, editor) => {
								const data = editor.getData();
								handleAssetDetailsChange(event, data, fid);
							}}
						/>
						<FormControl error={hasError('asset_details_' + fid)}>
							<FormHelperText id="component-error-text">
								{hasError('asset_details_' + fid)
									? formState.errors['asset_details_' + fid][0]
									: null}
							</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={4} sm={4}>
						<TextField
							style={{ backgroundColor: '#ffffff' }}
							error={hasError('quantity_' + fid)}
							fullWidth
							type="number"
							helperText={
								hasError('quantity_' + fid)
									? formState.errors['quantity_' + fid][0]
									: null
							}
							label="Quantity"
							name={'quantity_' + fid}
							onChange={event => {
								handleQuantityChange(event, fid);
							}}
							value={formState.values['quantity_' + fid] || ''}
							variant="outlined"
							size="small"
						/>
					</Grid>
					<Grid item xs={4} sm={4}>
						<TextField
							style={{ backgroundColor: '#ffffff' }}
							error={hasError('unit_price_' + fid)}
							fullWidth
							type="number"
							helperText={
								hasError('unit_price_' + fid)
									? formState.errors['unit_price_' + fid][0]
									: null
							}
							label="Unit Price"
							name={'unit_price_' + fid}
							onChange={event => {
								handleUnitPriceChange(event, fid);
							}}
							value={formState.values['unit_price_' + fid] || ''}
							variant="outlined"
							size="small"
						/>
					</Grid>
					<Grid item xs={4} sm={4}>
						<TextField
							style={{ backgroundColor: '#ffffff' }}
							error={hasError('extended_price_' + fid)}
							fullWidth
							helperText={
								hasError('extended_price_' + fid)
									? formState.errors['extended_price_' + fid][0]
									: null
							}
							label="Extended Price"
							name={'extended_price_' + fid}
							onChange={event => {
								handleExtendedPriceChange(event, fid);
							}}
							value={formState.values['extended_price_' + fid] || ''}
							variant="outlined"
							size="small"
						/>
					</Grid>
					<Grid item xs={4} sm={4}>
						<TextField
							style={{ backgroundColor: '#ffffff' }}
							error={hasError('local_currency_total' + fid)}
							fullWidth
							helperText={
								hasError('local_currency_total' + fid)
									? formState.errors['local_currency_total' + fid][0]
									: null
							}
							label="Local Currency Total"
							name={'local_currency_total' + fid}
							onChange={event => {
								handleLocalCurrencyTotalChange(event, fid);
							}}
							value={formState.values['local_currency_total' + fid] || ''}
							variant="outlined"
							size="small"
						/>
					</Grid>
					<Grid item xs={4} sm={4}>
						<TextField
							style={{ backgroundColor: '#ffffff' }}
							error={hasError('dollar_total' + fid)}
							fullWidth
							type="number"
							helperText={
								hasError('dollar_total' + fid)
									? formState.errors['dollar_total' + fid][0]
									: null
							}
							label="US Dollars Total"
							name={'dollar_total' + fid}
							onChange={event => {
								handleDollarTotalChange(event, fid);
							}}
							value={formState.values['dollar_total' + fid] || ''}
							variant="outlined"
							size="small"
						/>
					</Grid>
				</Grid>
			</Paper>
		);
	};

	return (
		<div className={classes.root}>
			<Nestable
				items={poDetailsList}
				renderItem={ListItemRenderer}
				onChange={(items, changedItem) => {
					itemSortOrderChanged(items, changedItem);
				}}
				maxDepth={1}
			/>
		</div>
	);
};

export default PoDetailsItem;
