import React, { useEffect } from 'react';
import { Page } from 'components';
import useRouter from 'utils/useRouter';
import {
  Header
} from './components';
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

const TranscribeConfigView = () => {
  const classes = useStyles();
  const router = useRouter();
  const transcribeConfigState = useSelector(state => state.transcribeConfigState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (transcribeConfigState.redirect_to_list) {
      router.history.push('/transcribe-config');
    }
  }, [transcribeConfigState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!transcribeConfigState.showViewPage) {
      router.history.push('/transcribe-config');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcribeConfigState.showViewPage]);

  return (
    <Page
      className={classes.root}
      title="Transcribe Config View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Transcribe Config View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > MIS Client Name </TableCell>
                  <TableCell>{(transcribeConfigState.transcribeConfigRecord.mis_client) ? transcribeConfigState.transcribeConfigRecord.mis_client.client_name : ''}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > FTP Server </TableCell>
                  <TableCell>{transcribeConfigState.transcribeConfigRecord.ftp_server}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > FTP Port </TableCell>
                  <TableCell>{transcribeConfigState.transcribeConfigRecord.ftp_port}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > FTP Username </TableCell>
                  <TableCell>{transcribeConfigState.transcribeConfigRecord.ftp_username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Is Dailing Client </TableCell>
                  <TableCell>{(transcribeConfigState.transcribeConfigRecord.is_dialing_client === 1)?'Yes': 'No'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Folder Url </TableCell>
                  <TableCell>{transcribeConfigState.transcribeConfigRecord.folder_url}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Limit File Size </TableCell>
                  <TableCell>{(transcribeConfigState.transcribeConfigRecord.limit_file_size === 1)?'Yes': 'No'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Transcript Min Size Limit </TableCell>
                  <TableCell>{transcribeConfigState.transcribeConfigRecord.transcript_min_size_limit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Transcript Max Size Limit </TableCell>
                  <TableCell>{transcribeConfigState.transcribeConfigRecord.transcript_max_size_limit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Transcript Percentage </TableCell>
                  <TableCell>{transcribeConfigState.transcribeConfigRecord.transcript_percentage}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Is Enabled </TableCell>
                  <TableCell>{(transcribeConfigState.transcribeConfigRecord.is_active === 'y')?'Yes': 'No'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(transcribeConfigState.transcribeConfigRecord.created_by_user) ?
                      transcribeConfigState.transcribeConfigRecord.created_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{transcribeConfigState.transcribeConfigRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(transcribeConfigState.transcribeConfigRecord.updated_by_user) ?
                      transcribeConfigState.transcribeConfigRecord.updated_by_user.email : ''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{transcribeConfigState.transcribeConfigRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="TranscribeConfig Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: transcribeConfigState.transcribeConfigRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default TranscribeConfigView;