import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PaymentIcon from '@material-ui/icons/Payment';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import CodeIcon from '@material-ui/icons/Code';
import StoreIcon from '@material-ui/icons/Store';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import gradients from 'utils/gradients';
import { useDispatch } from 'react-redux';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
	root: {},
	listItem: {
		'&:hover': {
			backgroundColor: theme.palette.background.default
		}
	},
	avatarBlue: {
		backgroundImage: gradients.blue
	},
	avatarGreen: {
		backgroundImage: gradients.green
	},
	avatarOrange: {
		backgroundImage: gradients.orange
	},
	avatarIndigo: {
		backgroundImage: gradients.indigo
	},
	arrowForwardIcon: {
		color: theme.palette.icon
	}
}));

const NotificationList = props => {
	const { notifications, removeReadNotification, className, ...rest } = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const router = useRouter();

	const notificationClick = async (
		redirectTo,
		action,
		record_id,
		actionFor,
		notification_id
	) => {
		await removeReadNotification(notification_id);
		import('../../../../actions').then(actions => {
			router.history.push(redirectTo);
			const curAction = actions[action];
			dispatch(curAction(record_id, actionFor));
		});
	};

	const avatars = {
		order: (
			<Avatar className={classes.avatarBlue}>
				<PaymentIcon />
			</Avatar>
		),
		user: (
			<Avatar className={classes.avatarOrange}>
				<PeopleIcon />
			</Avatar>
		),
		project: (
			<Avatar className={classes.avatarGreen}>
				<StoreIcon />
			</Avatar>
		),
		feature: (
			<Avatar className={classes.avatarIndigo}>
				<CodeIcon />
			</Avatar>
		),
		ticket: (
			<Avatar className={classes.avatarBlue}>
				<AnnouncementIcon />
			</Avatar>
		),
		quiz: (
			<Avatar className={classes.avatarBlue}>
				<AnnouncementIcon />
			</Avatar>
		)
	};

	return (
		<List {...rest} className={clsx(classes.root, className)} disablePadding>
			{notifications.map((notification, i) => (
				<ListItem
					className={classes.listItem}
					divider={i < notifications.length - 1}
					key={i}
					onClick={() => {
						notificationClick(
							JSON.parse(notification.buttons).redirectTo,
							JSON.parse(notification.buttons).action,
							JSON.parse(notification.buttons).record_id,
							JSON.parse(notification.buttons).actionFor,
							notification.notification_id
						);
					}}>
					<ListItemAvatar>{avatars[notification.type]}</ListItemAvatar>
					<ListItemText
						primary={notification.title}
						primaryTypographyProps={{ variant: 'body1' }}
						secondary={
							<>
								<Typography
									component="p"
									variant="body2"
									className={classes.inline}
									color="textPrimary">
									{notification.description}
								</Typography>
								{moment(notification.date_created).fromNow()}
							</>
						}
					/>
					<ArrowForwardIcon className={classes.arrowForwardIcon} />
				</ListItem>
			))}
		</List>
	);
};

NotificationList.propTypes = {
	className: PropTypes.string,
	notifications: PropTypes.array.isRequired
};

export default NotificationList;
