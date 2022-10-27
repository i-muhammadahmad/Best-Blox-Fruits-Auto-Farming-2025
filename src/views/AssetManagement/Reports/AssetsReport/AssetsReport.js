import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Page } from 'components';
import {
  Header,
  DetailView
} from './DetailReport/components';
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent
} from '@material-ui/core';
import AssetsReportList from './DetailReport';
import SummaryReport from './SummaryReport';
import DetailReportByEmployee from './DetailReportByEmployee';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  extraFeilds: {
    marginTop: theme.spacing(3)
  },
  projectDetails: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(0),
  },
  cardContent: {
    paddingTop: theme.spacing(1),
  },
  tabPanelStyle: {
    borderBottom: '1px solid #e8e8e8',
  }
}));


const AssetsReport = () => {
  const classes = useStyles();
  
  const [displayView, setDisplayView] = useState(false);

  //tabs logic
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
      title="Assets Report"
    >
      <Header 
        displayView={displayView}
        setDisplayView={setDisplayView}
      />
      {(displayView === true)?
        <DetailView />
        :
        <Card
          className={classes.projectDetails}
        >
          <CardContent  className={classes.cardContent}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="Assets Report Tabs" className={classes.tabPanelStyle}>
              <Tab label="Summary Report" {...a11yProps(0)} />
              <Tab label="Detailed Report By Assets" {...a11yProps(1)} />
              <Tab label="Detailed Report By Employees" {...a11yProps(1)} />
            </Tabs>
            <TabPanel activeTab={activeTab} index={0}>
              <SummaryReport 
                displayView={displayView}
                setDisplayView={setDisplayView}
              />
            </TabPanel>
            <TabPanel activeTab={activeTab} index={1}>
              <AssetsReportList
                displayView={displayView}
                setDisplayView={setDisplayView}
              />
            </TabPanel> 
            <TabPanel activeTab={activeTab} index={2}>
              <DetailReportByEmployee
                displayView={displayView}
                setDisplayView={setDisplayView}
              />
            </TabPanel> 
          </CardContent>
        </Card>   
      }
    </Page>
  );
};

export default AssetsReport;
