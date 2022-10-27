import React from 'react';
import { useDispatch } from 'react-redux';
import useRouter from 'utils/useRouter';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
} from '@material-ui/core'
import { StyledButton } from 'components';
import CancelIcon from '@material-ui/icons/Cancel';
import { redirectToAssetTypesList } from 'actions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

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
            Asset Management
          </Typography>
          <Typography
            component="h1"
            variant="h3"
          >
            Asset Types
          </Typography>
        </Grid>
        <Grid item>
          
          <StyledButton
            variant="contained"
            color="blight"
            size="small"
            onClick={() => { dispatch(redirectToAssetTypesList()) }}
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
