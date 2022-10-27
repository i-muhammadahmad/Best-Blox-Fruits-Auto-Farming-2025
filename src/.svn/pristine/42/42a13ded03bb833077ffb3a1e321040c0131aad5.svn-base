import React, { Fragment, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  colors,
  ButtonBase,
} from '@material-ui/core';
import { API_URL } from 'configs';
import bytesToSize from 'utils/bytesToSize';
import { StyledFab, StyledButton } from 'components';
import { isEmpty, assign } from 'lodash';
import { dzDefaultConfig } from 'configs';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles(theme => ({
  root: {},
  dropZone: {
    border: `5px dashed ${theme.palette.divider}`,
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
  image: {
    width: 130,
    height: 'auto'
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
    justifyContent: 'space-between',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
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

const FilesDropzone = props => {
  const { className, files, setFiles, title, secondaryTitle, dzFileIcon, customDZconfigs, thumbsAt, showThumbs, showUploadbtn, uploadAllCallback, serverRejectedFiles, ...rest } = props;

  const classes = useStyles();
  const [rejectedFiles, setRejectedFiles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRejectedFiles([]);
    }, 15000);
    return () => clearTimeout(timer);
  }, [rejectedFiles]);
  
  useEffect(() => {
    if(!isEmpty(serverRejectedFiles)){
      setRejectedFiles(serverRejectedFiles);
    }  
    
  }, [serverRejectedFiles]);

  const handleDropAccepted = useCallback((acceptedFiles, event ) => {
    setRejectedFiles([]);
    setFiles(acceptedFiles);
  }, []);

  const handleDropRejected = useCallback((fileRejections, event ) => {
    setRejectedFiles(fileRejections);
  }, []);

  let genral_config = { onDropAccepted: handleDropAccepted, onDropRejected: handleDropRejected }
  let dzconfig = dzDefaultConfig();
  dzconfig = assign(dzconfig, genral_config);
  dzconfig = assign(dzconfig, customDZconfigs);

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const removeFile = async (e, i) => {
    e.preventDefault();
    let files_arr = {...files};
    await delete files_arr[i];
    await setFiles(Object.values(files_arr));
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dzconfig);

  const DZFileIconDefault = () => (
    <img
      alt="Select file"
      className={classes.image}
      src="/images/undraw_add_file2_gvbb.svg"
    />
  )

  const thumbs = (file, i) => {
    if(file.type.includes('image')){
      return(
        <>
          <ListItemIcon>
            <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                <img
                  src={URL.createObjectURL(file)}
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
          <IconButton edge="end" onClick={(e)=>{ removeFile(e, i) }} >
            <StyledFab
              color="bdanger"
              aria-label="edit"
              size="small"
            >
              <DeleteIcon size="small"  />
            </StyledFab> 
          </IconButton>
        </>
      )  
    }
    else{
      return(
        <>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText
            primary={file.name}
            primaryTypographyProps={{ variant: 'h5' }}
            secondary={bytesToSize(file.size)}
          />
          <Tooltip title="Delete">
            <IconButton edge="end" onClick={(e)=>{ removeFile(e, i) }} >
              <StyledFab
                color="bdanger"
                aria-label="edit"
                size="small"
              >
                <DeleteIcon size="small"  />
              </StyledFab>
            </IconButton>
          </Tooltip>
        </>
      )
    }    
  }

  const fileRejectionItems = rejectedFiles.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul style={{paddingLeft: '40px'}}>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={(thumbsAt === 'right')? 8 : 12 } >
          <div
            className={clsx({
              [classes.dropZone]: true,
              [classes.dragActive]: isDragActive
            })}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div>
              {((typeof dzFileIcon === 'function')) ?
                <>{dzFileIcon()}</>
                :
                <>{DZFileIconDefault()}</>
              }
            </div>
            <div>
              <Typography
                gutterBottom
                variant="h3"
              >
                {isEmpty(title)? 
                  'Select files'
                  : title
                }  
              </Typography>
              <Typography
                className={classes.info}
                color="textSecondary"
                variant="body1"
              >
                {isEmpty(secondaryTitle)? 
                  <>
                    Drop files here or click <Link underline="always">browse</Link>{' '}
                    thorough your machine
                  </>
                  : secondaryTitle
                } 
              </Typography>
            </div>
          </div>
        </Grid>  
        <Grid item xs={12} sm={(thumbsAt === 'right')? 4 : 12 }>
          {(showThumbs && files.length > 0) && (
            <div>
              <PerfectScrollbar options={{ suppressScrollX: true }}>
                <List className={classes.list}>
                  {files.map((file, i) => (
                    <ListItem
                      divider={i < files.length - 1}
                      key={uuid()}
                    >
                      {thumbs(file, i)}
                    </ListItem>
                  ))}
                </List>
              </PerfectScrollbar>
              <div className={classes.actions}>
                {(files.length > 0 && (showUploadbtn === true) ) && (
                  <StyledButton
                    onClick={(e)=> { uploadAllCallback(e) }}
                    size="small"
                    color="bprimary"
                    startIcon={<ArrowUpwardIcon />}
                  >
                    Upload all
                  </StyledButton>
                )} 
                {(files.length > 1) && (
                  <StyledButton
                    onClick={handleRemoveAll}
                    size="small"
                    color="bdanger"
                    startIcon={<DeleteIcon />}
                  >
                    Remove all
                  </StyledButton>
                )}  
              </div>
            </div>
          )}
          {rejectedFiles.length > 0 && (
            <div>
              <PerfectScrollbar options={{ suppressScrollX: true }}>
                <div style={{maxHeight: '320px', marginTop: '10px'}}>
                  <h4 style={{color: "rgb(220, 53, 69)"}}><b>Rejected files</b></h4>
                  <ul style={{ paddingLeft: '40px', color: "rgb(220, 53, 69)"}} >{fileRejectionItems}</ul>
                </div>
              </PerfectScrollbar>
            </div>
          )}
        </Grid>
      </Grid>  
    </div>
  );
};

FilesDropzone.propTypes = {
  className: PropTypes.string,
  files: PropTypes.any.isRequired,
  setFiles: PropTypes.any.isRequired
};

FilesDropzone.defaultProps = {
  title: '',
  secondaryTitle: '',
  dzFileIcon: '',
  dzconfigs: {},
  showThumbs: true,
  thumbsAt: 'bottom',
  showUploadbtn: false,
  uploadAllCallback: () => { /*nothing to do*/ },
  serverRejectedFiles: []
};

export default FilesDropzone;
