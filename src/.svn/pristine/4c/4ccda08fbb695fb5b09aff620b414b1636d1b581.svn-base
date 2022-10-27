import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    departmentsDropdownListFetch
} from 'actions';
import { isEmpty, includes, isArray, forEach, find } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {}
}));

const DepartmentDropdown = props => {
  const { officesIds, DepartmentValue, setDepartmentValue, selectedId, selectedChangingId, departmentOnChange, id, name, size, renderInput, ...attr } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const departmentsState = useSelector(state => state.departmentsState);
  const session = useSelector(state => state.session);
  const [departmentList, setDepartmentList] = useState([]);
  const [offIds, setOffIds] = useState(officesIds);
  const [sCId, setSCId] = useState(selectedChangingId);

  useEffect(() => {
    let offices_ids = [];
    if(!includes(offIds, 'all')){
      offices_ids = offIds
    }

    dispatch(departmentsDropdownListFetch(offices_ids, session.current_page_permissions.object_id))  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSCId(selectedChangingId);
  }, [selectedChangingId]);

  useEffect(() => {
    if (departmentsState.departmentsDropdownList) {

      let checkSelectAll = false;
      if (!isEmpty(sCId)) {
        if (isArray(sCId)) {
          let sdepartment = [];
          forEach(sCId, function (value, key) {
            let item = find(departmentsState.departmentsDropdownList, ['id', value]);
            if (!isEmpty(item)) {
              sdepartment.push(item);
            }
          });
          setDepartmentValue(sdepartment);

        }
        else {
          let selected_department = find(departmentsState.departmentsDropdownList, ['id', sCId]);
          if(!isEmpty(selected_department)){
            setDepartmentValue(selected_department);
          }
          else{
            setDepartmentValue(null);
          }
        }
      }
    }  
  }, [sCId]);

  useEffect(() => {
    setOffIds(officesIds);
  }, [officesIds]);

  useEffect(() => {
    let offices_ids = [];
    if(!includes(offIds, 'all')){
      offices_ids = offIds
    }

    dispatch(departmentsDropdownListFetch(offices_ids, session.current_page_permissions.object_id))  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offIds]);

  useEffect(() => {
    if (departmentsState.departmentsDropdownList) {

      let first = {
        id: 'all',
        name: 'All'
      }
      if (!isEmpty(selectedId)) {
        if (isArray(selectedId)) {
          let sdepartment = [];
          forEach(selectedId, function (value, key) {
            if(value === 'all'){
              sdepartment.push(first);
            }
            else{
              let item = find(departmentsState.departmentsDropdownList, ['id', value]);
              if (!isEmpty(item)) {
                sdepartment.push(item);
              }
            }  
          });
          setDepartmentValue(sdepartment);

        }
        else {
          if(selectedId === 'all'){
            setDepartmentValue(first);
          }
          else{
            let selected_department = find(departmentsState.departmentsDropdownList, ['id', selectedId]);
            if(!isEmpty(selected_department)){
              setDepartmentValue(selected_department);
            }
            else{
              setDepartmentValue(null);
            }
          }  
        }
      }

      let department_list = {
        ...departmentsState.departmentsDropdownList
      }
      department_list = Object.values(department_list);

      if (attr.multiple === true && !isEmpty(department_list)) {
        
        department_list.unshift(first);
      }

      setDepartmentList(Object.values(department_list));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentsState.departmentsDropdownList]);

  return (
    <>
      {(departmentList) ?
        <Autocomplete
          value={DepartmentValue}
          onChange={(event, newValue) => {
            departmentOnChange(event, newValue)
          }}
          options={departmentList}
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

DepartmentDropdown.propTypes = {
  departmentOnChange: PropTypes.any.isRequired,
  renderInput: PropTypes.any.isRequired
};

DepartmentDropdown.defaultProps = {
  officesIds: [],
  DepartmentValue: [],
  id: 'department_id',
  name: 'department_id',
  size: 'small',
  selectedId: '',
  selectedChangingId: ''
};

export default DepartmentDropdown;
