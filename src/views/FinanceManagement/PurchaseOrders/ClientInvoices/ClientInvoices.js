import React, { useState, useEffect } from 'react';
import { API_URL } from 'configs'
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import useRouter from 'utils/useRouter'; 
import { StyledButton, DeleteAlert, StyledFab } from 'components';
import { Results, AddUpdateForm, ClientInvoiceView } from './components';
import {
  Grid,
} from '@material-ui/core';
import {
  deleteClientInvoices,
  getClientInvoicesById,
  showCommonLoader,
  hideCommonLoader,
  getCurPeriodInvoice
} from 'actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { isEmpty, forEach, find, filter } from 'lodash';
import moment from 'moment';
import VisibilityIcon from '@material-ui/icons/Visibility'
import FileDownloadIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
  root: {},
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const ClientInvoices = props => {
  const { activeTab, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const clientInvoicesState = useSelector(state => state.clientInvoicesState);
  const clientState = useSelector(state => state.clientState);
  const session = useSelector(state => state.session);

  //finding client invoices permissions against code
  const client_invoice_per = filter(session.user_Permissions, function(item){
    if(!isEmpty(item.permission_object)){
      return item.permission_object.object_code === 'client_invoices';
    }
  });

  const [refershDataTable, setRefershDataTable] = useState(false);
  const [clientInvoiceId, setClientInvoiceId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const [formAction, setFormAction] = useState('Add');

  useEffect(() => {
    dispatch(getCurPeriodInvoice(clientState.clientRecord.id, client_invoice_per[0].object_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {(client_invoice_per[0].rights_edit == '1') ?
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
        { (client_invoice_per[0].rights_view == '1')? 
          <><StyledFab
            color="bwarning"
            aria-label="View"
            size="small"
            onClick={() => viewRecord(value.id)}
          >
            <VisibilityIcon />
          </StyledFab>&nbsp;</>
          :''
        }
        { (client_invoice_per[0].rights_view == '1' && !isEmpty(value.attachment_url))? 
          <><StyledFab
            color="bgrey"
            aria-label="View"
            size="small"
          >
            <a 
              style={{color: 'white', height: '25px'}}
              href={API_URL + value.attachment_url} download>
              <FileDownloadIcon />
            </a>
          </StyledFab>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
          :''
        }
        {(client_invoice_per[0].rights_delete == '1') ?
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
    await dispatch(deleteClientInvoices(clientInvoiceId, client_invoice_per[0].object_id, clientState.clientRecord.id))
    await dispatch(getCurPeriodInvoice(clientState.clientRecord.id, client_invoice_per[0].object_id));
    setRefershDataTable(true);
  }

  const showDeleteModal = (id) => {
    setClientInvoiceId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setClientInvoiceId('')
  }

  const updateRecord = (id) => {
    dispatch(getClientInvoicesById(id, 'update'))
    setFormAction('Update');
  }

  const viewRecord = (id) => {
    dispatch(getClientInvoicesById(id, 'view'))
  }  

  const showPages = (type = 'list') => {
    if(type === 'list'){
      if(
        clientInvoicesState.redirect_to_list 
        || (!clientInvoicesState.showUpdateForm && !clientInvoicesState.showViewPage)
      ){
        return true;
      }
    }
    else if(type === 'form'){
      if(clientInvoicesState.showUpdateForm){
        return true;
      }
    }
    else if(type === 'view'){
      if(clientInvoicesState.showViewPage){
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
              <ClientInvoiceView />
            :''}
          </Grid>
        </Grid> 
        <DeleteAlert
          title="Delete Client Invoice"
          alertText="Are you sure, You want delete this client invoice?"
          deleteCallback={deleteRecord}
          modalOpen={openDeleteModel}
          handleModalOpen={setOpenDeleteModel}
          onModelClose={hideDeleteModel}
        />
      </div>
    </div>
  );
};

export default ClientInvoices;
