import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Page } from 'components';
import {
  Header,
  AssetsUpdateForm,
  AssetsBinding,
  AssetsDiscard,
  UnreturnedAssets,
  AssetAttachment
} from './components';
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent
} from '@material-ui/core';

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
  tabPanelStyle: {
    borderBottom: '1px solid #e8e8e8',
  }
}));

const AssetsUpdate = () => {
  const classes = useStyles();
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
      title="Update Assets"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardContent>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="Assets Tabs" className={classes.tabPanelStyle}>
            <Tab label="Update Assets" {...a11yProps(0)} />
            <Tab label="Allocate Asset" {...a11yProps(1)} />
            <Tab label="Attachments" {...a11yProps(2)} />
            <Tab label="Discard Asset" {...a11yProps(3)} />
            <Tab label="Mark Asset Unreturned " {...a11yProps(4)} />
          </Tabs>
          <TabPanel activeTab={activeTab} index={0}>
            <AssetsUpdateForm
              activeTab={activeTab}
            />
          </TabPanel>
          <TabPanel activeTab={activeTab} index={1}>
            <AssetsBinding
              activeTab={activeTab}
            />
          </TabPanel>
          <TabPanel activeTab={activeTab} index={2}>
            <AssetAttachment
              activeTab={activeTab}
            />
          </TabPanel>
          <TabPanel activeTab={activeTab} index={3}>
            <AssetsDiscard
              activeTab={activeTab}
            />
          </TabPanel>
          <TabPanel activeTab={activeTab} index={4}>
            <UnreturnedAssets
              activeTab={activeTab}
            />
          </TabPanel>
        </CardContent>
      </Card>
    </Page>
  );
};

export default AssetsUpdate;
