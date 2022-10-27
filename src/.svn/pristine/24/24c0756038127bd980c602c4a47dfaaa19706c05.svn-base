import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { StyledButton } from 'components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, displayView, setDisplayView, ...rest } = props;

  const classes = useStyles();

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
            Assets Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Assets Report
          </Typography>
        </Grid>
        <Grid item>
          {(displayView === true)?
            <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={() => { setDisplayView(false) }}
              startIcon={<CancelIcon />}
            >
              CLOSE
            </StyledButton>
          :
          ''
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
