import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import { StyledButton } from 'components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccessRights from 'utils/AccessRights';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;

  const session = useSelector(state => state.session);
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
            Employee Managment
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Shift Breaks
          </Typography>
        </Grid>
        <Grid item>
        { (AccessRights(session.current_page_permissions, 'add'))?
          <StyledButton
            color="bsuccess"
            variant="contained"
            component={RouterLink}
            to="/shift-breaks/add"
            startIcon={<AddCircleOutlineIcon />}
          >

            Add Shift Breaks
          </StyledButton>
          :""
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
