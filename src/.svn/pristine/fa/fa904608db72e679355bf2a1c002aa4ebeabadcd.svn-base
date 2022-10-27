import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@material-ui/core';
import { find, isEmpty } from 'lodash';

const getPageMargins = () => {
  return `@page { size: auto !important;  margin: 0mm !important; }`;
};

const getAssetAttributeValue = (attr, asset_record) => {
  //getting asset detail
  let asset_dtl = find(asset_record.asset_details, ['attr_id', attr.id]);
  return (
    <span>
      {(!isEmpty(asset_dtl)) ? asset_dtl.attr_value : ''}
    </span>
  );
}

const getAssetsAttributesHtml = (asset_record, asset_type) => {

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="Asset Attributes Tables">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} >
              Details
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asset_record.asset_type.asset_attributes.map((attr, index) => (
            <TableRow key={attr.attr_id} >
              <TableCell variant="head" style={{ backgroundColor: '#fafafa', color: '#263238' }}>
                {attr.field_name}
              </TableCell>
              <TableCell >
                {getAssetAttributeValue(attr, asset_record)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const getAssetsHtml = (asset_record) => {
  return (
    <TableContainer component={Paper} >
      <Table size="small" aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell variant="head" style={{backgroundColor: '#fafafa', color: '#263238'}} > Name </TableCell>
            <TableCell>{asset_record.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" style={{backgroundColor: '#fafafa', color: '#263238'}} > Asset Type </TableCell>
            <TableCell>{
              !isEmpty(asset_record.asset_type) ?
                asset_record.asset_type.name : ''
            }</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head" style={{backgroundColor: '#fafafa', color: '#263238'}} > Assigned Date </TableCell>
            <TableCell>{asset_record.asset_assigned_from}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const getEmployeeName = (asset_record) => {
  let emp_name = '';
  if (!isEmpty(asset_record.employee)) {
    emp_name = asset_record.employee.firstname + " " + asset_record.employee.middlename + " " + asset_record.employee.lastname
  }
  return emp_name;
}

export default class AccountabilityForm extends React.PureComponent {

  render() {
    return (
      <div
        style={{ margin: '15mm 10mm 15mm 10mm' }}
      >
        <style>
          {getPageMargins()}
        </style>
        <Grid container spacing={3}>
          <Grid item xs={3} sm={3}>
            <div style={{ width: '256px', height: '100%', display: 'flex', alignItems: 'center' }}>
              <img
                alt="Logo"
                src="/images/logos/premierbpo_logo.png"
                style={{ height: '70px' }}
              />
            </div>
          </Grid>
          <Grid item xs={9} sm={9}>
            <h2 style={{ textAlign: 'center', height: '70px', lineHeight: '70px' }}> Accountability Form </h2>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <h4 > Employee Name:  <span style={{ textDecoration: 'underline' }}> {getEmployeeName(this.props.AssetRecord)} </span></h4>
            <p > <b>Policies and Agreement:</b>  </p>
            <p > All equipment and accessories are property of and are provided to the employees for a period of time as deemed appropriate by the company's administration, As a condition of their use of the Premier BPO equipment / accessories, employees must comply with and agree to all of the following.  </p>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            {getAssetsHtml(this.props.AssetRecord, this.props.AssetTypeValue)}
          </Grid>
          <Grid item xs={6} sm={6}>
            {!isEmpty(this.props.AssetRecord.asset_type.asset_attributes) ?
              <>
                {getAssetsAttributesHtml(this.props.AssetRecord, this.props.AssetTypeValue)}
              </>
              : ''
            }
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <ul>
              <li > I understand that all equipment, and/or accessories the company has provided to me are the property of Premier BPO. I agree to all of the terms in the Premier BPO Accountability Policy.</li>
              <li > I will return the equipment to the company in the same condition in which it was provided to me. </li>
              <li > I understand that I am personally responsible for any damage to or loss of any company issued equipment and accessories. In case of damage or loss I will replace or pay the full cost of replacement of the damaged or lost equipment with equipment of equal value or amount thru salary deduction.</li>
              <li > I will not install any additional software or change the configuration of the equipment in any way without prior consultation with I.T. department.</li>
              <li > I will not allow any other individuals to use any equipment and accessories that have been provided to me by the company.</li>
              <li > I understand that a violation of the terms and conditions set out in the policy will result in the restriction and/or termination of company issued equipment, and/or accessories and may result in further discipline up to and including termination of employment and/or other legal action.</li>
              <br />
              <li > Received the items stated above in good condition.</li>
              <li >I understand and agree on the terms stated in this policy.</li>
            </ul>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={4}>
            <br /><br />
            <p style={{ borderBottom: '1px solid black' }}>&nbsp;</p>
            <p>Signature over printed name / Date Employee</p>
          </Grid>
          <Grid item xs={4} sm={4}>
          </Grid>
          <Grid item xs={4} sm={4}>
            <br /><br />
            <p style={{ borderBottom: '1px solid black' }}>&nbsp;</p>
            <p> Signature over printed name for clearance I.T - NOC</p>
          </Grid>
        </Grid>
      </div>
    );
  }
};

/*AccountabilityForm.propTypes = {
  className: PropTypes.string
};

export default AccountabilityForm;*/
