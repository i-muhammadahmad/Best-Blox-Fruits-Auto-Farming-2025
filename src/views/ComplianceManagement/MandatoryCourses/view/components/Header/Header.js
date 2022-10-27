import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import { 
  redirectToQuizSetupList,
  getQuizSetupById,
  showCommonLoader,
  quizSlidesListFetch,
  quizBindingListFetch
} from 'actions';
import { StyledButton } from 'components';
import CancelIcon from '@material-ui/icons/Cancel';
import CachedIcon from '@material-ui/icons/Cached';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();
  const quizSetupState = useSelector(state => state.quizSetupState);

  const classes = useStyles();

  const refershView = () => {
    dispatch(showCommonLoader());
    dispatch(getQuizSetupById(quizSetupState.quizSetupRecord.id, 'view'))
    dispatch(quizSlidesListFetch(quizSetupState.quizSetupRecord.id, session.current_page_permissions.object_id));
    dispatch(quizBindingListFetch(quizSetupState.quizSetupRecord.id, session.current_page_permissions.object_id));
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Quiz Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Quiz Setup
          </Typography>
        </Grid>
        <Grid item>
          <StyledButton
            variant="contained"
            color="bprimary"
            size="small"
            onClick={() => { refershView() }}
            startIcon={<CachedIcon />}
          >
            Refersh
          </StyledButton>&nbsp; &nbsp;
          <StyledButton
            variant="contained"
            color="blight"
            size="small"
            onClick={() => { dispatch(redirectToQuizSetupList()) }}
            startIcon={<CancelIcon />}
          >
            CLOSE
          </StyledButton>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
