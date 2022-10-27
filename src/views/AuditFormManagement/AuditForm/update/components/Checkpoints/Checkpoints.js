import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  FormGroup,
  FormControlLabel,
  FormControl,
	Checkbox,
	Box,
	Typography,
	Grid,
	Button
} from "@material-ui/core";
import { isEmpty } from 'lodash';
import CheckpointDetails from '../CheckpointDetails';
import { DeleteAlert } from 'components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Checkpoints = props => {
  const { 
		checkpoints,
		setCheckpoints,
		hasError,
		formState,
		setFormState,
		schema,
		setSchema, 
		files,
		setFiles,
		setDetections,
		detections,
		setDeletedDetails,
		setDeletedFiles,
		...rest 
	} = props;

	const classes = useStyles(); 
	const [showDeleteAlert, setShowDeleteAlert] = useState(false);
	const [deleteAlertDetails, setdeleteAlertDetails] = useState({
		title: 'Delete Record',
		desc: 'Are you sure, You want delete this record?',
		delCallback: () => {},
		onModelClose: ()=>{}
	});

	const handleCheckpointChange = (event, cid) => {
		let is_checked = event.target.checked;
		setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: is_checked
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
		}));
		
		setCheckpoints(checkpoints => ({
			...checkpoints,
			[cid]:{
				...checkpoints[cid],
				'is_checked': is_checked,
			}
		}));
	}

  return (
		<div
      className={classes.root}
    >
			{Object.values(checkpoints).map((data) =>
				<CheckpointDetails 
					key={data.id}
					crecord={data}
					hasError={hasError}
					formState={formState}
					setFormState={setFormState}
					schema={schema}
					setSchema={setSchema}
					handleCheckpointChange={handleCheckpointChange}
					checkpoints={checkpoints}
					setCheckpoints={setCheckpoints}
					files={files}
					setFiles={setFiles}
					showDeleteAlert={showDeleteAlert}
					setShowDeleteAlert={setShowDeleteAlert}
					deleteAlertDetails={deleteAlertDetails}
					setdeleteAlertDetails={setdeleteAlertDetails}
					setDetections={setDetections}
					detections={detections}
					setDeletedDetails={setDeletedDetails}
          setDeletedFiles={setDeletedFiles}
				/>
			)}

			<DeleteAlert
				title={deleteAlertDetails.title}
				alertText={deleteAlertDetails.desc}
				deleteCallback={deleteAlertDetails.delCallback}
				modalOpen={showDeleteAlert}
				handleModalOpen={setShowDeleteAlert}
				onModelClose={deleteAlertDetails.onModelClose}
			/>

		</div>
  );
};

export default Checkpoints;
