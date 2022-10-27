import React, { useState, useEffect, useRef } from 'react';
import useRouter from 'utils/useRouter';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { StyledButton } from 'components';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
	content: {
		padding: theme.spacing(3)
	},
	inner: {
		minWidth: 700
	}
}));

const AddDocument = props => {
	const { className, title, insertedDoc, setInsertedDoc, ...rest } = props;
	const classes = useStyles();
	const router = useRouter();

	const windowRef = useRef(null);

	useEffect(() => {
		// Clear inserted document from localStorage 
		if (localStorage.getItem('inserted_document') != null) {
			localStorage.removeItem('inserted_document')
			// setInsertedDoc({});
		}
	}, []);

	const handleTabClose = event => {
		event.preventDefault();
		if (localStorage.getItem('inserted_document') != null) {
			let docData = JSON.parse(localStorage.getItem('inserted_document'));
			setInsertedDoc(insertedDoc => ({
				...insertedDoc,
				...docData
			}));
		}
	};

	const clickHandler = () => {
		windowRef.current = window.open('/popup/documents-add', 'Add Document', '_blank');
		windowRef.current.addEventListener('beforeunload', handleTabClose);
	};

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<StyledButton
				color="bprimary"
				size="small"
				type="button"
				variant="contained"
				startIcon={<AddCircleOutlineIcon />}
				onClick={clickHandler}>
				{title}
			</StyledButton>
		</div>
	);
};

AddDocument.defaultProps = {
  title: 'Add Document',
  
};
export default AddDocument;
