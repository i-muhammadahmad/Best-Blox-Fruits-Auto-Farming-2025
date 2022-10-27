import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyledFab } from 'components';
import { 
  Grid,
  Paper,
  makeStyles,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { isEmpty, find } from 'lodash';
import ReviewImageViewModel from '../ReviewImageViewModel';
import ImageIcon from '@material-ui/icons/Image';
import { API_URL } from 'configs';


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


const AuditView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid container spacing={3} >
      <Grid item xs={12} sm={6}>
        <ActivityLogDetails 
          classes={classes}
        />
      </Grid> 
      <Grid item xs={12} sm={6}>
        <ActivityAuditDetails 
          classes={classes}
        />
      </Grid> 
    </Grid>      
  );
}

export default AuditView;

const ReviewDetails = (props) => {
  const { review, imageViewOnClick, ...rest} = props; 
  const auditErrorCategoryState = useSelector(state => state.auditErrorCategoryState);
  const error_cat = find(auditErrorCategoryState.auditErrorCategoryByClientList, ['id', review.error_category_id]);

  return(
    <TableRow>
      <TableCell > {error_cat.opt_display} </TableCell>
      <TableCell>
        {(!isEmpty(review.image_name)) ?
            <StyledFab
              color="bprimary" aria-label="view"
              size="small"
              onClick={() => { imageViewOnClick(review.image_name) }}
            >
              <ImageIcon />
            </StyledFab>
            : ''
          }
      </TableCell>
    </TableRow>
  );
}  

const ActivityAuditDetails = (props) => {
  const { classes, ...rest} = props; 
  const auditReviewsState = useSelector(state => state.auditReviewsState);
  const [openImageViewModel, setOpenImageViewModel] = useState(false);
  const [imageRecord, setImageRecord] = useState('');

  const imageViewOnClick = (image_name) => {
    let image = API_URL + image_name;
    setImageRecord(image);
    setOpenImageViewModel(true);
  }

  return (
    <>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Audit Details" />
        <CardContent>
          <TableContainer component={Paper} style={{marginBottom:'15px'}}>
            {!isEmpty(auditReviewsState.auditReviewsRecord.review_details)?
              <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell variant="head" > Error Category </TableCell>
                    <TableCell variant="head" > Attachment </TableCell>
                  </TableRow>                    
                </TableHead>
                <TableBody>
                  {auditReviewsState.auditReviewsRecord.review_details.map((review, index) => (
                    <ReviewDetails 
                      review={review}
                      imageViewOnClick={imageViewOnClick}
                    />
                  ))}
                </TableBody>
              </Table>
              :
              ''
            }
          </TableContainer>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Audit Status </TableCell>
                  <TableCell>{'Audited'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Audit By </TableCell>
                  <TableCell>{
                    !isEmpty(auditReviewsState.auditReviewsRecord.updated_by_user)?
                    auditReviewsState.auditReviewsRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Audit At </TableCell>
                  <TableCell>{auditReviewsState.auditReviewsRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Audit Description" />
        <CardContent>    
            <div 
              className="ck-content" dangerouslySetInnerHTML={{ __html: auditReviewsState.auditReviewsRecord.description }} />
        </CardContent>  
      </Card>
      <ReviewImageViewModel
        modalOpen={openImageViewModel}
        handleModalOpen={setOpenImageViewModel}
        imageRecord={imageRecord}
        setImageRecord={setImageRecord}
      />
    </>    
  );
}


const ActivityLogDetails = (props) => {
  const { classes, ...rest} = props; 
  const activityLogState = useSelector(state => state.activityLogState);
  return (
    <>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Log Details" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell variant="head" > Name </TableCell>
                  <TableCell>{activityLogState.activityLogRecord.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Unit Processed </TableCell>
                  <TableCell>{activityLogState.activityLogRecord.activity_units_logged}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Activity </TableCell>
                  <TableCell>{
                    !isEmpty(activityLogState.activityLogRecord.activity_record)?
                    activityLogState.activityLogRecord.activity_record.name:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Activity Category Status </TableCell>
                  <TableCell>{
                    !isEmpty(activityLogState.activityLogRecord.cat_status)?
                    activityLogState.activityLogRecord.cat_status.opt_display:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created By </TableCell>
                  <TableCell>{
                    !isEmpty(activityLogState.activityLogRecord.created_by_user)?
                    activityLogState.activityLogRecord.created_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Created At </TableCell>
                  <TableCell>{activityLogState.activityLogRecord.date_created}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated By </TableCell>
                  <TableCell>{
                    !isEmpty(activityLogState.activityLogRecord.created_by_user)?
                    activityLogState.activityLogRecord.updated_by_user.email:''
                  }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" > Last Updated At </TableCell>
                  <TableCell>{activityLogState.activityLogRecord.date_last_modified}</TableCell>
                </TableRow>
              </TableBody> 
            </Table> 
          </TableContainer>    
        </CardContent>
      </Card> 
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Activity Log Description" />
        <CardContent>    
            <div 
              className="ck-content" dangerouslySetInnerHTML={{ __html: activityLogState.activityLogRecord.description }} />
        </CardContent>  
      </Card>
    </>    
  );
}
