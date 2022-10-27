/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  Button,
  Collapse,
  colors,
  Box,
  Grid,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { has } from 'lodash';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: '5px',
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: '0px',
    
  },
  box: {
    background: theme.palette.blight.main,
    color: theme.palette.blight.contrastText,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    '&:hover': {
      background: theme.palette.blight.main,
      color: theme.palette.blight.contrastText,
    }
  },
  boxLeaf: {
    background: theme.palette.blight.main,
    color: theme.palette.blight.contrastText,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:hover': {
      background: theme.palette.blight.main,
      color: theme.palette.blight.contrastText,
    }
  },
  expandIcon: {
    marginLeft: 'auto',
    height: 16,
    width: 16,
    float: 'right'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto'
  },
  active: {
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.contrastText
    }
  },
  rightsCheckbox:{
    color: theme.palette.blight.contrastText,
    padding: 0
  },
  rightsLabel:{
    color: theme.palette.blight.contrastText,
  }
}));

const Component = props => {
  const {
    title,
    depth,
    children,
    className,
    open: openProp,
    label: Label,
    objectType,
    formState,
    setFormState,
    objectListItem,
    ...rest
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen(open => !open);
  };

  const handleChange = (event, id, accessType) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        role_access_rights:{
          ...formState.values.role_access_rights,
          [id]: {
            ...formState.values.role_access_rights[id],
            [accessType]: !(formState.values.role_access_rights[id][accessType]),
          }
        }
      }
    }));
  };

  let marginLeft = 0;
  if (depth > 0) {
    marginLeft = 20 * depth;
  }

  const style = {
    marginLeft
  };


  if (children) {
    return (
      <ListItem
        {...rest}
        className={clsx(classes.item, className)}
        disableGutters
      >
        <Box
          className={classes.box}
          style={style}
        >
          <Grid container spacing={3}>
            <Grid item sm={3}>
              {title}
            </Grid>
            <Grid item sm={2}>
            </Grid>
            <Grid item sm={2}>
            </Grid>
            <Grid item sm={2}>
            </Grid>
            <Grid item sm={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={has(formState.values.role_access_rights, objectListItem.id) ? formState.values.role_access_rights[objectListItem.id]['view'] : false}
                    onChange={(event) => { handleChange(event, objectListItem.id, 'view') }}
                    color="primary"
                    className={classes.rightsCheckbox}
                  />
                }
                label="View"
                classes={{
                  label: classes.rightsLabel
                }}
              />
            </Grid>
            <Grid item sm={1}>
              {open ? (
                <RemoveIcon
                  className={classes.expandIcon}
                  color="inherit"
                  onClick={handleToggle}
                />
              ) : (
                  <AddIcon
                    className={classes.expandIcon}
                    color="inherit"
                    onClick={handleToggle}
                  />
                )}
            </Grid>
          </Grid>
        </Box>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  } else {
    return (
      <ListItem
        {...rest}
        className={clsx(classes.itemLeaf, className)}
        disableGutters
      >
        <Box
          className={clsx(classes.boxLeaf, `depth-${depth}`)}
          style={style}
        >
          <Grid container spacing={3}>
            <Grid item sm={3}>
              {title}
            </Grid>
            <Grid item sm={2}>
            </Grid>
            <Grid item sm={2}>
            </Grid>
            <Grid item sm={2}>
            </Grid>
            <Grid item sm={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={has(formState.values.role_access_rights, objectListItem.id) ? formState.values.role_access_rights[objectListItem.id]['view'] : false}
                    onChange={(event) => { handleChange(event, objectListItem.id, 'view') }}
                    color="primary"
                    className={classes.rightsCheckbox}
                  />
                }
                label="View"
                classes={{
                  label: classes.rightsLabel
                }}
              />
            </Grid>
            <Grid item sm={1}></Grid>
          </Grid>
        </Box>
      </ListItem>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  label: PropTypes.any,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  objectType: PropTypes.string.isRequired
};

Component.defaultProps = {
  depth: 0,
  open: false,
  objectType: 'Component'
};

export default Component;
