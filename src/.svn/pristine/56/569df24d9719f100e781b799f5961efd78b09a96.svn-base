import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Tooltip,
	Typography
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Label, GenericMoreButton } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL, APP_URL } from 'configs';
import { isEmpty } from 'lodash';
import { StyledFab } from 'components';
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles(theme => ({
	root: {},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 900
	},
	author: {
		display: 'flex',
		alignItems: 'center'
	},
	avatar: {
		marginRight: theme.spacing(1)
	},
	tags: {
		'& > * + *': {
			marginLeft: theme.spacing(1)
		}
	},
	actions: {
		justifyContent: 'flex-end'
	},
	arrowForwardIcon: {
		marginLeft: theme.spacing(1)
	}
}));

const CourseWiseReport = props => {
	const {
		showCompliance,
		refreshCourseWiseSummary,
		theaderData,
		allsummaryData,
		className,
		...rest
	} = props;
	const classes = useStyles();

	const getTopHeaderRow = () => {
		if (!isEmpty(theaderData)) {
			return (
				<TableRow>
					{Object.values(theaderData).map((flag_image, hi) => (
						<TableCell key={hi}>
							{hi != 0 ? (
								flag_image ? (
									<Avatar alt="Avator" src={API_URL + flag_image} />
								) : (
									''
								)
							) : (
								flag_image
							)}
						</TableCell>
					))}
				</TableRow>
			);
		}
	};

	const getAllSummaryRows = () => {
		if (!isEmpty(allsummaryData)) {
			return (
				<>
					{Object.values(allsummaryData).map((drow, dri) => (
						<TableRow key={dri}>
							<TableCell>{drow.quiz_name}</TableCell>
							{Object.values(drow).map((dcell, dci) =>
								dci >= 2 ? (
									<TableCell
										key={dci}
										style={{
											textAlign: 'center',
											paddingLeft: '0px',
											color:
												dcell.completed_per == 'N/A'
													? 'darkgrey'
													: dcell.completed_per == '0'
													? '#bd2130'
													: dcell.completed_per < '100'
													? '#3f9fff'
													: '#1e7e34'
										}}>
										<p
											style={{ textDecoration: 'underline', fontSize: '12px' }}>
											{dcell.completed_per == 'N/A' ? (
												'N/A'
											) : (
												<a
													target="_blank"
													style={{
														color:
															dcell.completed_per == 'N/A'
																? 'darkgrey'
																: dcell.completed_per == '0'
																? '#bd2130'
																: dcell.completed_per < '100'
																? '#3f9fff'
																: '#1e7e34'
													}}
													href={
														APP_URL + 'course-report?quiz_id=' + drow.quiz_id + '&office_id=' + dcell.office_id + '&is_complience=' + showCompliance 
													}>
													{dcell.completed_per + '%'}
												</a>
											)}
										</p>
										<p style={{ fontSize: '12px' }}>
											{dcell.total == 'N/A' ? '(N/A)' : '(' + dcell.total + ')'}
										</p>
									</TableCell>
								) : (
									''
								)
							)}
						</TableRow>
					))}
				</>
			);
		}
	};

	return (
		<div style={{ position: 'relative' }}>
			<StyledFab
				color="bsuccess"
				aria-label="edit"
				size="small"
				style={{
					top: '-16px',
					right: '-8px',
					position: 'absolute'
				}}
				onClick={() => refreshCourseWiseSummary(showCompliance)}>
				<CachedIcon size="small" />
			</StyledFab>
			<Card {...rest} className={clsx(classes.root, className)}>
				<CardHeader
					action={<GenericMoreButton />}
					title="Course Wise Completion Report "
				/>
				<Divider />
				<CardContent className={classes.content}>
					<PerfectScrollbar options={{ suppressScrollY: true }}>
						<div
							className={classes.inner}
							style={{ maxHeight: 400, overflowY: 'scroll' }}>
							<Table>
								<TableHead>{getTopHeaderRow()}</TableHead>
								<TableBody>{getAllSummaryRows()}</TableBody>
							</Table>
						</div>
					</PerfectScrollbar>
				</CardContent>
			</Card>
		</div>
	);
};

CourseWiseReport.propTypes = {
	className: PropTypes.string
};

export default CourseWiseReport;
