import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, Popper, ButtonGroup, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { filter } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {}
}));

const ApprovalProfileDropdown = props => {
  const { office_id, approvalProfileValue, approvalProfileOnChange, id, name, renderInput, ...attr } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const approvalProfilesState = useSelector(state => state.approvalProfilesState);
  const [approvalProfileList, setApprovalProfileList] = useState([]);

  useEffect(() => {
    if (approvalProfilesState.approvalProfilesDropdownList) {
      let filtered_list = filter(approvalProfilesState.approvalProfilesDropdownList, function(o) { return (o.office_id === office_id) })
      setApprovalProfileList(filtered_list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvalProfilesState.approvalProfilesDropdownList]);

  return (
    <>
      {(approvalProfileList) ?
        <Autocomplete
          value={approvalProfileValue || null}
          onChange={(event, newValue) => {
            approvalProfileOnChange(event, newValue, office_id)
          }}
          options={approvalProfileList}
          getOptionLabel={(option) => option.title}
          id={id}
          size={"small"}
          name={name}
          renderInput={renderInput}
          {...attr}
        />

        : ''}
    </>
  );
}

ApprovalProfileDropdown.propTypes = {
  approvalProfileOnChange: PropTypes.any.isRequired,
  renderInput: PropTypes.any.isRequired
};

ApprovalProfileDropdown.defaultProps = {
  office_Id: 'all',
  approvalProfileValue: null,
  id: 'approval_profile_id',
  name: 'approval_profile_id',
};

export default ApprovalProfileDropdown;
