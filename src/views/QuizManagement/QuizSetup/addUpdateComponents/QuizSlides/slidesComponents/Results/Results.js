import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar
} from '@material-ui/core';
import { GenericMoreButton, TableEditBar } from 'components';
import Nestable from 'react-nestable';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { StyledFab } from 'components';
import { updateNestedSlidesOrder } from 'actions'

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
}));


const Results = props => {
  const { className, slideList, updateRecord, showDeleteModal, ...rest } = props;

  const classes = useStyles();
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  const slideSortOrderChanged = (items, changedItem) => {
    dispatch(updateNestedSlidesOrder(items, session.current_page_permissions.object_id))
  }

  const ListItemRenderer = ({ item, collapseIcon, index }) => {
    const slide = item;
    return (
      <React.Fragment key={slide.id}>
        <List>
          <ListItem key={slide.id}>
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
              secondary={slide.text_content_html}
            />
            <ListItemSecondaryAction >
              {(session.current_page_permissions.rights_edit == '1') ?
                <IconButton edge="end" aria-label="update" onClick={() => updateRecord(slide.id)}>
                  <StyledFab
                    color="bprimary"
                    aria-label="Edit"
                    size="small"
                  >
                    <EditIcon />
                  </StyledFab>
                </IconButton>
                : ''
              }
              {(session.current_page_permissions.rights_delete == '1') ?
                <IconButton edge="end" aria-label="Delete" onClick={() => showDeleteModal(slide.id)}  >
                  <StyledFab
                    color="bdanger"
                    aria-label="edit"
                    size="small"
                  >
                    <DeleteIcon size="small" />
                  </StyledFab>
                </IconButton>
                : ''
              }
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
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >

      </Typography>
      <Card>
        <CardHeader
          title="Slides"
        />
        <Divider />
        <CardContent className={classes.content}>
          <Nestable
            items={slideList}
            renderItem={ListItemRenderer}
            onChange={(items, changedItem) => {
              slideSortOrderChanged(items, changedItem)
            }}
            maxDepth={2}
          />
        </CardContent>
      </Card>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
};

Results.defaultProps = {
};

export default Results;
