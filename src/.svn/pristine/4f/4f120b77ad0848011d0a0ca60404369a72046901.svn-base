import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import useRouter from 'utils/useRouter'; 
import { StyledButton, DeleteAlert, StyledFab } from 'components';
import { Results, AddUpdateForm, MeetingNoteView } from './components';
import {
  Grid,
} from '@material-ui/core';
import {
  deleteMeetingNotes,
  getMeetingNotesById,
  showCommonLoader,
  hideCommonLoader
} from 'actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { isEmpty, forEach, find, filter } from 'lodash';
import moment from 'moment';
import VisibilityIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles((theme) => ({
  root: {},
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const MeetingNotes = props => {
  const { activeTab, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const meetingNotesState = useSelector(state => state.meetingNotesState);
  const clientState = useSelector(state => state.clientState);
  const session = useSelector(state => state.session);

  //finding meeting notes permissions against code
  const meeting_note_per = filter(session.user_Permissions, function(item){
    if(!isEmpty(item.permission_object)){
      return item.permission_object.object_code === 'meeting_notes';
    }
  });

  const [refershDataTable, setRefershDataTable] = useState(false);
  const [meetingNoteId, setMeetingNoteId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const [formAction, setFormAction] = useState('Add');

  useEffect(() => {
    if (!clientState.showUpdateForm) {
      router.history.push('/client');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientState.showUpdateForm]);

  useEffect(() => {
    if (clientState.redirect_to_list) {
      router.history.push('/client');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientState.redirect_to_list]);
  
  const getActions = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(meeting_note_per[0].rights_edit == '1') ?
          <><StyledFab
            color="bprimary"
            aria-label="Edit"
            size="small"
            onClick={() => updateRecord(value.id)}
          >
            <EditIcon />
          </StyledFab>&nbsp;</>
          : ''
        }
        { (meeting_note_per[0].rights_view == '1')? 
          <><StyledFab
            color="bwarning"
            aria-label="View"
            size="small"
            onClick={() => viewRecord(value.id)}
          >
            <VisibilityIcon />
          </StyledFab>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
          :''
        }
        {(meeting_note_per[0].rights_delete == '1') ?
          <StyledFab
            color="bdanger"
            aria-label="edit"
            size="small"
            onClick={() => showDeleteModal(value.id)}
          >
            <DeleteIcon size="small" />
          </StyledFab>
          : ''
        }
      </div>
    )
  }

  const deleteRecord = async () => {
    await dispatch(deleteMeetingNotes(meetingNoteId, meeting_note_per[0].object_id, clientState.clientRecord.id))
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setMeetingNoteId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setMeetingNoteId('')
  }

  const updateRecord = (id) => {
    dispatch(getMeetingNotesById(id, 'update'))
    setFormAction('Update');
  }

  const viewRecord = (id) => {
    dispatch(getMeetingNotesById(id, 'view'))
  }  

  const showPages = (type = 'list') => {
    if(type === 'list'){
      if(
        meetingNotesState.redirect_to_list 
        || (!meetingNotesState.showUpdateForm && !meetingNotesState.showViewPage)
      ){
        return true;
      }
    }
    else if(type === 'form'){
      if(meetingNotesState.showUpdateForm){
        return true;
      }
    }
    else if(type === 'view'){
      if(meetingNotesState.showViewPage){
        return true;
      }
    }
    return false;
  }

  return (
    <div style={{ marginTop: '25px' }}>
      <div className={classes.formGroup}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {(showPages('list'))?
              <Results
                className={classes.results}
                refershDataTable={refershDataTable}
                setRefershDataTable={setRefershDataTable}
                actionsCol={getActions}
                setFormAction={setFormAction}
                extraFeilds={{client_id: clientState.clientRecord.id}}
              />
            :''}
            {(showPages('form'))?
              <AddUpdateForm
                formAction={formAction}
                setFormAction={setFormAction}
              />
            :''}
            {(showPages('view'))?
              <MeetingNoteView />
            :''}
          </Grid>
        </Grid> 
        <DeleteAlert
          title="Delete Meeting Note"
          alertText="Are you sure, You want delete this meeting note?"
          deleteCallback={deleteRecord}
          modalOpen={openDeleteModel}
          handleModalOpen={setOpenDeleteModel}
          onModelClose={hideDeleteModel}
        />
      </div>
    </div>
  );
};

export default MeetingNotes;
