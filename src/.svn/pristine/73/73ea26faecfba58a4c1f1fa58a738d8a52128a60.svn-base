import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { StyledButton } from 'components';
import {
	getTicketsById,
	updateTicketCategory,
	updateTicketStatus
} from 'actions';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ListMenu(props) {
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const [openDeleteModel, setOpenDeleteModel] = useState(false);
	const session = useSelector(state => state.session);

	const { options, name, ticketId, ...rest } = props;
	const [statusId, setStatusId] = useState('');
	const [statusName, setStatusName] = useState('');
	
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	
	const showDeleteModel = async (status_id) => {
		setOpenDeleteModel(true);
		setStatusId(status_id);
	};

	const hideDeleteModel = () => {
		setOpenDeleteModel(false);
		setStatusId('');
	};

	const updateStatus = async () => {
		let data = {
			object_viewed_id: session.current_page_permissions.object_id,
			id: ticketId,
			status_id: statusId,
			status_name: statusName
		};
		await dispatch(updateTicketStatus(data));
		await handleClose();
		dispatch(getTicketsById(data.id, 'update'));
	}

	const handleStatusMenuItemClick = async (event) => {
		setStatusName(event.target.innerText);
		if (event.target.innerText === 'Closed') {
			showDeleteModel(event.target.id);
		}
		else{
			let data = {
				object_viewed_id: session.current_page_permissions.object_id,
				id: ticketId,
				status_id: event.target.id,
				status_name: statusName
			};
			await dispatch(updateTicketStatus(data));
			await handleClose();
			dispatch(getTicketsById(data.id, 'update'));
		}
	};

	const handleCategoryMenuItemClick = async (event, index) => {
		let data = {
			object_viewed_id: session.current_page_permissions.object_id,
			id: ticketId,
			ticket_category_id: event.target.id
		};
		await dispatch(updateTicketCategory(data));
		await handleClose();
		dispatch(getTicketsById(data.id, 'update'));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				aria-controls="simple-menu"
				aria-haspopup="true"
				size="small"
				style={{ width: '14px', height: '14px' }}
				onClick={handleClick}>
				<ExpandMoreIcon fontSize="small" />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				{options.map(option => (
					<MenuItem
						key={option.id}
						id={option.id}
						onClick={event =>
							name === 'category'
								? handleCategoryMenuItemClick(event)
								: handleStatusMenuItemClick(event)
						}>
						{option.name}
					</MenuItem>
				))}
			</Menu>

			<Dialog
        open={openDeleteModel}
        onClose={hideDeleteModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Close Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to close this ticket ?<br />
			If ticket is closed you can't be able to update anything.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={hideDeleteModel}   >
            Cancel
          </StyledButton>
          <StyledButton
            variant="contained"
            color="bdanger"
            startIcon={<DeleteIcon />}
            onClick={()=>updateStatus()}
            autoFocus={true}
          >
            Close Ticket
          </StyledButton>
        </DialogActions>
      </Dialog>
		</>
	);
}

ListMenu.defautProps = {
	options: []
};
