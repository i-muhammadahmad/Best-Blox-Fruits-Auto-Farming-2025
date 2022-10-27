import React, { useEffect } from 'react';
import useRouter from 'utils/useRouter';
import {
  Paper,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

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
  }
}));

const QuizSetupDisplay = () => {
  const classes = useStyles();
  const router = useRouter();
  const quizSetupState = useSelector(state => state.quizSetupState);
  const dispatch = useDispatch();

  return (
    <>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Course Setup View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Course Name </TableCell>
                  <TableCell>{quizSetupState.quizSetupRecord.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Course Category </TableCell>
                  <TableCell>{
                    !isEmpty(quizSetupState.quizSetupRecord.course_category) ?
                      quizSetupState.quizSetupRecord.course_category.opt_display : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Course Level </TableCell>
                  <TableCell>{
                    !isEmpty(quizSetupState.quizSetupRecord.quiz_level) ?
                      quizSetupState.quizSetupRecord.quiz_level.opt_display : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Certificate Emails </TableCell>
                  <TableCell>{quizSetupState.quizSetupRecord.certificate_emails}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Is Published </TableCell>
                  <TableCell>{(quizSetupState.quizSetupRecord.is_published === 'y')? 'Yes':'No'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(quizSetupState.quizSetupRecord.created_by_user) ?
                      quizSetupState.quizSetupRecord.created_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{quizSetupState.quizSetupRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(quizSetupState.quizSetupRecord.updated_by_user) ?
                      quizSetupState.quizSetupRecord.updated_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{quizSetupState.quizSetupRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Course Setup Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: quizSetupState.quizSetupRecord.description }}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default QuizSetupDisplay;