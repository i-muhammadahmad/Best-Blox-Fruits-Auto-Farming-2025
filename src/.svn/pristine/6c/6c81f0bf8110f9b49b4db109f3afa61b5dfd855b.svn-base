import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes, { object } from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableContainer,
  Paper,
  TableCell,
  Avatar,
  Grid,
  Chip
} from '@material-ui/core';
import { GenericMoreButton, StyledChip, TableEditBar } from 'components';
import { isEmpty } from 'lodash';
import { API_URL } from 'configs'
import { CircularProgressWithLabel } from '..';
import SeatsDetailModal from './../SeatsDetailModal';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700,
    margin: '10px'
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 50,
    width: 50,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  },
  labelSmall:{
    paddingLeft:'2px',
    paddingRight:'2px'
  },
  chipRoot:{
    marginLeft:'1px',
    width:'34px',
    fontSize:'10px',
    fontWeight:'bold'
  },
  mt_3:{
    marginTop:'3px'
  },
  mt_8:{
    marginTop:'8px'
  },
  ml_8:{
    marginLeft:'8px'
  }
}));

const Results = props => {
  const { className, seatsData, ...rest } = props;
  const [showSeatsDetailModal, setShowSeatsDetailModal] = useState(false);
  const [seatsModalDetail, setSeatsModalDetail] = useState({
    title: 'Headcount Details of Day, Hour',
    client_detail: {}
  });

  const classes = useStyles();

  const getHours = (dayName) => {
    let hoursList = []
    Object.keys(seatsData[dayName]['hrs']).sort().map((hdata,hindex) => {
      hoursList.push(<Chip size="small" key={hindex} label={hdata} classes={{label:classes.labelSmall,root:classes.chipRoot}} style={{backgroundColor:'#343a40',color:'#fff'}}/>)
    })
    return(hoursList);
  }

  const getSeatsPerHour = (data) => {
    let seats = [];
    for(let i=0; i<=23; i++){
      if(i <= 9){
        i = "0"+i;
      }
      seats.push(<Chip size="small" onClick={() => {handleModalOpen(data, i, seatsData[data]['hrs'][i]['client_total'])}} key={i} label={seatsData[data]['hrs'][i]['headcount_total']} classes={{label:classes.labelSmall,root:classes.chipRoot}} style={{backgroundColor:'#00a65a',color:'#fff'}}/>);
    }
    return(seats);
  }

  const getTotalSeats = (data) => {
    let seats = [];
    for(let i=0; i<=23; i++){
      if(i <= 9){
        i = "0"+i;
      }
      seats.push(<Chip size="small" label={seatsData[data]['hrs'][i]['vacant_total']} classes={{label:classes.labelSmall,root:classes.chipRoot}} style={{backgroundColor:'#0073b7',color:'#fff'}}/>)
    }
    return(seats);
  }

  const getFreePercentage = (data) => {
    let seats = [];
    for(let i=0; i<=23; i++){
      if(i <= 9){
        i = "0"+i;
      }
      seats.push(<Chip size="small" label={seatsData[data]['hrs'][i]['vacant_percent_total']} classes={{label:classes.labelSmall,root:classes.chipRoot}} />)
    }
    return(seats);
  }

  const handleModalOpen = async (day, hour, client_details) => {
    await setSeatsModalDetail({
      title: `Headcount Details of ${day}, ${hour}`,
      client_detail: client_details
    })
    await setShowSeatsDetailModal(true)
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
          action={<GenericMoreButton />}
          title="Seats Utilization Report"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              {Object.keys(seatsData).map((data,index) => (
                <Grid key={index} container spacing={2} style={{border:'1px solid #e0e0e0',marginTop:'5px',marginBottom:'5px'}}>
                  <Grid item xs={1}>
                    <div>
                      <StyledChip size="small" color="bdark" label="US EST Time" />
                    </div>
                    <div className={classes.mt_3}>
                      <StyledChip size="small" color="bprimary" label={data} />
                    </div>
                    <div className={classes.mt_8}>
                      Vaccant
                    </div>
                    <div className={classes.mt_8}>
                      Vaccant %
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    <div className={classes.ml_8}>
                      <div>
                        {getHours(data)}
                      </div>
                      <div className={classes.mt_3}>
                        <div>
                          {getSeatsPerHour(data)}
                        </div>
                      </div>
                      <div className={classes.mt_3}>
                        {getTotalSeats(data)}
                      </div>
                      <div className={classes.mt_3}>
                        {getFreePercentage(data)}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <CircularProgressWithLabel value={parseFloat(seatsData[data]['total_occupied_percent'])} />
                  </Grid>
                </Grid>
              ))}
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
      <SeatsDetailModal
        showSeatsDetailModal={showSeatsDetailModal}
        setShowSeatsDetailModal={setShowSeatsDetailModal}
        seatsModalDetail={seatsModalDetail}
        setSeatsModalDetail={setSeatsModalDetail}
      />
    </div>
  );
};

export default Results;
