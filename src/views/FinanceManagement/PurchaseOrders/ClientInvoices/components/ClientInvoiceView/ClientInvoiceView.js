import React from 'react';
import { API_URL } from 'configs';
import CancelIcon from '@material-ui/icons/Cancel';
import { 
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Grid,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';
import {
  redirectToClientInvoicesList
} from 'actions'
import { useSelector, useDispatch } from 'react-redux';
import { StyledButton } from 'components';
import { isEmpty } from 'lodash';
import FileDownloadIcon from '@material-ui/icons/GetApp';

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


const ClientInvoiceView = (props) => {
  const { 
    ...rest
  } = props;

  const classes = useStyles();
  const clientInvoicesState = useSelector(state => state.clientInvoicesState);
  const dispatch = useDispatch();

  return (
    <div>
      <Grid
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
        </Grid>
        <Grid item>
          <StyledButton
              variant="contained"
              color="blight"
              size="small"
              onClick={ ()=>{ dispatch(redirectToClientInvoicesList()) } }
              startIcon={<CancelIcon />}
            >
              CLOSE
          </StyledButton>
        </Grid>
      </Grid>    
      <Card style={{marginTop:'10px'}}>
        <CardHeader
          title={"Client Invoices Details"}
        />
        <Divider />
        <CardContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {!isEmpty(clientInvoicesState.clientInvoicesRecord.attachment)?
                <a 
                  
                  href={API_URL + clientInvoicesState.clientInvoicesRecord.attachment} 
                  download
                >
                  <StyledButton
                    color="bsuccess"
                    variant="contained"
                    startIcon={<FileDownloadIcon />}
                  >
                    Download Attachment
                  </StyledButton>
                </a>  
                : ''
              }  
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > Invoice No </TableCell>
                      <TableCell>{ clientInvoicesState.clientInvoicesRecord.invoice_no }</TableCell>
                    </TableRow>
                    <TableRow>  
                      <TableCell variant="head" > Invoice Date </TableCell>
                      <TableCell>{clientInvoicesState.clientInvoicesRecord.invoice_date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Invoice Status </TableCell>
                      <TableCell>{clientInvoicesState.clientInvoicesRecord.status}</TableCell>
                    </TableRow>
                    <TableRow>  
                      <TableCell variant="head" > Period Start Date </TableCell>
                      <TableCell>{clientInvoicesState.clientInvoicesRecord.invoice_period_start}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Period End Date </TableCell>
                      <TableCell>{clientInvoicesState.clientInvoicesRecord.invoice_period_end}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>  
            <Grid item xs={12} sm={6}>  
              <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > Created By </TableCell>
                      <TableCell>{
                        !isEmpty(clientInvoicesState.clientInvoicesRecord.created_by_user)?
                        clientInvoicesState.clientInvoicesRecord.created_by_user.email:''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" style={{whiteSpace:'nowrap'}} > Created At </TableCell>
                      <TableCell>{clientInvoicesState.clientInvoicesRecord.date_created}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated By </TableCell>
                      <TableCell>{
                        !isEmpty(clientInvoicesState.clientInvoicesRecord.updated_by_user)?
                        clientInvoicesState.clientInvoicesRecord.updated_by_user.email:''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" style={{whiteSpace:'nowrap'}} > Last Updated At </TableCell>
                      <TableCell>{clientInvoicesState.clientInvoicesRecord.date_last_modified}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>  
        </CardContent>
      </Card>   
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Client Invoices" />
        <Divider />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: clientInvoicesState.clientInvoicesRecord.notes }}
          />
        </CardContent>  
      </Card>
    </div>
  );
}

export default ClientInvoiceView;