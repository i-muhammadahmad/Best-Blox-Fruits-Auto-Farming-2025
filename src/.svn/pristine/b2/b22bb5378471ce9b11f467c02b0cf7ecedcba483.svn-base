import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
	auditFormCategoryDropdownListFetch
} from 'actions';
import { isEmpty, includes, isArray, forEach, find } from 'lodash';

const useStyles = makeStyles(theme => ({
	root: {}
}));

const AuditFormCategoryDropdown = props => {
	const {
		clientIds,
		userIds,
		auditSetupId,
		AuditFormCategoryValue,
		setAuditFormCategoryValue,
		selectedId,
		selectedChangingId,
		auditFormCategoryOnChange,
		id,
		name,
		size,
		renderInput,
		showSelectAllOption,
		...attr
	} = props;
	const classes = useStyles();
	const dispatch = useDispatch();

	const auditFormCategoryState = useSelector(
		state => state.auditFormCategoryState
	);
	const session = useSelector(state => state.session);
	const [auditFormCategoryList, setAuditFormCategoryList] = useState([]);
	const [sCId, setSCId] = useState(selectedChangingId);

	useEffect(() => {
		dispatch(
			auditFormCategoryDropdownListFetch(
				session.current_page_permissions.object_id
			)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setSCId(selectedChangingId);
	}, [selectedChangingId]);

	useEffect(() => {
		if(!isEmpty(auditSetupId))
		{
			dispatch(
				auditFormCategoryDropdownListFetch(
					session.current_page_permissions.object_id,
					auditSetupId
				)
			);
		}
	}, [auditSetupId]);

	useEffect(() => {
		if (auditFormCategoryState.auditFormCategoriesDropdownList) {
			let checkSelectAll = false;
			if (!isEmpty(sCId)) {
				if (isArray(sCId)) {
					let scategory = [];
					forEach(sCId, function(value, key) {
						let item = find(
							auditFormCategoryState.auditFormCategoriesDropdownList,
							['id', value]
						);
						if (!isEmpty(item)) {
							scategory.push(item);
						}
					});
					setAuditFormCategoryValue(scategory);
				} else {
					let selected_category = find(
						auditFormCategoryState.auditFormCategoriesDropdownList,
						['id', sCId]
					);
					if (!isEmpty(selected_category)) {
						setAuditFormCategoryValue(selected_category);
					} else {
						setAuditFormCategoryValue(null);
					}
				}
			}
		}
	}, [sCId]);


	/* useEffect(() => {
		let camp_ids = [];
		if (!includes(campIds, 'all')) {
			camp_ids = campIds;
		}

		let user_ids = [];
		if (!includes(LocalUserIds, 'all')) {
			user_ids = LocalUserIds;
		}

		dispatch(
			auditFormCategoryDropdownListFetch(
				camp_ids,
				user_ids,
				session.current_page_permissions.object_id
			)
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [campIds, LocalUserIds]); */

	useEffect(() => {
		if (auditFormCategoryState.auditFormCategoriesDropdownList) {
			let auditForm_category_list = {
				...auditFormCategoryState.auditFormCategoriesDropdownList
			};
			auditForm_category_list = Object.values(auditForm_category_list);

			if (
				attr.multiple === true &&
				!isEmpty(auditForm_category_list) &&
				showSelectAllOption === true
			) {
				let first = {
					id: 'all',
					opt_display: 'All'
				};
				auditForm_category_list.unshift(first);
			} else if (attr.showNone == true) {
					let first = {
						id: 'null',
						parent_id: null,
						label: 'None',
						opt_display: 'None'
					};
					auditForm_category_list.unshift(first);
			}

			setAuditFormCategoryList(Object.values(auditForm_category_list));

			if (!isEmpty(selectedId)) {
				if (isArray(selectedId)) {
					let scat = [];
					forEach(selectedId, function(value, key) {
						let item = find(auditFormCategoryList, ['id', value]);
						if (!isEmpty(item)) {
							scat.push(item);
						}
					});
					setAuditFormCategoryValue(scat);
				} else {
					let scat = find(auditFormCategoryList, ['id', selectedId]);
					if (!isEmpty(scat)) {
						setAuditFormCategoryValue(scat);
					} else {
						setAuditFormCategoryValue(null);
					}
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auditFormCategoryState.auditFormCategoriesDropdownList]);

	return (
		<>
			{auditFormCategoryList ? (
				<Autocomplete
					value={AuditFormCategoryValue}
					onChange={(event, newValue) => {
						auditFormCategoryOnChange(event, newValue);
					}}
					options={auditFormCategoryList}
					getOptionLabel={option => option.opt_display}
					renderOption={option => (
						<React.Fragment>
							<div
								>
								{option.opt_display}
							</div>
						</React.Fragment>
					)}
					id={id}
					size={size}
					name={name}
					renderInput={renderInput}
					{...attr}
				/>
			) : (
				''
			)}
		</>
	);
};

AuditFormCategoryDropdown.propTypes = {
	auditFormCategoryOnChange: PropTypes.any.isRequired,
	renderInput: PropTypes.any.isRequired
};

AuditFormCategoryDropdown.defaultProps = {
	AuditFormCategoryValue: [],
	id: 'audit_form_category_id',
	name: 'audit_form_category_id',
	size: 'small',
	selectedId: '',
	selectedChangingId: '',
	showSelectAllOption: true,
	showNone: true
};

export default AuditFormCategoryDropdown;
