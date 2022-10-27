import React from 'react';
import { API_URL } from 'configs';
import CancelIcon from '@material-ui/icons/Cancel';
import { 
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Grid,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';
import {
  redirectToMeetingNotesList
} from 'actions'
import { useSelector, useDispatch } from 'react-redux';
import { StyledButton } from 'components';
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


const MeetingNoteView = (props) => {
  const { 
    ...rest
  } = props;

  const classes = useStyles();
  const meetingNotesState = useSelector(state => state.meetingNotesState);
  const dispatch = useDispatch();

  return (
    <div>
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
        </Grid>
        <Grid item>
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={ ()=>{ dispatch(redirectToMeetingNotesList()) } }
              startIcon={<CancelIcon />}
            >
              CLOSE
          </StyledButton>
        </Grid>
      </Grid>    
      <Card style={{marginTop:'10px'}}>
        <CardHeader
          title={"Meeting Notes Details"}
        />
        <Divider />
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > Meeing Type </TableCell>
                      <TableCell>{ meetingNotesState.meetingNotesRecord.type }</TableCell>
                    </TableRow>
                    <TableRow>  
                      <TableCell variant="head" > Meeting Date </TableCell>
                      <TableCell>{meetingNotesState.meetingNotesRecord.date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Meeting Time </TableCell>
                      <TableCell>{meetingNotesState.meetingNotesRecord.time}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>  
            <Grid item xs={12} sm={6}>  
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > Created By </TableCell>
                      <TableCell>{
                        !isEmpty(meetingNotesState.meetingNotesRecord.created_by_user)?
                        meetingNotesState.meetingNotesRecord.created_by_user.email:''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" style={{whiteSpace:'nowrap'}} > Created At </TableCell>
                      <TableCell>{meetingNotesState.meetingNotesRecord.date_created}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated By </TableCell>
                      <TableCell>{
                        !isEmpty(meetingNotesState.meetingNotesRecord.updated_by_user)?
                        meetingNotesState.meetingNotesRecord.updated_by_user.email:''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" style={{whiteSpace:'nowrap'}} > Last Updated At </TableCell>
                      <TableCell>{meetingNotesState.meetingNotesRecord.date_last_modified}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>  
        </CardContent>
      </Card>   
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Meeting Notes" />
        <Divider />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: meetingNotesState.meetingNotesRecord.notes }}
          />
        </CardContent>  
      </Card>
    </div>
  );
}

export default MeetingNoteView;