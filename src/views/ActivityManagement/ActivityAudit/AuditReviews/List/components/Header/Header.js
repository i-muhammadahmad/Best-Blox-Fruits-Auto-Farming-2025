import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  redirectToAuditReviewsList
} from 'actions';
import { makeStyles } from '@material-ui/styles';
import { StyledButton } from 'components';
import { Grid, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const auditReviewsState = useSelector(state => state.auditReviewsState);

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
            Activity Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Audit Reviews
          </Typography>
        </Grid>
        <Grid item>
          {(auditReviewsState.showViewPage === true)?
            <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { dispatch(redirectToAuditReviewsList()) }}
              startIcon={<CancelIcon />}
            >
              CLOSE
            </StyledButton>
            : ''
          }  
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
