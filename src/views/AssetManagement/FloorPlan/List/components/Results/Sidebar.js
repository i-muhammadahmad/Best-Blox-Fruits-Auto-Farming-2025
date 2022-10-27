import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Fab, FormControlLabel } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './style.css';


const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280
  },
  root: {
    backgroundColor: theme.palette.white
  },
  list: {
    padding: theme.spacing(1, 3)
  },
  listItemText: {
    marginRight: theme.spacing(1)
  },
  fab: {
    position: 'fixed',
    top: 120,
    right: 250,
    zIndex: theme.zIndex.drawer + 100,
    borderRadius: 0,
    height: 150,
    width: 30
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { open, handleDrawerToggle, checked, handleChange, ...rest } = props;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
        variant="temporary"
        onClose={handleDrawerToggle}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
            Options
          </IconButton>
        </div>
        <Divider />
        <List component="nav" aria-label="checkbox filters">
          <ListItem>
            <FormControlLabel
              control={<Checkbox name='used' onChange={(e) => handleChange(e)} checked={checked.used}/>}
              label="Highlight Unsed"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Checkbox name='withoutComputer' onChange={(e) => handleChange(e)} checked={checked.withoutComputer}/>}
              label="Highlight Without Computer"
            />
          </ListItem>
          <ListItem>
            <FormControlLabel
              control={<Checkbox name='withoutAsset' onChange={(e) => handleChange(e)} checked={checked.withoutAsset}/>}
              label="Highlight With No Asset"
            />
          </ListItem>
        </List>
        <>
          <Fab
            color="inherit"
            aria-label="open sidebar"
            onClick={handleDrawerToggle}
            className={[classes.fab, 'filter_button']}>
            <span
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed'
              }}>
              <ArrowForwardIosIcon />
              &nbsp; <span
              style={{
                display: 'inline-block',
                transform: 'rotate(180deg)',
              }}>
              Options
            </span> &nbsp;
              <ArrowForwardIosIcon />
            </span>
          </Fab>
        </>
      </Drawer>
    </div>
  );
}
