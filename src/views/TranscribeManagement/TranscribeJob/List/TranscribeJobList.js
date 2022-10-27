import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, StyledFab } from 'components';
import { Header, Results } from './components';
import {
  getTranscribeJobById,
} from 'actions';
import { forEach } from 'lodash';
import useRouter from 'utils/useRouter';
import VisibilityIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
}));

const TranscribeJobList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [transcribeJob, setTranscribeJob] = useState([]);
  const [transcribeJobId, setTranscribeJobId] = useState('');
  const transcribeJobState = useSelector(state => state.transcribeJobState);
  const session = useSelector(state => state.session);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (transcribeJobState.showViewPage) {
      router.history.push('/transcribe-job/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcribeJobState.showViewPage]);


  const viewRecord = (id) => {
    dispatch(getTranscribeJobById(id, 'view'))
  }

  const getActions = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(session.current_page_permissions.rights_view == '1') ?
          <><StyledFab
            color="bwarning"
            aria-label="View"
            size="small"
            onClick={() => viewRecord(value.id)}
          >
            <VisibilityIcon />
          </StyledFab>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
          : ''
        }
      </div>
    )
  }

  return (
    <Page
      className={classes.root}
      title="Transcribe Job List"
    >
      <Header />
      <Results
        className={classes.results}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
      />
    </Page>
  );
};

export default TranscribeJobList;
