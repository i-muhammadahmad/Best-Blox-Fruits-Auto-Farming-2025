import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  rolesListFetch
} from 'actions';
import { isEmpty, includes, find, isArray, forEach } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {}
}));

const RoleDropdown = props => {
  const { RoleValue, setRoleValue, selectedId, roleOnChange, id, name, size, renderInput,showSelectAllOption, ...attr } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const rolesState = useSelector(state => state.rolesState);
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {

    dispatch(rolesListFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* useEffect(() => {
    if (rolesState.rolesList) {
      if(!isEmpty(selectedId)) {
        if (isArray(selectedId)) {
          let sdep = [];
          forEach(selectedId, function (value, key) {
            let item = find(rolesState.rolesList, ['id', value]);
            if (!isEmpty(item)) {
              sdep.push(item);
            }
          });
          setRoleValue(sdep);

        }
        else {
          let selected_dep = find(rolesState.rolesList, ['id', selectedId]);
          if(!isEmpty(selected_dep)){
            setRoleValue(selected_dep);
          }
          else{
            setRoleValue(null);
          }
        }

      }
      let role_list = {
        ...rolesState.rolesList
      }
      role_list = Object.values(role_list);

      if (attr.multiple === true && !isEmpty(role_list) && showSelectAllOption === true) {
        let first = {
          id: 'all',
          name: 'All',
        }
        role_list.unshift(first);
      }

      setRoleList(Object.values(role_list));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesState.rolesList]); */

  useEffect(() => {
    if (rolesState.rolesList) {

      let first = {
        id: 'all',
        name: 'All'
      }
      if (!isEmpty(selectedId)) {
        if (isArray(selectedId)) {
          let srole = [];
          forEach(selectedId, function (value, key) {
            if(value === 'all'){
              srole.push(first);
            }
            else{
              let item = find(rolesState.rolesList, ['id', value]);
              if (!isEmpty(item)) {
                srole.push(item);
              }
            }  
          });
          setRoleValue(srole);

        }
        else {
          if(selectedId === 'all'){
            setRoleValue(first);
          }
          else{
            let selected_role = find(rolesState.rolesList, ['id', selectedId]);
            if(!isEmpty(selected_role)){
              setRoleValue(selected_role);
            }
            else{
              setRoleValue(null);
            }
          }  
        }
      }

      let role_list = {
        ...rolesState.rolesList
      }
      role_list = Object.values(role_list);

      if (attr.multiple === true && !isEmpty(role_list)) {
        
        role_list.unshift(first);
      }

      setRoleList(Object.values(role_list));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesState.rolesList]);

  return (
    <>
      {(roleList) ?
        <Autocomplete
          value={RoleValue}
          onChange={(event, newValue) => {
            roleOnChange(event, newValue)
          }}
          options={roleList}
          getOptionLabel={(option) => option.name}
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

RoleDropdown.propTypes = {
  roleOnChange: PropTypes.any.isRequired,
  renderInput: PropTypes.any.isRequired
};

RoleDropdown.defaultProps = {
  RoleValue: [],
  id: 'role_id',
  name: 'role_id',
  size: 'small',
  selectedId: '',
  showSelectAllOption: true
};

export default RoleDropdown;
