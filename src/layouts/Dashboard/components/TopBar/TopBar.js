/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Webcam from "react-webcam";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Grid
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'utils/axios';
import useRouter from 'utils/useRouter';
import { PricingModal, NotificationsPopover, ApprovalsPopover, ClockInOutPopover, StyledButton } from 'components';
import { logout, showLoader, hideLoader } from 'actions';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { addImage, setApprovalNotifications, closeSummaryModel, getGeoLocation, getLatestClockinEntry, handleUpdateTimer, handleStartTimer, startTimer, handleEndTimer, handlePauseTimer, handleUpdateActiveCam, readNotification, getAllUnreadNotifications, readAllNotifications, getNotiRefreshTime } from 'actions';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './style.css';
import Tooltip from '@material-ui/core/Tooltip';
import { isEmpty, findKey } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
    marginRight: '2rem'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  approvalButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  approvalBadge: {
    backgroundColor: colors.orange[600]
  },
  clockinBadge: {
    backgroundColor: colors.green[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  }
}));

const TopBar = props => {
  const { onOpenNavBarMobile, className, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const approvalsRef = useRef(null);
  const clockInOutRef = useRef(null);
  const [ClockInModalOpen, setClockInModalOpen] = useState(false);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openClockInOut, setOpenClockInOut] = useState(false);
  const [openApprovals, setOpenApprovals] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [timezoneId, setTimezoneId] = useState('');

  let photo_interval = useRef(null);
  let clock_interval = useRef(null);
  // Camera code
  const webcamRef = React.useRef(null);
  const camRefCurr = webcamRef.current;
  const webcamCanvasRef = React.useRef(null);

  const clockInState = useSelector(state => state.clockInState);
  const session = useSelector(state => state.session);
  const notificationState = useSelector(state => state.notificationState);

  const iconBackGroundColor = clockInState.iconbackgroundcolor;
  const iconclassName = clockInState.iconclassname;

  const capture = React.useCallback(() => {

    /*navigator.mediaDevices.getUserMedia({ audio: true, video: true})
    .then(function (stream) {
          if (stream.getVideoTracks().length > 0){
            alert('ok');
          } else {
            alert('not ok');
          }
    })
    .catch(function (error) { 
      alert('not ok');
    });*/

    let canvas = webcamCanvasRef.current;
    let context = canvas.getContext('2d');
    context.drawImage(webcamRef.current.video, 0, 0, '720', '480');
    setTimeout(function () {
      let imageSrc = canvas.toDataURL();
      dispatch(addImage(imageSrc));

      setTimeout(function () {
        dispatch(handleUpdateActiveCam());
      }, 3000);
    }, 9000);

    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [webcamRef, webcamCanvasRef]);

  useEffect(() => {
    if (session.approval_notifications) {
      setApprovals(session.approval_notifications);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [session.approval_notifications]);

  useEffect(() => {
    if (notificationState.notifications) {
      setNotifications(notificationState.notifications);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [notificationState.notifications]);

  useEffect(() => {
    if (session.user) {
      setEmployeeId(session.user.employee_id);
      setTimezoneId(session.user.timezone_id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [session.user]);

  useEffect(() => {
    if (clockInState.activeCam) {
      setTimeout(function () {
        capture();
      }, 15000);
    }
  }, [clockInState.activeCam]);

  useEffect(() => {
    if (clockInState.running) {
      clockInState.iconbackgroundcolor = 'green';
      clockInState.iconclassname = 'notificationsButton_running';
      dispatch(handleUpdateActiveCam());
      photo_interval.current = setInterval(() => {
        dispatch(handleUpdateActiveCam());
      }, 900000);
    } else {
      clearInterval(photo_interval.current);
      clockInState.iconbackgroundcolor = 'orange';
      clockInState.iconclassname = 'notificationsButton_stop'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockInState.running]);

  useEffect(() => {
    if (clockInState.running) {
      clock_interval.current = setInterval(() => dispatch(handleUpdateTimer()), 1000);
    } else {
      clearInterval(clock_interval.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockInState.running]);

  useEffect(() => {
    if (session.loggedIn && !isEmpty(localStorage.getItem("token"))) {
      dispatch(getGeoLocation());
      dispatch(getLatestClockinEntry());
    }
  }, []);

  useEffect(() => {
    let mounted = true

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    //history.push('/auth/login');
    dispatch(logout());
  };

  const handleClockInOpen = () => {
    setClockInModalOpen(true);
  };

  const handleClockInClose = () => {
    setClockInModalOpen(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleApprovalsOpen = () => {
    setOpenApprovals(true);
  };

  const handleClockinoutOpen = () => {
    setOpenClockInOut(true);
  }

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };
  const handleClockInOutClose = () => {
    setOpenClockInOut(false);
  };
  const handleApprovalsClose = () => {
    setOpenApprovals(false);
  };

  const handleStartClick = () => {
    dispatch(handleStartTimer());
    dispatch(startTimer({
      work_from: clockInState.work_from,
      seconds: clockInState.seconds,
      ip_address: clockInState.ip_address,
      status: 'At Desk'
    }));
  }

  const handleStopClick = (b_status) => {
    dispatch(handlePauseTimer());
    dispatch(startTimer({
      work_from: clockInState.work_from,
      seconds: clockInState.seconds,
      ip_address: clockInState.ip_address,
      status: b_status
    }));
    clearInterval(clock_interval.current);

  }

  const handleResetClick = () => {

    clearInterval(clock_interval.current);
    dispatch(handleEndTimer());
    dispatch(startTimer({
      work_from: clockInState.work_from,
      seconds: clockInState.seconds,
      ip_address: clockInState.ip_address,
      status: 'End Timer'
    }));
  }

  const handleSearchChange = event => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  const popularSearches = [
    'PremierBPO',
    'Employees',
    'Project',
    'Pages'
  ];

  //shift summary model
  const closeShiftSummaryModel = () => {
    dispatch(closeSummaryModel())
  }

  const secondsToDhms = (seconds) => {
    console.log(seconds);
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  const removeAssetNotifications = (notification_id) => {
    let notifications = session.approval_notifications;
    const n_index = findKey(notifications, function (o) { return o.notification_id == notification_id; });
    delete notifications[n_index];
    dispatch(setApprovalNotifications(notifications));

  }

  const removeReadNotification = async (notification_id) => {
    await readNotification(notification_id);
    dispatch(getAllUnreadNotifications(employeeId, timezoneId));
    handleNotificationsClose();
  }

  /* const getNotificationsTime = async () => {
    await dispatch(getNotiRefreshTime());
  } */

  useEffect(() => {
    
      if(!isEmpty(session.noti_refresh_time) && session.noti_refresh_time != 0){
        const interval = setInterval(() => dispatch(getAllUnreadNotifications(session.user.employee_id, session.user.timezone_id)), parseInt(session.noti_refresh_time * 60 * 1000));
        // const interval = setInterval(() => dispatch(getAllUnreadNotifications(session.user.employee_id, session.user.timezone_id)), 10000);
        return () => {
          clearInterval(interval);
        };
      }
  }, []);


  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <div style={{ backgroundColor: 'white', width: '256px', height: '100%', marginLeft: '-24px', display: 'flex', alignItems: 'center', borderBottom: '1px #f4f6f8 solid' }}>
          <div style={{ margin: '0 auto' }}>
            <RouterLink to="/">
              <img
                alt="Logo"
                src="/images/logos/premierbpo_logo.png"
                style={{ height: '50px' }}
              />
            </RouterLink>
          </div>
        </div>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <div
            className={classes.search}
            ref={searchRef}
          >
            <SearchIcon className={classes.searchIcon} />
            <Input
              className={classes.searchInput}
              disableUnderline
              onChange={handleSearchChange}
              placeholder="Search people &amp; places"
              value={searchValue}
            />
          </div>
          <Popper
            anchorEl={searchRef.current}
            className={classes.searchPopper}
            open={openSearchPopover}
            transition
          >
            <ClickAwayListener onClickAway={handleSearchPopverClose}>
              <Paper
                className={classes.searchPopperContent}
                elevation={3}
              >
                <List>
                  {popularSearches.map(search => (
                    <ListItem
                      button
                      key={search}
                      onClick={handleSearchPopverClose}
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary={search} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>

        </Hidden>
        {clockInState.running ? <Tooltip title="You are being recorded." placement="bottom"><PhotoCameraIcon /></Tooltip> : ''}
        <Hidden mdDown>
          <IconButton
            className={iconclassName}
            color="inherit"
            onClick={handleClockinoutOpen}
            ref={clockInOutRef}
            style={{ backgroundColor: iconBackGroundColor }}
          >
            <AccessTimeIcon />

          </IconButton>

        </Hidden>

        <Hidden mdDown>
          <IconButton
            className={classes.notificationsButton}
            color="inherit"
            onClick={handleNotificationsOpen}
            ref={notificationsRef}
          >
            <Badge
              badgeContent={notifications.length}
              classes={{ badge: classes.notificationsBadge }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.approvalButton}
            color="inherit"
            onClick={handleApprovalsOpen}
            ref={approvalsRef}
          >
            <Badge
              classes={{ badge: classes.approvalBadge }}
              badgeContent={(approvals.length)}
            >
              <PlaylistAddCheckIcon />
            </Badge>
          </IconButton>

          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}
          >
            <InputIcon className={classes.logoutIcon} />
            Sign out
          </Button>
        </Hidden>

        {(clockInState.activeCam) ?
          <div style={{ display: 'none' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              height={480}
              screenshotFormat="image/jpeg"
            />
            <canvas ref={webcamCanvasRef} id='clock-image-display' height={480} width={720} />
          </div>
          : ''}

        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <PricingModal
        onClose={handleClockInClose}
        open={ClockInModalOpen}
      />
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
        employeeId={employeeId}
        timezoneId={timezoneId}
        removeReadNotification={removeReadNotification}
      />
      <ApprovalsPopover
        anchorEl={approvalsRef.current}
        notifications={approvals}
        onClose={handleApprovalsClose}
        open={openApprovals}
        removeAssetNotifications={removeAssetNotifications}
      />
      <ClockInOutPopover
        anchorEl={clockInOutRef.current}
        notifications={notifications}
        onClose={handleClockInOutClose}
        open={openClockInOut}
        startfunction={handleStartClick}
        stopfunction={handleStopClick}
        resetfunction={handleResetClick}

      />
      <div>
        {!isEmpty(clockInState.clockInSummary) ?
          <Dialog
            open={clockInState.showClockInModel}
            onClose={closeShiftSummaryModel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Shift Summary'}</DialogTitle>
            <DialogContent style={{minWidth: '600px'}}>
              <Grid container spacing={3}>
                <Grid item sm={12}>
                  <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                      <Table aria-label="sticlockin summary table">
                        <TableBody>
                          <TableRow key={"sumr_1"}>
                            <TableCell
                              key={'sumr_1_1'}
                              variant={'head'}
                            >
                              Total Time At Desk
                            </TableCell>
                            <TableCell
                              key={'sumr_1_2'}
                            >
                              {secondsToDhms(clockInState.clockInSummary.at_desk_time)}
                            </TableCell>
                          </TableRow>
                          <TableRow key={"sumr_2"}>
                            <TableCell
                              key={'sumr_2_1'}
                              variant={'head'}
                            >
                              Total Time On Break
                            </TableCell>
                            <TableCell
                              key={'sumr_2_2'}
                            >
                              {secondsToDhms(clockInState.clockInSummary.on_break_time)}
                            </TableCell>
                          </TableRow>
                          <TableRow key={"sumr_3"}>
                            <TableCell
                              key={'sumr_3_1'}
                              variant={'head'}
                            >
                              Total Shift Time
                            </TableCell>
                            <TableCell
                              key={'sumr_3_2'}
                            >
                              {secondsToDhms(clockInState.clockInSummary.ttl_shift_time)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <StyledButton onClick={closeShiftSummaryModel}   >
                Ok
              </StyledButton>
            </DialogActions>
          </Dialog>
          : ""}
      </div>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
