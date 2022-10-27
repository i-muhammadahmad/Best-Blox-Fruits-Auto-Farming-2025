import React, { useEffect } from 'react';
import {
  makeStyles,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import HistoryIcon from '@material-ui/icons/History';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
} from '@material-ui/lab';
import { assestsHistoryListById } from 'actions';

const useStyles = makeStyles(theme => ({
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  paper: {
    padding: '6px 16px'
  }
}));

const HistoryTimeline = (props) => {
  const {id, ...rest} = props;
  const classes = useStyles();
  const assetsHistoryState = useSelector(state => state.assetsHistoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(assestsHistoryListById(id))
  }, []);

  return (
    <Card className={classes.projectDetails}>
      <CardHeader title="Asset Update History" />
      <CardContent>
        <Timeline>
          {assetsHistoryState.assetsHistoryList.map((data) => (
            <TimelineItem key={data.id}>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <HistoryIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    {data.date_created}
                  </Typography>
                  <Typography>{data.log+" by "+data.created_by_user.email}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            ))
          }
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default HistoryTimeline;
