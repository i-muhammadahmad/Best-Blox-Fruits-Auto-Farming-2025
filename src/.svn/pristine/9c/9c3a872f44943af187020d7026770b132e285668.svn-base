import React from 'react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideSnackBarNotifications } from 'actions';

const NotificationsSnackBar = () => {

  const dispatch = useDispatch();
  const commonState = useSelector(state => state.commonState);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {

    if(commonState.snackbar_notification !== ''){
      if((commonState.snackbar_notification_type === 'general_error' || commonState.snackbar_notification_type === 'token_expire')){
        enqueueSnackbar(commonState.snackbar_notification, 
            { 
                variant:'error',
                onClose:handleNotificationClose,
                autoHideDuration:4000
            }
        );
      }
      else if(commonState.snackbar_notification_type === 'success'){
        enqueueSnackbar(commonState.snackbar_notification, 
            { 
                variant:'success',
                onClose:handleNotificationClose,
                autoHideDuration:4000
            }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonState.snackbar_notification]);  


    const handleNotificationClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      dispatch(hideSnackBarNotifications(commonState.snackbar_notification_type))
    };

  return (
    <div></div> 
    
  );
}


export default NotificationsSnackBar;