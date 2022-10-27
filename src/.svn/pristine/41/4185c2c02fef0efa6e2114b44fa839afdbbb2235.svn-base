import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  ButtonGroup,
  Button,
  Grid,
  Fab
} from '@material-ui/core';
import { isEmpty, set } from 'lodash';
import { API_URL } from 'configs';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Sidebar from './Sidebar';
import './style.css';
import { forEach } from 'lodash';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { getAssetsById, getEmployeeDetails } from 'actions';
import AssetDetailsModal from './AssetDetailsModal';
import EmployeeDetailsModal from './EmployeeDetailsModal';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  bsuccess: {
    background: theme.palette.bsuccess.main,
    color: theme.palette.bsuccess.contrastText,
    boxShadow: theme.palette.bsuccess.main,
    '&:hover': {
      background: theme.palette.bsuccess.main,
      color: theme.palette.bsuccess.contrastText
    },
    fontSize: '14px'
  },
  bdanger: {
    background: theme.palette.bdanger.main,
    color: theme.palette.bdanger.contrastText,
    boxShadow: theme.palette.bdanger.main,
    '&:hover': {
      background: theme.palette.bdanger.main,
      color: theme.palette.bdanger.contrastText
    },
    fontSize: '14px'
  },
  bgrey: {
    background: theme.palette.blight.main,
    color: theme.palette.blight.contrastText,
    boxShadow: theme.palette.blight.main,
    '&:hover': {
      background: theme.palette.blight.main,
      color: theme.palette.blight.contrastText
    },
    fontSize: '14px'
  },
  fab: {
    position: 'fixed',
    right: 16,
    top: 120,
    zIndex: theme.zIndex.drawer - 100,
    borderRadius: 0,
    height: 150,
    width: 30
  }
}));

