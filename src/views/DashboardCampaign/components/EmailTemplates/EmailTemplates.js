import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';
import { EmailTemplateItem } from './components';
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: '0px'
  },
  content: {
    padding: '15px',
    paddingBottom: '0px !important'
  },
  inner: {
    minWidth: 400
  },
}));

const EmailTemplates = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const [emailTemplates, setEmailTemplates] = useState([]);

  const dashboardCampaignState = useSelector(state => state.dashboardCampaignState);

  useEffect(() => {
    setEmailTemplates(dashboardCampaignState.campaignSummary.email_templates);
  }, [dashboardCampaignState.campaignSummary]);

  useEffect(() => {
    setEmailTemplates(dashboardCampaignState.campaignSummary.email_templates);
  }, []);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Email Templates"
      />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <Carousel
            fullHeightHover={false}     // We want the nav buttons wrapper to only be as big as the button element is
            navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
              style: {
                bottom: '-15px',
                top: 'unset'
              }
            }} 
            indicatorContainerProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
              style: {
                paddingBottom: '20px',
                paddingTop: '20px'
              }
            }} 
            navButtonsAlwaysVisible={true}
        >
            {emailTemplates.map((emailTemplate, i) => (
              <EmailTemplateItem
                key={emailTemplate.id}
                emailTemplate={emailTemplate}
              />
            ))}
          </Carousel>
        </div>
      </CardContent>
    </Card>
  );
};

EmailTemplates.propTypes = {
  className: PropTypes.string
};

export default EmailTemplates;
