import React, { useEffect, useState } from 'react';
import { Page } from 'components';
import useRouter from 'utils/useRouter';
import { Header } from './components';
import { StyledChip, AttachmentsPreviewer } from 'components';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Card,
	CardHeader,
	CardContent,
	Grid,
	ButtonBase,
	Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { API_URL } from 'configs';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const useStyles = makeStyles(theme => ({
	root: {
		width: theme.breakpoints.values.lg,
		maxWidth: '100%',
		margin: '0 auto',
		padding: theme.spacing(3, 3, 6, 3),
		fontFamily: 'Roboto',
		fontSize: '14px'
	},
	projectDetails: {
		marginTop: theme.spacing(3)
	},
	formGroup: {
		marginBottom: theme.spacing(3)
	},
	noTopPad: {
		paddingTop: '0px !important'
	},
	title: {
		fontSize: 14
	},
	borderWhite: {
		borderColor: 'white'
	},
	detailHead: {
		color: 'grey'
	},
	detailBody: {
		color: '#000'
	}
}));

const getTicketStatus = status => {
	if (status === 'Closed') {
		return <StyledChip size="small" color="bsuccess" label="Closed" />;
	} else if (status === 'In Progress') {
		return <StyledChip size="small" color="bprimary" label="In Progress" />;
	} else if (status === 'Pending') {
		return <StyledChip size="small" color="bwarning" label="Pending" />;
	}
};

const TicketsView = () => {
	const classes = useStyles();
	const router = useRouter();
	const ticketsState = useSelector(state => state.ticketsState);
	const dispatch = useDispatch();

	const [recordState, setRecordState] = useState('');
	const [ticketActivty, setTicketActivity] = useState([]);

	useEffect(() => {
		setRecordState(ticketsState.ticketsRecord);
		setTicketActivity(ticketsState.ticketsRecord.ticket_activity);
	}, []);

	useEffect(() => {
		if (ticketsState.redirect_to_list) {
			router.history.push('/tickets');
		}
	}, [ticketsState.redirect_to_list, router.history]);

	useEffect(() => {
		if (!ticketsState.showUpdateForm && !ticketsState.showViewPage) {
			router.history.push('/tickets');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ticketsState.showViewPage, ticketsState.showUpdateForm]);

	const downloadAttachment = (e, record_id) => {
		window.location.href =
			API_URL + 'tickets/downloadTicketAttachment?id=' + record_id;
	};

	return (
		<Page className={classes.root} title="Tickets View">
			<Header />
			<Card className={classes.projectDetails}>
				<CardHeader title="Tickets View" />
				<CardContent>
					<div className={classes.formGroup}>
						<Grid container spacing={3}>
							<Grid item xs={8} sm={8}>
								{ticketActivty.map((data, index) => (
									<Card
										key={index}
										className={index > 0 ? classes.projectDetails : ''}>
										{index == 0 ? <CardHeader title={recordState.title} /> : ''}
										<CardContent className={index == 0 ? classes.noTopPad : ''}>
											{index > 0 ? (
												<Typography
													className={classes.title}
													color="textSecondary"
													gutterBottom>
													Added By {data.created_by_user.email}{' '}
													<DoubleArrowIcon style={{ fontSize: '10px' }} />{' '}
													{data.date_created}
												</Typography>
											) : (
												''
											)}
											<div
												className="ck-content"
												dangerouslySetInnerHTML={{
													__html: data.description
												}}
											/>
											<br />
											<div>
												<AttachmentsPreviewer
													attachmentList={data.ticket_attachment}
													setAttachmentList={() => {}}
													showDeleteButton={false}
													downloadCallback={downloadAttachment}
													colHeight={120}
													noOfCols={5}
												/>
											</div>
										</CardContent>
									</Card>
								))}
							</Grid>
							<Grid item xs={4} sm={4}>
								<Card>
									<CardHeader title="Ticket Details" />
									<CardContent className={classes.noTopPad}>
										<div style={{ display: 'flex' }}>
											<div className={classes.detailHead}>Tracking ID:</div>{' '}
											&nbsp;
											<div className={classes.detailBody}>
												{!isEmpty(recordState) ? recordState.tracking_id : ''}
											</div>
										</div>
										<br />
										<div style={{ display: 'flex' }}>
											<div className={classes.detailHead}>Category:</div> &nbsp;
											<div className={classes.detailBody}>
												{!isEmpty(recordState.ticket_category)
													? recordState.ticket_category.category_name
													: ''}
											</div>
										</div>
										<br />
										<div style={{ display: 'flex' }}>
											<div className={classes.detailHead}>Ticket Status:</div>{' '}
											&nbsp;
											<div>
												{getTicketStatus(
													!isEmpty(recordState.ticket_status)
														? recordState.ticket_status.status
														: ''
												)}
											</div>
										</div>
										<br />
										<div style={{ display: 'flex' }}>
											<div className={classes.detailHead}>Created On:</div>{' '}
											&nbsp;
											<div className={classes.detailBody}>
												{!isEmpty(recordState) ? recordState.date_created : ''}
											</div>
										</div>
										<br />
										<div style={{ display: 'flex' }}>
											<div className={classes.detailHead}>Last Updated On:</div>{' '}
											&nbsp;
											<div className={classes.detailBody}>
												{!isEmpty(recordState)
													? recordState.date_last_modified
													: ''}
											</div>
										</div>
										<br />
										<div style={{ display: 'flex' }}>
											<div className={classes.detailHead}>Created by:</div>
											&nbsp;
											<div className={classes.detailBody}>
												{!isEmpty(recordState)
													? recordState.created_by_user.email
													: ''}
											</div>
										</div>
										<br />
										<div style={{ display: 'flex' }}>
											<div className={classes.detailHead}>Last Updated by:</div>
											&nbsp;
											<div className={classes.detailBody}>
												{!isEmpty(recordState)
													? recordState.updated_by_user.email
													: ''}
											</div>
										</div>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</div>
				</CardContent>
			</Card>
		</Page>
	);
};

export default TicketsView;
