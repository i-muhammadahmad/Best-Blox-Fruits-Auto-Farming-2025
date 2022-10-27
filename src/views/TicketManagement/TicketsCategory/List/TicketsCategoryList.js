import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip } from 'components';
import { Header, Results } from './components';
import {
  deleteTicketsCategory,
  getTicketsCategoryById,
} from 'actions';
import { forEach } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useRouter from 'utils/useRouter';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessRights from 'utils/AccessRights';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
}));

const TicketsCategoryList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [extraFiltersState, setExtraFiltersState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [ticketsCategoryId, setTicketsCategoryId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const ticketsCategoryState = useSelector(state => state.ticketsCategoryState);
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
    if (ticketsCategoryState.showUpdateForm) {
      router.history.push('/tickets-category/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketsCategoryState.showUpdateForm]);

  useEffect(() => {
    if (ticketsCategoryState.showViewPage) {
      router.history.push('/tickets-category/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketsCategoryState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteTicketsCategory(ticketsCategoryId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setTicketsCategoryId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setTicketsCategoryId('')
  }

  const updateRecord = (id) => {
    dispatch(getTicketsCategoryById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getTicketsCategoryById(id, 'view'))
  }

  const getActions = (value) => {
    return (
      <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
        {(AccessRights(session.current_page_permissions, 'edit', value.created_by) && value.is_deleted == 'n') ?
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
        {(AccessRights(session.current_page_permissions, 'view', value.created_by)) ?
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
        {(AccessRights(session.current_page_permissions, 'delete', value.created_by) && value.is_deleted == 'n') ?
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

  const getDeletedStatus = value => {
    if (value.is_deleted === 'n') {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bsuccess" label="Active" />
        </div>
      )
    }
    else {
      return (
        <div className={'actionClass'} style={{ whiteSpace: 'nowrap' }}>
          <StyledChip color="bdanger" label="Deleted" />
        </div>
      )
    }
  }

  return (
    <Page
      className={classes.root}
      title="Tickets Category List"
    >
      <Header />
      <Results
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        getDeletedStatus={getDeletedStatus}
      />
      <DeleteAlert
        title="Ticket Category Delete"
        alertText="Are you sure, You want delete this Ticket Category?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default TicketsCategoryList;
