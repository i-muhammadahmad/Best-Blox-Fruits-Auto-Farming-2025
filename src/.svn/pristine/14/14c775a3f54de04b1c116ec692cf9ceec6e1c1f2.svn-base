/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { DeleteAlert, StyledButton } from 'components';
import { useSelector } from 'react-redux';
import AccessRights from 'utils/AccessRights';

const ViewActionButtons = props => {
  const { btnToShow, deleteRecord, updateRecord, closeView, viewRecord, currentRecord, ...rest } = props;

  const session = useSelector(state => state.session);

  return (
    <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
      {(
        AccessRights(session.current_page_permissions, 'edit', currentRecord.created_by) 
        && currentRecord.is_deleted == 'n'
        && btnToShow.includes('edit')
      ) ?
        <> &nbsp; <StyledButton
          color="bprimary"
          aria-label="Edit"
          size="small"
          onClick={() => updateRecord()}
        >
          <EditIcon /> Update &nbsp;
        </StyledButton></>
        : ''
      }
      {(
        AccessRights(session.current_page_permissions, 'view', currentRecord.created_by)
        && btnToShow.includes('view')) ?
        <> &nbsp; <StyledButton
          color="bwarning"
          aria-label="Edit"
          size="small"
          onClick={() => viewRecord()}
        >
          <VisibilityIcon /> View Details &nbsp;
        </StyledButton></>
        : ''
      }
      {(btnToShow.includes('close')) ?
        <> &nbsp; <StyledButton
          variant="contained"
          color="blight"
          size="small"
          onClick={ ()=>{ closeView() } }
          startIcon={<CancelIcon />}
        >
          CLOSE 
        </StyledButton></>
        : ''
      }
      {(
        AccessRights(session.current_page_permissions, 'delete', currentRecord.created_by) 
        && currentRecord.is_deleted == 'n'
        && btnToShow.includes('delete')
      ) ?
        <>  &nbsp; &nbsp; <StyledButton
          color="bdanger"
          aria-label="edit"
          size="small"
          onClick={() => deleteRecord()}
        >
          <DeleteIcon size="small" /> Delete &nbsp;
        </StyledButton></>
        : ''
      }
      
    </div>    
  );
};

ViewActionButtons.defaultProps = {
  btnToShow: ['edit', 'delete', 'close'],
  deleteRecord: () => { /*nothing to do*/ },
  updateRecord: () => { /*nothing to do*/ },
  viewRecord: () => { /*nothing to do*/ },
  closeView: () => { /*nothing to do*/ },
  currentRecord: {}
};


export default ViewActionButtons;
