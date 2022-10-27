import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Switch,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	Typography,
	Grid
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Page } from 'components';
import moment from 'moment';
import { getcourseDashboardOfficeWiseSummary, getcourseDashboardCourseWiseSummary } from 'actions';
import { Header, CourseOffices, CourseWiseReport } from './components';
import { API_URL } from 'configs';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	},
	container: {
		marginTop: theme.spacing(3)
	}
}));

const DashboardCourse = () => {
	const dashboardCourseState = useSelector(state => state.dashboardCourseState);
	const classes = useStyles();
	const dispatch = useDispatch();
	const [showReport, setShowReport] = useState(false);
	const [showCompliance, setShowCompliance] = useState(false);
	const [courseWiseReportList, setCourseWiseReportList] = useState({
		theader: [],
		all_summary: []
	});

	const handleChange = event => {
		setShowCompliance(event.target.checked);
	};

	useEffect(() => {
		let mounted = true;

		dispatch(getcourseDashboardOfficeWiseSummary(showCompliance));
    dispatch(getcourseDashboardCourseWiseSummary(showCompliance));

		return () => {
			mounted = false;
		};
	}, [showCompliance]);

	useEffect(() => {
		let theader = [];
		let allsummary = [];

		if (!isEmpty(dashboardCourseState.courseDashboardAllSummaryHeader)) {
			theader = dashboardCourseState.courseDashboardAllSummaryHeader;
		}
		if (!isEmpty(dashboardCourseState.courseDashboardAllSummary)) {
			allsummary = dashboardCourseState.courseDashboardAllSummary;
		}

		let course_wise_report_list = {
			theader: theader,
			allsummary: allsummary
		};

		setCourseWiseReportList(course_wise_report_list);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		dashboardCourseState.dashboardCourseState,
		dashboardCourseState.courseDashboardAllSummary
	]);

  const refreshOfficeWiseSummary = (showCompliance) => {
    dispatch(getcourseDashboardOfficeWiseSummary(showCompliance));
  }

  const refreshCourseWiseSummary = (showCompliance) => {
    dispatch(getcourseDashboardCourseWiseSummary(showCompliance));
  }

	return (
		<Page className={classes.root} title="Course Dashboard">
			<Header />
			<Grid className={classes.container} container spacing={2}>
				<Grid item xs={12}>
					<Card>
						<CardActions style={{ paddingBottom: '0px' }}>
							<Typography>
								<b>Show Compliance </b>
							</Typography>
							<Switch
								checked={showCompliance}
								onChange={handleChange}
								color="primary"
								name="showCompliance"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</CardActions>
						<CardContent>
							<Grid container spacing={2}>
								<Grid item lg={4} md={4} sm={4} xs={12}>
									<CourseOffices 
                    showCompliance={showCompliance}
                    refreshOfficeWiseSummary={refreshOfficeWiseSummary}
                  />
								</Grid>
								<Grid item lg={8} md={8} sm={8} xs={12}>
									{
										<CourseWiseReport
                      showCompliance={showCompliance}
                      refreshCourseWiseSummary={refreshCourseWiseSummary}
											theaderData={courseWiseReportList.theader}
											allsummaryData={courseWiseReportList.allsummary}
										/>
									}
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Page>
	);
};

export default DashboardCourse;