const Results = props => {
  const { className, floorPlan, ...rest } = props;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState({
    used: false,
    withoutComputer: false,
    withoutAsset: false
  });

  const assetsState = useSelector(state => state.assetsState);
  const floorPlanState = useSelector(state => state.floorPlanState);
  const [showAssetsDetailModal, setShowAssetsDetailModal] = useState(false);
  const [assetsModalDetail, setAssetsModalDetail] = useState([]);
  const [showEmployeeDetailModal, setShowEmployeeDetailModal] = useState(false);
  const [employeeModalDetail, setEmployeeModalDetail] = useState([]);

  useEffect(() => {
    changeSvgBackground();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  useEffect(() => {
    setAssetsModalDetail(assetsState.assetsRecord);
    if (!isEmpty(assetsState.assetsRecord)) {
      setShowAssetsDetailModal(true);
    }
  }, [assetsState.assetsRecord]);

  useEffect(() => {
    setEmployeeModalDetail(floorPlanState.empDetails);
    if(!isEmpty(floorPlanState.empDetails)){
      setShowEmployeeDetailModal(true);
    }
  }, [floorPlanState.empDetails]);

  const transformRef = useRef(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const changeSvgBackground = () => {
    let workstations = document.getElementsByClassName('wk_background');
    forEach(workstations, function(value) {
      if (
        (checked.withoutAsset === true &&
          value.classList.contains('no_assets')) ||
        (checked.used === true && value.classList.contains('no_employee')) ||
        (checked.withoutComputer === true &&
          value.classList.contains('no_computer'))
      ) {
        value.style.fill = '#ffff66';
      } else {
        value.style.fill = '#cdde87';
      }
    });
  };

  const handleChange = async event => {
    if (floorPlan) {
      await setChecked({
        ...checked,
        [event.target.name]: event.target.checked
      });
    }
  };

  const employeePopoverDiv = (
    emp_id,
    emp_name,
    client_name,
    designation,
    top,
    left
  ) => {
    return `
      <div class='popover_div' id=${emp_id} style='top:${top}px;left:${left}px;'>
        <div class='popover_content'>
          Employee Name: <b>${emp_name}</b> <br>
          Client Name: <b>${client_name}</b> <br>
          Designation: <b>${designation}</b>
        </div>
      </div>
      `;
  };

  window.showEmployeePopover = event => {
    let emp_id = event.attributes.empdtl_emp_id.value;
    let emp_name = event.attributes.empdtl_emp_name.value;
    let client_name = event.attributes.empdtl_client_name.value;
    let designation = event.attributes.empdtl_designation_name.value;
    var offsets = event.getBoundingClientRect();
    var top = offsets.top;
    var left = offsets.left;
    top += window.pageYOffset + 25;
    left += window.pageXOffset;

    var popoverBox = employeePopoverDiv(
      emp_id,
      emp_name,
      client_name,
      designation,
      top,
      left
    );
    document.getElementById('popoverAppend').innerHTML += popoverBox;
  };

  window.hideEmployeePopover = event => {
    let emp_id = event.attributes.empdtl_emp_id.value;
    let element = document.getElementById(emp_id);
    element.remove();
  };

  window.showAssetsPopover = event => {
    let asset_id = event.attributes.astdtl_assets_id.value;
    let asset_name = event.attributes.astdtl_assets_name.value;
    let asset_type_name = event.attributes.astdtl_assets_type_name.value;
    let asset_from = event.attributes.astdtl_assets_from.value;
    let asset_to = event.attributes.astdtl_assets_to.value;
    var offsets = event.getBoundingClientRect();
    var top = offsets.top;
    var left = offsets.left;
    top += window.pageYOffset + 20;
    left += window.pageXOffset;

    var popoverBox = assetPopoverDiv(
      asset_id,
      asset_name,
      asset_type_name,
      asset_from,
      asset_to,
      top,
      left
    );
    document.getElementById('popoverAppend').innerHTML += popoverBox;
  };

  window.hideAssetsPopover = event => {
    let asset_id = event.attributes.astdtl_assets_id.value;
    let element = document.getElementById(asset_id);
    element.remove();
  };

  const assetPopoverDiv = (
    asset_id,
    asset_name,
    asset_type_name,
    asset_from,
    asset_to,
    top,
    left
  ) => {
    return `
      <div class='popover_div' id=${asset_id} style='top:${top}px;left:${left}px;'>
        <div class='popover_content'>
          Asset Name: <b>${asset_name}</b> <br>
          Asset Type: <b>${asset_type_name}</b> <br>
          Assign From: <b>${asset_from}</b> <br>
          Assign To: <b>${asset_to}</b>
        </div>
      </div>
      `;
  };

  window.showAssetsPopup = async (event) => {
    let asset_id = event.attributes.astdtl_assets_id.value;
    await dispatch(getAssetsById(asset_id));
    setShowAssetsDetailModal(true);
  };

  window.showEmployeePopup = async (event) => {
    let emp_id = event.attributes.empdtl_emp_id.value;
    await dispatch(getEmployeeDetails(emp_id));
    setShowEmployeeDetailModal(true);
  }

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"></Typography>
      <Card>
        <CardHeader
          action={
            floorPlan ? (
              <ButtonGroup
                size="small"
                aria-label="small contained button group">
                <Button
                  className={classes.bsuccess}
                  onClick={() => transformRef.current.zoomIn()}>
                  +
                </Button>
                <Button
                  className={classes.bdanger}
                  onClick={() => transformRef.current.zoomOut()}>
                  -
                </Button>
                <Button className={classes.bgrey} href={`${API_URL}floorplanReport/downloadFloorPlan?office_id=1A7B3E7C-A013-42A2-8F75-CE1AA0035D2A`}>
                  Download
                </Button>
              </ButtonGroup>
            ) : (
              ''
            )
          }
          title="Rendered Floor Plan"
        />
        <Divider />
        <CardContent className={classes.content}>
          <Grid container>
            <Grid item xs={12}>
              {floorPlan ? (
                <TransformWrapper
                  defaultScale={1}
                  minScale={1}
                  maxScale={4}
                  step={0.2}
                  ref={transformRef}
                >
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <>
                      <div className="tools" style={{position:'absolute',zIndex:'1'}}>
                        <ButtonGroup size='small'>
                          <Button className={classes.bsuccess} onClick={() => zoomIn()}>Zoom In</Button>
                          <Button className={classes.bdanger} onClick={() => zoomOut()}>Zoom Out</Button>
                          <Button className={classes.bgrey} onClick={() => resetTransform()}>Reset</Button>
                        </ButtonGroup>
                      </div>
                      <TransformComponent>
                        <div
                          id="floor_plan"
                          style={{ overflow: 'scroll', width: '100%' }}
                          dangerouslySetInnerHTML={{ __html: floorPlan }}
                        />
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              ) : (
                ''
              )}
              <div id="popoverAppend"></div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <>
        <Fab
          color="inherit"
          aria-label="open sidebar"
          onClick={handleDrawerToggle}
          className={[classes.fab, 'filter_button']}>
          <span
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'sideways'
            }}>
            <ArrowBackIosIcon />
            &nbsp;
            <span
              style={{
                display: 'inline-block',
                transform: 'rotate(180deg)',
                paddingRight: '3px'
              }}>
              Options
            </span>
            &nbsp;
            <ArrowBackIosIcon />
          </span>
        </Fab>
        <Sidebar
          open={open}
          checked={checked}
          handleDrawerToggle={handleDrawerToggle}
          handleChange={handleChange}
        />
        <AssetDetailsModal
          showAssetsDetailModal={showAssetsDetailModal}
          setShowAssetsDetailModal={setShowAssetsDetailModal}
          assetsModalDetail={assetsModalDetail}
        />
         <EmployeeDetailsModal
          showEmployeeDetailModal={showEmployeeDetailModal}
          setShowEmployeeDetailModal={setShowEmployeeDetailModal}
          employeeModalDetail={employeeModalDetail}
        />
      </>
    </div>
  );
};

export default Results;
