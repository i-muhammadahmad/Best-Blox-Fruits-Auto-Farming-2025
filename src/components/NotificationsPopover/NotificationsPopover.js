import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
	Popover,
	CardHeader,
	CardActions,
	Divider,
	Button,
	colors,
	IconButton
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { readAllNotifications, getAllUnreadNotifications } from 'actions';
import { NotificationList, EmptyList } from './components';
import StyledButton from 'components/StyledButton';

const useStyles = makeStyles(() => ({
	root: {
		width: 350,
		maxWidth: '100%'
	},
	actions: {
		backgroundColor: colors.grey[50],
		justifyContent: 'center'
	}
}));

const NotificationsPopover = props => {
	const dispatch = useDispatch();
	const {
		notifications,
		removeReadNotification,
		employeeId,
		timezoneId,
		anchorEl,
		...rest
	} = props;

	const handleAllReadButton = async () => {
		await readAllNotifications(employeeId);
		dispatch(getAllUnreadNotifications(employeeId, timezoneId));
	};

	const classes = useStyles();

	return (
		<Popover
			{...rest}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center'
			}}>
			<div className={classes.root}>
				<CardHeader
					title="Notifications"
					action={
						notifications.length > 0 ? (
							<StyledButton
								style={{ marginTop: '8px' }}
								size="small"
								onClick={() => {
									handleAllReadButton();
								}}
								color="bprimary">
								Mark All As Read
							</StyledButton>
						) : (
							''
						)
					}
				/>
				<Divider />
				{notifications.length > 0 ? (
					<NotificationList
						notifications={notifications}
						removeReadNotification={removeReadNotification}
					/>
				) : (
					<EmptyList />
				)}
				<Divider />
				{/* <CardActions className={classes.actions}>
					<Button component={RouterLink} size="small" to="#">
						See all
					</Button>
				</CardActions> */}
			</div>
		</Popover>
	);
};

NotificationsPopover.propTypes = {
	anchorEl: PropTypes.any,
	className: PropTypes.string,
	notifications: PropTypes.array.isRequired,
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

export default NotificationsPopover;
