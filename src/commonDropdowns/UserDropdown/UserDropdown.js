import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  usersDropdownListFetch
} from 'actions';
import { isEmpty, includes, isArray, forEach, find } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {}
}));

const UserDropdown = props => {
  const { officesIds, clientIds, UserValue, setUserValue, selectedId, selectedChangingId, userOnChange, id, name, size, renderInput, ...attr } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const usersState = useSelector(state => state.usersState);
  const session = useSelector(state => state.session);
  const [userList, setUserList] = useState([]);
  const [offIds, setOffIds] = useState(officesIds);
  const [campIds, setCampIds] = useState(clientIds);
  const [sCId, setSCId] = useState(selectedChangingId);

  useEffect(() => {
    let offices_ids = [];
    if(!includes(offIds, 'all')){
      offices_ids = offIds
    }
    
    let client_ids = [];
    if(!includes(campIds, 'all')){
      client_ids = campIds
    }

    dispatch(usersDropdownListFetch(session.current_page_permissions.object_id, offices_ids, client_ids))  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSCId(selectedChangingId);
  }, [selectedChangingId]);

  useEffect(() => {
    if (usersState.usersDropdownList) {

      let checkSelectAll = false;
      if (!isEmpty(sCId)) {
        if (isArray(sCId)) {
          let suser = [];
          forEach(sCId, function (value, key) {
            let item = find(usersState.usersDropdownList, ['id', value]);
            if (!isEmpty(item)) {
              suser.push(item);
            }
          });
          setUserValue(suser);

        }
        else {
          let selected_user = find(usersState.usersDropdownList, ['id', sCId]);
          if(!isEmpty(selected_user)){
            setUserValue(selected_user);
          }
          else{
            setUserValue(null);
          }
        }
      }
    }  
  }, [sCId]);

  useEffect(() => {
    setOffIds(officesIds);
  }, [officesIds]);

  useEffect(() => {
    setCampIds(clientIds);
  }, [clientIds]);

  useEffect(() => {
    let offices_ids = [];
    if(!includes(offIds, 'all')){
      offices_ids = offIds
    }
    
    let client_ids = [];
    if(!includes(campIds, 'all')){
      client_ids = campIds
    }

    dispatch(usersDropdownListFetch(session.current_page_permissions.object_id, offices_ids, client_ids))  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offIds, campIds]);

  useEffect(() => {
    if (usersState.usersDropdownList) {

  
      let first = {
        id: 'all',
        email: 'All',
        employee_name: 'All'
      }
      if (!isEmpty(selectedId)) {
        if (isArray(selectedId)) {
          let suser = [];
          forEach(selectedId, function (value, key) {
            if(value === 'all'){
              suser.push(first);
            }
            else{
              let item = find(usersState.usersDropdownList, ['id', value]);
              if (!isEmpty(item)) {
                suser.push(item);
              }
            }  
          });
          setUserValue(suser);

        }
        else {
          if(selectedId === 'all'){
            setUserValue(first);
          }
          else{
            let selected_user = find(usersState.usersDropdownList, ['id', selectedId]);
            if(!isEmpty(selected_user)){
              setUserValue(selected_user);
            }
            else{
              setUserValue(null);
            }
          }  
        }
      }

      let user_list = {
        ...usersState.usersDropdownList
      }
      user_list = Object.values(user_list);

      if (attr.multiple === true && attr.showall === true && !isEmpty(user_list)) {
        
        user_list.unshift(first);
      }

      setUserList(Object.values(user_list));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersState.usersDropdownList]);

  return (
    <>
      {(userList) ?
        <Autocomplete
          value={UserValue}
          onChange={(event, newValue) => {
            userOnChange(event, newValue)
          }}
          options={userList}
          getOptionLabel={(option) => !isEmpty(option.employee_name) ? option.employee_name : option.email}
          id={id}
          size={size}
          name={name}
          renderInput={renderInput}
          {...attr}
        />

        : ''}
    </>
  );
}

UserDropdown.propTypes = {
  userOnChange: PropTypes.any.isRequired,
  renderInput: PropTypes.any.isRequired
};

UserDropdown.defaultProps = {
  officesIds: [],
  clientIds: [],
  UserValue: [],
  id: 'user_id',
  name: 'user_id',
  size: 'small',
  selectedId: '',
  selectedChangingId: '',
  showAll: true
};

export default UserDropdown;
