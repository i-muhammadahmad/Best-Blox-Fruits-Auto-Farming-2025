import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert, StyledFab, StyledChip } from 'components';
import { Header, Results } from './components';
import {
  deleteCompanyContact,
  getCompanyContactById,
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

const CompanyContactList = () => {
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
  const [companyContactId, setCompanyContactId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const companyContactState = useSelector(state => state.companyContactState);
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
    if (companyContactState.showUpdateForm) {
      router.history.push('/company-contact/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyContactState.showUpdateForm]);

  useEffect(() => {
    if (companyContactState.showViewPage) {
      router.history.push('/company-contact/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyContactState.showViewPage]);

  const deleteRecord = async () => {
    await dispatch(deleteCompanyContact(companyContactId, session.current_page_permissions.object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setCompanyContactId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setCompanyContactId('')
  }

  const updateRecord = (id) => {
    dispatch(getCompanyContactById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getCompanyContactById(id, 'view'))
  }

  const getEmailHtml = (value) => {
    let contact_email = JSON.parse(value.contact_email);
    return (
      <div>
        {(contact_email)?
          contact_email.map((cemail, eindex) => (
            <div key={eindex}>
              {cemail}
            </div> 
          ))
          : ''
        }  
      </div> 
    );
  }

  const getPhoneHtml = (value) => {
    let contact_phoneno = JSON.parse(value.contact_phoneno);
    return (
      <div>
        {(contact_phoneno)?
          contact_phoneno.map((cphone, pindex) => (
            <div key={pindex}>
              {cphone}
            </div> 
          ))
          : ''
        }  
      </div> 
    );
  }

  const getActions = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(AccessRights(session.current_page_permissions, 'edit', value.created_by) && value.is_deleted == 'n') ?
          <><StyledFab
            color="bprimary"
            aria-label="Edit"
            size="small"
            onClick={() => updateRecord(value.id)}
          >
            <EditIcon />
          </StyledFab>&nbsp;</>
          :''
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
          :''
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
      title="Company Contact List"
    >
      <Header />
      <Results
        className={classes.results}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
        getPhoneHtml={getPhoneHtml}
        getEmailHtml={getEmailHtml}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        getDeletedStatus={getDeletedStatus}
      />
      <DeleteAlert
        title="Company Contact Delete"
        alertText="Are you sure, You want delete this Company Contact?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel}
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}
      />
    </Page>
  );
};

export default CompanyContactList;
