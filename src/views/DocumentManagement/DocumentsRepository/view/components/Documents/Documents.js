import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { documentsCategoryListFetch } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { StyledButton, AttachmentsPreviewer } from 'components';
import { documentsListWithAccessFetch } from 'actions';
import { API_URL } from 'configs';

const useStyles = makeStyles(() => ({
	root: {}
}));

const Documents = props => {
	const { clickBackwardHandler, documentCategoryId, ...rest } = props;

  const [documentsList, setDocumentsList] = useState([]);
	const classes = useStyles();
	const dispatch = useDispatch();
	const documentsState = useSelector(state => state.documentsState);
	const session = useSelector(state => state.session);

	useEffect(() => {
		dispatch(
			documentsListWithAccessFetch(
				session.current_page_permissions.object_id,
				documentCategoryId
			)
		);
	}, []);

  useEffect(() => {
		setDocumentsList(documentsState.documentsListWithAccess);
	}, [documentsState.documentsListWithAccess]);

  const downloadAttachment = (e, record_id) => {
		window.location.href =
			API_URL + 'documents/downloadDocumentAttachment?id=' + record_id;
	};

	return (
		<div style={{ width: '100%' }}>
			<StyledButton
				color="bprimary"
				size="small"
				type="button"
				variant="contained"
				style={{ display: 'block' }}
				onClick={() => clickBackwardHandler()}>
				Back
			</StyledButton>
			<br />
			{!isEmpty(documentsList) ? (
				<Card>
					<CardContent>
						<div>
							<AttachmentsPreviewer
								attachmentList={
									documentsList
								}
                showRecordTitle={true}
								setAttachmentList={() => {}}
								showDeleteButton={false}
								downloadCallback={downloadAttachment}
								colHeight={200}
								noOfCols={5}
							/>
						</div>
					</CardContent>
				</Card>
			) : (
				''
			)}
		</div>
	);
};

export default Documents;
