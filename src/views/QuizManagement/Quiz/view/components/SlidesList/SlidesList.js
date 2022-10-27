import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  List,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Slide,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { GenericMoreButton, TableEditBar } from 'components';
import Nestable from 'react-nestable';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { StyledFab } from 'components';
import { updateNestedSlidesOrder } from 'actions';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  listItemTextSelected: {
    color: 'white',
  },
  listItemText: {

  }
}));


const SlidesList = props => {
  const { className, nestedSlideList, activeSlideId, showSlideMenu, showHideSlidesMenu, ...rest } = props;

  const classes = useStyles();
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  const ListItemRenderer = ({ item, collapseIcon, index }) => {
    const slide = item;
    return (
      <React.Fragment key={slide.id}>
        <List>
          <ListItem 
            key={slide.id}
            style={{ backgroundColor: (slide.id === activeSlideId) ? '#3f51b5' : 'unset' }}
          >
            <ListItemAvatar>
              <Avatar 
                alt="Avator" 
                src={
                (slide.slide_type === 'Information') ? "/images/logos/informational_logo.png" : "/images/logos/interactive_logo.png"
                } 
                className={classes.large}
              /> 
            </ListItemAvatar>
            <ListItemText
              primary={slide.name}
              secondary={''}
              classes={{ primary: (slide.id === activeSlideId) ? classes.listItemTextSelected : classes.listItemText }} 
            />
            <ListItemSecondaryAction >
              
            </ListItemSecondaryAction>  
          </ListItem>
        </List>
        <Divider />
      </React.Fragment>
    );
  }

  return (
    
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Paper elevation={3}  >
          <AppBar position="static" color="default" style={{marginBottom: '-8px'}}>
            <Toolbar>
              <IconButton  onClick={showHideSlidesMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Slide direction="right" in={showSlideMenu} mountOnEnter unmountOnExit>
            <Nestable
              items={nestedSlideList}
              renderItem={ListItemRenderer}
              maxDepth={2}
              childrenProp={'child_slides'}
              confirmChange = {() => false}
            />
          </Slide>  
        </Paper>
      </div>
       
  );
};

SlidesList.propTypes = {
  className: PropTypes.string,
  nestedSlideList: PropTypes.array.isRequired
};

SlidesList.defaultProps = {
  nestedSlideList: []
};

export default SlidesList;
