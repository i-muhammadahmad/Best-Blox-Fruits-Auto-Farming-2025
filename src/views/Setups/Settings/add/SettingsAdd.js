import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header,
  HREmails,
  General,
  ITEmails,
  ITNotifications
} from './components';
import {
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@material-ui/core';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  }
}));

const SettingsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = React.useState(0);

  const TabPanel = (props) => {
    const { children, activeTab, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={activeTab !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {activeTab === index && (
          <div>
            {children}
          </div>
        )}
      </div>
    );
  }

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Page
      className={classes.root}
      title="Add Settings"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardContent>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="Settings Tabs" className={classes.tabPanelStyle}>
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="HR Emails" {...a11yProps(1)} />
            <Tab label="IT Emails" {...a11yProps(2)} />
            <Tab label="IT Help Desk Notifications" {...a11yProps(3)} />
          </Tabs>
          <TabPanel activeTab={activeTab} index={0}>
            <General activeTab={activeTab} />
          </TabPanel>
          <TabPanel activeTab={activeTab} index={1}>
            <HREmails activeTab={activeTab} />
          </TabPanel>
          <TabPanel activeTab={activeTab} index={2}>
            <ITEmails activeTab={activeTab} />
          </TabPanel>
          <TabPanel activeTab={activeTab} index={3}>
            <ITNotifications activeTab={activeTab} />
          </TabPanel>
        </CardContent>
      </Card>

    </Page>
  );
};

export default SettingsAdd;
