import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, DeleteAlert,StyledFab } from 'components';
import { Header, Results } from './components';
import { 
  errorSeverityListFetch,
  deleteErrorSeverity,
  getErrorSeverityById,
} from 'actions';
import { forEach } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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

const ErrorSeverityList = () => {
  const classes = useStyles();

  const router = useRouter();
  const dispatch = useDispatch();
  const [errorSeverity, setErrorSeverity] = useState([]);
  const [errorSeverityId, setErrorSeverityId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const auditErrorSeverityState = useSelector(state => state.auditErrorSeverityState);
  const session = useSelector(state => state.session);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(errorSeverityListFetch())
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let infraction_list = [];
    forEach(auditErrorSeverityState.errorSeverityList, function(value, key) {
      let actions = getActions(value);
      value['Actions'] = actions
      value['created_by_user_name'] = (value.created_by_user)? value.created_by_user.email:''; 
      value['description_html'] = (value.description)? value.description.replace(/(<([^>]+)>)/gi, "").substring(0,200) : '';
      value['updated_by_user_name'] = (value.updated_by_user)? value.updated_by_user.email:''
      value['client_name'] = (value.client)? value.client.opt_display:''
      infraction_list[key] = value
    });
    setErrorSeverity(infraction_list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditErrorSeverityState.errorSeverityList])

  useEffect(()=> {
    if(auditErrorSeverityState.showUpdateForm){
      router.history.push('/activity-audit/error-severity/update');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auditErrorSeverityState.showUpdateForm]);

  useEffect(()=> {
    if(auditErrorSeverityState.showViewPage){
      router.history.push('/activity-audit/error-severity/view');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auditErrorSeverityState.showViewPage]);

  const deleteRecord = () => {
    dispatch(deleteErrorSeverity(errorSeverityId, session.current_page_permissions.object_id))
  }

  const showDeleteModal = (id) => {
    setErrorSeverityId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setErrorSeverityId('')
  }

  const updateRecord = (id) => {
    dispatch(getErrorSeverityById(id, 'update'))
  }

  const viewRecord = (id) => {
    dispatch(getErrorSeverityById(id, 'view'))
  }

  const getActions = value => {
    return(
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        { (session.current_page_permissions.rights_edit == '1')? 
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
        { (session.current_page_permissions.rights_view == '1')? 
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
        { (session.current_page_permissions.rights_delete == '1')?
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

  return (
    <Page
      className={classes.root}
      title="Audit Error Severity List"
    >
      <Header />
      {errorSeverity && (
        <Results
          className={classes.results}
          errorSeverity={errorSeverity}
        />
      )}
      <DeleteAlert 
        title="Audit Error Severity Delete" 
        alertText="Are you sure, You want delete this ErrorSeverity?"
        deleteCallback={deleteRecord}
        modalOpen={openDeleteModel} 
        handleModalOpen={setOpenDeleteModel}
        onModelClose={hideDeleteModel}  
      />
    </Page>
  );
};

export default ErrorSeverityList;
