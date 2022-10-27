import React, {useEffect} from 'react';
import { Page } from 'components';
import useRouter from 'utils/useRouter';
import {
  Header
} from './components'; 
import { 
  makeStyles,
  Paper,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const TicketsCategoryView = () => {
  const classes = useStyles();
  const router = useRouter();
  const ticketsCategoryState = useSelector(state => state.ticketsCategoryState);
  const dispatch = useDispatch();

  useEffect(() => {
    if(ticketsCategoryState.redirect_to_list){
      router.history.push('/tickets-category');
    } 
  }, [ticketsCategoryState.redirect_to_list, router.history]);

  useEffect(()=> {
    if(!ticketsCategoryState.showUpdateForm && !ticketsCategoryState.showViewPage){
      router.history.push('/tickets-category');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ticketsCategoryState.showViewPage, ticketsCategoryState.showUpdateForm]);

  return (
    <Page
      className={classes.root}
      title="Tickets Category View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Tickets Category View" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Ticket Category Name </TableCell>
                  <TableCell>{ticketsCategoryState.ticketsCategoryRecord.category_name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(ticketsCategoryState.ticketsCategoryRecord.created_by_user)?
                    ticketsCategoryState.ticketsCategoryRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{ticketsCategoryState.ticketsCategoryRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(ticketsCategoryState.ticketsCategoryRecord.created_by_user)?
                    ticketsCategoryState.ticketsCategoryRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{ticketsCategoryState.ticketsCategoryRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Ticket Category Description" />
        <CardContent>
          <div 
            className="ck-content" dangerouslySetInnerHTML={{ __html: ticketsCategoryState.ticketsCategoryRecord.description }} 
          />  
        </CardContent>  
      </Card>   
    </Page>  
  );
}

export default TicketsCategoryView;