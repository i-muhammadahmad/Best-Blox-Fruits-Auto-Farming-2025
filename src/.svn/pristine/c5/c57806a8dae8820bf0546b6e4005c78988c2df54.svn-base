/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, Typography } from '@material-ui/core';
import { ObjectListItem } from './components';
import ScopeModel from '../ScopeModel';
 
const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
  }
}));

const useListStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  }
}));

const NestedList = props => {
  const { objectLists, ...rest } = props;
  const classes = useListStyles();

  return (
    <List 
      className={classes.root}
    >
      {objectLists.reduce(
        (items, objectList) => reduceChildObjects({ items, objectList, ...rest }),
        []
      )}
    </List>
  );
};

NestedList.propTypes = {
  depth: PropTypes.number,
  objectLists: PropTypes.array
};

const reduceChildObjects = props => {
  const { items, objectList, depth, formState,  setFormState, key, handleModalOpen, setObjectId } = props;
  

  if (objectList.children) {
    items.push(
      <ObjectListItem
        depth={depth}
        key={objectList.id}
        label={objectList.label}
        open={false}
        title={objectList.name}
        objectType={objectList.object_type.opt_display}
        setFormState={setFormState}
        formState={formState}
        objectListItem={objectList}
        handleModalOpen={handleModalOpen}
        setObjectId={setObjectId}
      >
        <NestedList
          depth={depth + 1}
          objectLists={objectList.children}
          setFormState={setFormState}
          formState={formState}
          handleModalOpen={handleModalOpen}
          setObjectId={setObjectId}
        />
      </ObjectListItem>
    );
  } else {
    items.push(
      <ObjectListItem
        depth={depth}
        key={objectList.id}
        label={objectList.label}
        title={objectList.name}
        objectType={objectList.object_type.opt_display}
        setFormState={setFormState}
        formState={formState}
        objectListItem={objectList}
        handleModalOpen={handleModalOpen}
        setObjectId={setObjectId}
      />
    );
  }

  return items;
};

const NestedObjects = props => {
  const { objectLists, className, component: Component, formState, setFormState,  ...rest } = props;
  const classes = useStyles();
  const [modalOpen, handleModalOpen] = useState(false);
  const [objectId, setObjectId] = useState('');

  return (
    <Component
      {...rest}
      className={clsx(classes.root, className)}
    >
      <NestedList
        depth={0}
        objectLists={objectLists}
        setFormState={setFormState}
        formState={formState}
        handleModalOpen={handleModalOpen}
        setObjectId={setObjectId}
      />
      <ScopeModel
        modalOpen={modalOpen}
        handleModalOpen={handleModalOpen}
        setFormState={setFormState}
        formState={formState}
        objectId={objectId}
        setObjectId={setObjectId}
      />
    </Component>
  );
};

NestedObjects.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  objectLists: PropTypes.array.isRequired,
};

NestedObjects.defaultProps = {
  component: 'div'
};

export default NestedObjects;
