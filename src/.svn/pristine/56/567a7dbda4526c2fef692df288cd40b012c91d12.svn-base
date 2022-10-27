import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  TextField,
  makeStyles,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Grid,
  Paper,
  IconButton,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography
} from '@material-ui/core';
import { StyledButton } from 'components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from 'configs';
import { isEmpty, forEach } from 'lodash';
import FlagIcon from '@material-ui/icons/Flag';
import moment from 'moment';
import ClearIcon from '@material-ui/icons/Clear';
import {
  saveFalsePositive
} from 'actions';

const useStylesModal = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  small_img: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    display: 'inline-block'
  },
}));

const gridListStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const modelCustomStyles = {
  header: {
    backgroundColor: 'white',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  modelTitleRed: {
    backgroundColor: '#dc3545',
    color: 'white'
  },
  modelTitleOrange: {
    backgroundColor: '#ff6600',
    color: 'white'
  },
  modelTitleYellow: {
    backgroundColor: '#fff200',
    color: 'white'
  },
  modelTitleGreen: {
    backgroundColor: '#28a745',
    color: 'white'
  },
}

const FlagImagesViewModel = (props) => {
  const {
    modalOpen,
    handleModalOpen,
    empRecord,
    setEmpRecord,
    currentTimeSlot,
    setCurrentTimeSlot
  } = props;

  const dispatch = useDispatch();
  const userReportState = useSelector(state => state.userReportState);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [flagType, setFlagType] = React.useState('');
  const [modelTitleClass, setModelTitleClass] = React.useState('');
  const [selectedRecord, setSelectedRecord] = React.useState([]);
  const [flagRecords, setFlagRecords] = React.useState([]);
  const [openClearFlagModel, setOpenClearFlagModel] = React.useState(false);
  const classes = useStylesModal();
  const grid_classes = gridListStyles();

  useEffect(() => {
    if (userReportState.is_flag_cleared === true) {
      hideClearFlagModel();
      handleClose();
    }
  }, [userReportState.is_flag_cleared]);

  useEffect(() => {
    if (modalOpen === false) {
      setEmpRecord([]);
      setCurrentTimeSlot('');
      setSelectedRecord([]);
      setFlagType('');
    }
  }, [modalOpen]);

  useEffect(() => {
    if (!isEmpty(flagRecords)) {
      showFlag(flagRecords[0]['flags_record'])
    }
  }, [flagRecords]);

  useEffect(() => {
    let flag_records = [];
    if (!isEmpty(empRecord)) {
      if (!isEmpty(empRecord.clock_in_images_org['red']) && !isEmpty(empRecord.clock_in_images_org['red'][currentTimeSlot])) {
        forEach(empRecord.clock_in_images_org['red'][currentTimeSlot], function (value, key) {
          let record = [];
          let flag_images = getRedFlagImage(value);
          record['flag_images_html'] = flag_images;
          record['flags_record'] = value;
          flag_records.push(record);
        });
        setFlagRecords(flag_records);
      }
      if (!isEmpty(empRecord.clock_in_images_org['orange']) && !isEmpty(empRecord.clock_in_images_org['orange'][currentTimeSlot])) {
        forEach(empRecord.clock_in_images_org['orange'][currentTimeSlot], function (value, key) {
          let record = [];
          let flag_images = getOrangeFlagImage(value);
          record['flag_images_html'] = flag_images;
          record['flags_record'] = value;
          flag_records.push(record);
        });
        setFlagRecords(flag_records);
      }
      if (!isEmpty(empRecord.clock_in_images_org['yellow']) && !isEmpty(empRecord.clock_in_images_org['yellow'][currentTimeSlot])) {
        forEach(empRecord.clock_in_images_org['yellow'][currentTimeSlot], function (value, key) {
          let record = [];
          let flag_images = getYellowFlagImage(value);
          record['flag_images_html'] = flag_images;
          record['flags_record'] = value;
          flag_records.push(record);
        });
        setFlagRecords(flag_records);
      }
      if (!isEmpty(empRecord.clock_in_images_org['green']) && !isEmpty(empRecord.clock_in_images_org['green'][currentTimeSlot])) {
        forEach(empRecord.clock_in_images_org['green'][currentTimeSlot], function (value, key) {
          let record = [];
          let flag_images = getGreenFlagImage(value);
          record['flag_images_html'] = flag_images;
          record['flags_record'] = value;
          flag_records.push(record);
        });
        setFlagRecords(flag_records);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empRecord]);

  const showClearFlagModel = () => {
    setOpenClearFlagModel(true)
  }

  const hideClearFlagModel = () => {
    setOpenClearFlagModel(false)
  }

  const clearFlag = () => {
    dispatch(saveFalsePositive(selectedRecord.id))
  }

  const handleClose = () => {
    handleModalOpen(false);
  };

  const showFlag = (c_record) => {
    setSelectedRecord(c_record);
    setFlagType(c_record.flag_type);
    if (c_record.flag_type === 'red') {
      setModelTitleClass('modelTitleRed');
    }
    else if (c_record.flag_type === 'orange') {
      setModelTitleClass('modelTitleOrange');
    }
    else if (c_record.flag_type === 'green') {
      setModelTitleClass('modelTitleGreen');
    }
    else {
      setModelTitleClass('modelTitleYellow');
    }
  }
  
  const getFlagMessage = () => {
    if (selectedRecord.flag_type === 'red') {
      return (
        <>
          <span > <b>{moment(selectedRecord.date_created).format('MMM DD, YYYY h:mm a')} </b>
          </span ><br />
          <span ><b>Flag Alert:</b> Image captured does not match known image of employee.</span ><br />
          <span>Possible Data Privacy and Confidentiality Violation</span>
          <span > <b>Required Action: Immediate validation</b> - Was the image captured that of the employee? </span >
          <ul style={{ paddingLeft: '14px' }}>
            <li>If the system flagged the image in error, please click on the “Clear Flag” button.</li>
            <li>If image was flagged correctly, please continue with documentation:
              <ul style={{ paddingLeft: '14px' }}>
                <li>Save screen shot of the image captured with the time stamp visible</li>
              </ul>
            </li>
            <li>Contact the employee and require verbal explanation of why image captured does not match</li>
            <li>Send email report:
              <ul style={{ paddingLeft: '14px' }}>
                <li><b>to:</b> Client Manager</li>
                <li><b>cc:</b> Compliance Manager, HR Manager </li>
                <li><b>Email subject:</b>  V.I.E.W Red Flag Alert</li>
                <li>Body of the email should Include employee explanation</li>
                <li><b>Attachment:</b>  screen shot</li>
              </ul>
            </li>

          </ul>
        </>
      );
    }
    else if (selectedRecord.flag_type === 'orange') {
      return (
        <>
          <span >
            <b>Flag Alert:</b> Image captured contains multiple face.
          </span ><br />
          <span> Possible Data Privacy and Confidentiality Violation </span><br />
          <span > <b>Required Action: Immediate validation</b> - Was the image captured that of the employee? </span >
          <ul style={{ paddingLeft: '14px' }}>
            <li>If the system flagged the image in error, please click on the “Clear Flag” button.</li>
            <li>If image was flagged correctly, please continue with documentation:
              <ul style={{ paddingLeft: '14px' }}>
                <li>Save screen shot of the image captured with the time stamp visible</li>
              </ul>
            </li>
            <li>Contact the employee and require verbal explanation of why image captured does not match</li>
            <li>Send email report:
              <ul style={{ paddingLeft: '14px' }}>
                <li><b>to:</b> Client Manager</li>
                <li><b>cc:</b> Compliance Manager, HR Manager </li>
                <li><b>Email subject:</b>  V.I.E.W Red Flag Alert</li>
                <li>Body of the email should Include employee explanation</li>
                <li><b>Attachment:</b>  screen shot</li>
              </ul>
            </li>

          </ul>
        </>
      );
    }
    else if (selectedRecord.flag_type === 'green') {
      return (
        <>
          <span > 
            <b>{moment(selectedRecord.date_created).format('MMM DD, YYYY h:mm a')} </b>
          </span ><br />
          <span ><b>Flag Description:</b> Image captured contains employee. </span ><br />
          <span><b>Possible Productivity Concern:</b> N/A </span><br />
          <span > <b>Required Action: N/A</b>  </span >
          <ul style={{ paddingLeft: '14px' }}>

          </ul>
        </>
      );
    }
    else {
      return (
        <>
          <span > 
            <b>{moment(selectedRecord.date_created).format('MMM DD, YYYY h:mm a')} </b>
          </span ><br />
          <span ><b>Flag Alert:</b> Image captured does not contain a face. </span ><br />
          <span><b>Possible Productivity Concern:</b> Employee is not at work station. </span><br />
          <span > <b>Required Action: Immediate validation</b> - Was the image captured that of the employee? </span >
          <ul style={{ paddingLeft: '14px' }}>
            <li>If the system flagged the image in error, please click on the “Clear Flag” button.</li>
            <li>If image was flagged correctly, please continue with documentation:
              <ul style={{ paddingLeft: '14px' }}>
                <li>Save screen shot of the image captured with the time stamp visible</li>
              </ul>
            </li>
            <li>Contact the employee and require verbal explanation of why image captured does not match</li>
            <li>Send email report:
              <ul style={{ paddingLeft: '14px' }}>
                <li><b>to:</b> Client Manager</li>
                <li><b>cc:</b> Compliance Manager, HR Manager </li>
                <li><b>Email subject:</b>  V.I.E.W Red Flag Alert</li>
                <li>Body of the email should Include employee explanation</li>
                <li><b>Attachment:</b>  screen shot</li>
              </ul>
            </li>

          </ul>
        </>
      );
    }
  }

  const getRedFlagImage = (flag_record) => {
    return (
      <>
        <img style={{width: '100%', objectFit: 'cover'}} src={API_URL + flag_record.image_path} alt="Clock In Image" />
        <GridListTileBar
          title={'Red Flag'}
          titlePosition="top"
          classes={{
            root: grid_classes.titleBar,
            title: grid_classes.title,
          }}
          actionIcon={
            <IconButton aria-label={`star ${'Red Flag'}`} style={{ color: '#dc3545' }}>
              <FlagIcon />
            </IconButton>
          }
          actionPosition="left"
        />
      </>
    )
  }

  const getOrangeFlagImage = (flag_record) => {
    return (
      <>
        <img style={{width: '100%', objectFit: 'cover'}} src={API_URL + flag_record.image_path} alt="Clock In Image" />
        <GridListTileBar
          title={'Orange Flag'}
          titlePosition="top"
          classes={{
            root: grid_classes.titleBar,
            title: grid_classes.title,
          }}
          actionIcon={
            <IconButton aria-label={`star ${'Orange Flag'}`} style={{ color: '#ff6600' }}>
              <FlagIcon />
            </IconButton>
          }
          actionPosition="left"
        />
      </>
    )
  }

  const getYellowFlagImage = (flag_record) => {
    return (
      <>
        <img style={{width: '100%', objectFit: 'cover'}} src={API_URL + flag_record.image_path} alt="Clock In Image" />
        <GridListTileBar
          title={'Yellow Flag'}
          titlePosition="top"
          classes={{
            root: grid_classes.titleBar,
            title: grid_classes.title,
          }}
          actionIcon={
            <IconButton aria-label={`star ${'Notic Flag'}`} style={{ color: '#fff200' }}>
              <FlagIcon />
            </IconButton>
          }
          actionPosition="left"
        />
      </>
    )
  }

  const getGreenFlagImage = (flag_record) => {
    return (
      <>
        <img style={{width: '100%', objectFit: 'cover'}} src={API_URL + flag_record.image_path} alt="Clock In Image" />
        <GridListTileBar
          title={'Green Flag'}
          titlePosition="top"
          classes={{
            root: grid_classes.titleBar,
            title: grid_classes.title,
          }}
          actionIcon={
            <IconButton aria-label={`star ${'Green Flag'}`} style={{ color: '#28a745' }}>
              <FlagIcon />
            </IconButton>
          }
          actionPosition="left"
        />
      </>
    )
  }

  return (
    <div>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        fullWidth={true}
        maxWidth={'md'}
        open={modalOpen}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogTitle id="form-dialog-title"
          style={{
            ...modelCustomStyles.header,
            ...(modelTitleClass !== '' ? modelCustomStyles[modelTitleClass] : {}),
          }}
        >
          <span
            style={{
              ...(modelTitleClass !== '' ? { color: 'White' } : {}),
            }}
          >
            {!isEmpty(selectedRecord) ? selectedRecord.flag_type + ' Flag' : ''}
          </span><br />
          <span
            style={{
              ...(modelTitleClass !== '' ? { color: 'White' } : {}),
            }}
          >
            {!isEmpty(selectedRecord && selectedRecord.alert_level != 'normal') ? 'Alert Level: ' + selectedRecord.alert_level : ''}
          </span>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} style={{ marginBottom: '10px' }}>
            <Grid item xs={12} sm={7}>
              <Paper elevation={3} style={{ textAlign: 'center' }}>
                <img style={{ width: '100%', height: 'auto', padding: '10px' }} alt="Clock In Image" src={!isEmpty(selectedRecord.image_path) ? API_URL + selectedRecord.image_path : ''} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper elevation={0} style={{ marginBottom: '10px', textAlign: 'right' }}>
                {(selectedRecord.flag_type !== 'green')?
                  <StyledButton
                    color="bdanger"
                    size="small"
                    type="button"
                    variant="contained"
                    startIcon={<ClearIcon />}
                    onClick={() => { showClearFlagModel() }}
                  >
                    Clear Flag
                  </StyledButton>
                  : ''
                }  
              </Paper>  
              <Paper elevation={3} style={{ height: '360px', overflowY: 'scroll' }}>
                <Typography variant="body1" style={{ padding: '10px' }} >
                  {getFlagMessage()}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <div className={grid_classes.root}>
            {!isEmpty(empRecord.clock_in_images_org) ?
              <GridList className={grid_classes.gridList} cols={3.5}>
                {flagRecords.map((f_Record, id) => (
                  <GridListTile
                    key={f_Record.flags_record.id}
                    onClick={() => showFlag(f_Record.flags_record)}
                    style={{
                      ...{ cursor: 'pointer' },
                      ...(f_Record.flags_record.id === selectedRecord.id ? { border: '5px solid blue' } : {}),
                    }}
                  >
                    {f_Record.flag_images_html}
                  </GridListTile>
                ))}
              </GridList>
              : ''
            }
          </div>
        </DialogContent>
        <DialogActions>
          <StyledButton
            variant="contained"
            color="bsecondary"
            size="small"
            className={classes.button}
            startIcon={<CancelIcon />}
            onClick={handleClose}
          >
            CLOSE
          </StyledButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openClearFlagModel}
        onClose={hideClearFlagModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ backgroundColor: '#dc3545' }}>
          <span style={{ color: 'white' }}> Clear Flag </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to clear the flag? <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={hideClearFlagModel}   >
            Cancel
          </StyledButton>
          <StyledButton
            variant="contained"
            color="bdanger"
            startIcon={<ClearIcon />}
            onClick={clearFlag}
            autoFocus={true}
          >
            Clear Flag
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FlagImagesViewModel;