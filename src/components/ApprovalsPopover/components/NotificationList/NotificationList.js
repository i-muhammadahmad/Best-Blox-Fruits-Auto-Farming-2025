import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PaymentIcon from '@material-ui/icons/Payment';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import CodeIcon from '@material-ui/icons/Code';
import StoreIcon from '@material-ui/icons/Store';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BeenhereIcon from '@material-ui/icons/Beenhere'; 
import CancelIcon from '@material-ui/icons/Cancel';
import { StyledFab, StyledButton, DeleteAlert, CommonAlert} from 'components';
import { RejectionModel } from 'views/AssetManagement/AssetApprovals/List/components';
import gradients from 'utils/gradients';

const useStyles = makeStyles(theme => ({
  root: {},
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.background.default
    }
  },
  avatarBlue: {
    backgroundImage: gradients.blue
  },
  avatarGreen: {
    backgroundImage: gradients.green
  },
  avatarOrange: {
    backgroundImage: gradients.orange
  },
  avatarIndigo: {
    backgroundImage: gradients.indigo
  },
  arrowForwardIcon: {
    color: theme.palette.icon
  }
}));

const NotificationList = props => {
  const { notifications, className, removeAssetNotifications,  ...rest } = props;
  const classes = useStyles();

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertDetails, setAlertDetails] = useState({
		title: 'Delete Record',
		desc: 'Are you sure, You want delete this record?',
		submitCallback: () => {},
    onModelClose: ()=>{},
    submitButton: ''
  });
  
  const [showRejectionModel, setShowRejectionModel] = React.useState(false);
  const [rejectionModelDetails, setRejectionModelDetails] = useState({
		title: 'Delete Record',
		desc: 'Are you sure, You want delete this record?',
		submitCallback: () => {},
    onModelClose: ()=>{},
    rejectionButtonTxt: 'Delete'
	});

  const showAssetsApprovalModel = async (id) => {
		await setAlertDetails({
			title: 'Approve Assets',
			desc: 'Are you sure, You want approve this asset?',
			submitCallback: () => { /*removeAssetNotifications(id)*/ },
      onModelClose: () => { /*nothing to do*/ },
      submitButton: () => {
        return(
          <StyledButton
            color="bsuccess"
            size="small"
            type="submit"
            variant="contained"
            onClick={() => { setShowAlert(false);/*showAssetsApprovalModel(notification.notification_id)*/ }}
            startIcon={<BeenhereIcon />}
          >
            Approve
          </StyledButton>
        )  
      }
		});
		await setShowAlert(true);
  }
  
  const showRejectAssetsApprovallModel = async (id) => {
		await setRejectionModelDetails({
			title: 'Reject Assets Approval',
			desc: 'Are you sure, You want reject this approval?',
			submitCallback: () => { /*removeAssetNotifications(id)*/ },
      onModelClose: () => { /*nothing to do*/ },
      rejectionButtonTxt: 'Reject'
		});
		await setShowRejectionModel(true);
	}
  
  const avatars = {
    asset_approval: (
      <Avatar className={classes.avatarGreen}>
        <ViewQuiltIcon />
      </Avatar>
    )
  };

  const getNotificationList = (notification, i) => {
    if(notification.type === 'asset_approval'){
      return (
        <>
          <ListItemAvatar>{avatars[notification.type]}</ListItemAvatar>
          <ListItemText
            style={{paddingBottom: '32px'}}
            primary={'Assets Approval'}
            primaryTypographyProps={{ variant: 'body1' }}
            secondary={
              <React.Fragment>
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <b>Asset: </b> {notification.asset_name}
                </Typography>
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <b>Office: </b> {notification.office_name}
                </Typography>
                <Typography
                  component="p"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  <b>Created At: </b> {(moment(notification.date_created).format('YYYY-MM-DD HH:MM:SS'))}
                </Typography>
              </React.Fragment>
            }
          />
          <ListItemSecondaryAction style={{top: '80%'}} >
            <StyledButton
              color="bsuccess"
              size="small"
              type="submit"
              variant="contained"
              onClick={() => { showAssetsApprovalModel(notification.notification_id) }}
              startIcon={<BeenhereIcon />}
            >
              Approve
            </StyledButton> &nbsp; &nbsp;
            <StyledButton
              variant="contained"
              color="bdanger"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => { showRejectAssetsApprovallModel(notification.notification_id) }}
            >
              Reject
            </StyledButton>
          </ListItemSecondaryAction>
        </>  
      );
    }
  }

  return (
    <>
      <List
        {...rest}
        className={clsx(classes.root, className)}
        disablePadding
      >
        {notifications.map((notification, i) => (
          <ListItem
            className={classes.listItem}
            divider={i < notifications.length - 1}
            key={notification.notification_id}
          >
            {getNotificationList(notification, i)}
          </ListItem>
        ))}
      </List>
      <CommonAlert
        title={alertDetails.title}
				alertText={alertDetails.desc}
				submitCallback={alertDetails.submitCallback}
				modalOpen={showAlert}
				handleModalOpen={setShowAlert}
        onModelClose={alertDetails.onModelClose}
        submitButton={alertDetails.submitButton}
      />
      <RejectionModel
        title={rejectionModelDetails.title}
				alertText={rejectionModelDetails.desc}
				submitCallback={rejectionModelDetails.submitCallback}
				modalOpen={showRejectionModel}
				handleModalOpen={setShowRejectionModel}
        onModelClose={rejectionModelDetails.onModelClose}
        rejectionButtonTxt={rejectionModelDetails.rejectionButtonTxt}
      />
    </>  
  );
};

NotificationList.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.array.isRequired
};

export default NotificationList;
