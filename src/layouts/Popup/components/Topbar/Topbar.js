import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <div style={{backgroundColor: 'white', width: '256px', height: '64px', marginLeft:'-24px', display:'flex', alignItems: 'center', borderBottom: '1px #f4f6f8 solid'}}>
          <div style={{margin:'0 auto'}}>
            <RouterLink to="/">
              <img
                alt="Logo"
                src="/images/logos/premierbpo_logo.png"
                style={{height:'50px'}}
              />
            </RouterLink>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
