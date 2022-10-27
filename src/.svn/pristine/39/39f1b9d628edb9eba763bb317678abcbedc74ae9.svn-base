import React from 'react';
import uuid from 'uuid/v1';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Fab, FormControlLabel } from '@material-ui/core';
import {
	Card,
	CardHeader,
	CardContent,
	TextField,
	Grid,
	FormControl,
	FormHelperText,
	Typography,
	Paper
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { StyledButton, StyledFab } from 'components';
import DeleteIcon from '@material-ui/icons/Delete';
import LineItems from './LineItems';

const drawerWidth = 600;

const useStyles = makeStyles(theme => ({
	root: {
		width: theme.breakpoints.values.lg,
		maxWidth: '100%',
		margin: '0 auto',
		padding: theme.spacing(3, 3, 6, 3),
		backgroundColor: theme.palette.white
	},
	drawer: {
		width: drawerWidth
	},
	drawerPaper: {
		width: drawerWidth
	},
	projectDetails: {
		marginTop: theme.spacing(3)
	},
	formGroup: {
		marginBottom: theme.spacing(3)
	}
}));


export default function Sidebar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const {
		open,
		handleDrawerToggle,
		lineItemsList,
		setLineItemsList,
		formState,
		setFormState,
		schema,
		setSchema,
		hasError,
		...rest
	} = props;

	const addLineItem = async () => {
		let f_id = uuid();
		await setLineItemsList(lineItemsList => ({
			...lineItemsList,
			[f_id]: {
				...lineItemsList[f_id],
				office_id: '',
				type: '',
				id: f_id
			}
		}));

		await setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				['office_id_' + f_id]: '',
				['type_' + f_id]: ''
			},
			touched:{
				...formState.touched,
				['office_id_' + f_id]: false,
				['type_' + f_id]: false
			}
		}));

		await setSchema(schema => ({
			...schema,
			['office_id_' + f_id]: {
				presence: { allowEmpty: false, message: '^Please Select Office' }
			},
			['type_' + f_id]: {
				presence: { allowEmpty: false, message: '^Please Select Access Type' }
			}
		}));
	};

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				anchor="right"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
				variant="temporary"
				onClose={handleDrawerToggle}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerToggle}>
						{theme.direction === 'rtl' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
						Document Access
					</IconButton>
				</div>
				<Divider />
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12}>
							<StyledButton
								color="bsuccess"
								type="button"
								variant="contained"
								onClick={addLineItem}
								size="small"
								startIcon={<AddCircleOutlineIcon />}>
								Add Line Item
							</StyledButton>
						</Grid>
						<Grid item xs={12} sm={12}>
							<LineItems
								lineItemsList={lineItemsList}
								setLineItemsList={setLineItemsList}
								formState={formState}
								setFormState={setFormState}
								schema={schema}
								setSchema={setSchema}
                hasError={hasError}
							/>
						</Grid>
					</Grid>
				</div>
			</Drawer>
		</div>
	);
}
