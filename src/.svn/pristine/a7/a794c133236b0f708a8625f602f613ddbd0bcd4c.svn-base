import React, { Fragment, useState, useCallback } from 'react';
import { API_URL } from 'configs';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  colors,
  ButtonBase
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import bytesToSize from 'utils/bytesToSize';
import { StyledFab } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  image: {
    width: 100,
    height: 100,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const LogoImage = props => {
  const { className, files, setFiles, companyState, ...rest } = props;
  const classes = useStyles();

  const handleDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    maxSize: 500000,
    onDrop: handleDrop
  });

  const thumbs = files.map((file, i) => (
    <ListItem
      divider={i < files.length - 1}
      key={uuid()}
    >
      <ListItemIcon>
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
              alt={file.name}
            />
          </div>
        </div>
      </ListItemIcon>
      <ListItemText
        primary={file.name}
        primaryTypographyProps={{ variant: 'h5' }}
        secondary={bytesToSize(file.size)}
      />
      <IconButton edge="end" onClick={handleRemoveAll}>
        <StyledFab
          color="bdanger"
          aria-label="edit"
          size="small"
          
        >
          <DeleteIcon size="small" />
        </StyledFab>
      </IconButton>
    </ListItem>
  ));

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select Company Logo"
            className={classes.image}
            src="/images/undraw_add_file2_gvbb.svg"
          />
        </div>
        <div>
          <Typography
            gutterBottom
            variant="h3"
          >
            Select Company Logo
          </Typography>
          <Typography
            className={classes.info}
            color="textSecondary"
            variant="body1"
          >
            Drop Image here or click <Link underline="always">browse</Link>{' '}
            thorough your machine
          </Typography>
        </div>
      </div>
      <Fragment>
        <PerfectScrollbar options={{ suppressScrollX: true }}>
            {(files.length > 0) ?
            <List className={classes.list}>
              {thumbs}
            </List>
            :
            <List className={classes.list}>
              <ListItem>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={API_URL+companyState.companyRecord.logo} />
                </ButtonBase>
              </ListItem>  
            </List>
            }
        </PerfectScrollbar>
      </Fragment>
    </div>
  );
};

LogoImage.propTypes = {
  className: PropTypes.string
};

export default LogoImage;
