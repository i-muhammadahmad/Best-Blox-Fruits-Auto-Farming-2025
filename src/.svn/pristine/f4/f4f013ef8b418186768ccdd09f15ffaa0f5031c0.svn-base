import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Toolbar,
  IconButton,
  Tooltip
} from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { useResolutionSwitch, useToggle } from 'uno-react';
//import { SearchTextInput } from "tubular-react";
//import ExportButton from "tubular-react/dist/Toolbar/ExportButton";
//import FeaturesDrawer from "tubular-react/dist/DataGrid/FeaturesDrawer";
import { columnHasFilter, CompareOperators } from 'tubular-common';
import CustomSearchBar from '../CustomSearchBar';
var ExportButton_1 = require("tubular-react/dist/Toolbar/ExportButton");
var FeaturesDrawer_1 = require("tubular-react/dist/DataGrid/FeaturesDrawer");

const useStyles = makeStyles(theme => ({
  mobileSpacer: { flexShrink: 1 },
  spacer: { flex: '1 0' }
}));

const CustomGridToolbar = props => {
  const {
    toolbarOptions,
    gridName,
    tbTableInstance,
    timeout,
    ...rest
  } = props;

  const classes = useStyles();
  const outerWidth = 800;
  const isMobileResolution = useResolutionSwitch(outerWidth, timeout)[0];

  const applyFilters = (columns) => {
    columns.forEach((fColumn) => {
      var column = columns.find(function (c) { return c.name === fColumn.name; });
      if (columnHasFilter(fColumn)) {
        column.filterText = fColumn.filterText;
        column.filterOperator = fColumn.filterOperator;
        column.filterArgument = fColumn.filterArgument;
        if (column.filterOperator === CompareOperators.Between &&
          (!column.filterArgument || !column.filterArgument[0])) {
          column.filterOperator = CompareOperators.Gte;
          column.filterArgument = null;
        }
      }
      else {
        column.filterText = null;
        column.filterOperator = CompareOperators.None;
        column.filterArgument = null;
      }
    });
    return columns;
  };

  const onApplyFeatures = (columns) => {
    let newColumns = applyFilters(columns);
    tbTableInstance.api.setColumns(newColumns);
  };
  const [isPanelOpen, togglePanel] = useToggle(false);
  const enableFeaturesDrawer = tbTableInstance.state.columns.find((c) => { return c.filterable; });

  return (
    <>
      <Toolbar data-testid="grid-toolbar" >
        {(toolbarOptions.title) ?
          <h2>{toolbarOptions.title}</h2> : ''
        }
        <div className={isMobileResolution ? classes.mobileSpacer : classes.spacer} />
        {toolbarOptions.customItems}
        {(toolbarOptions.exportButton) ?
          <ExportButton_1.ExportButton
            type="csv"
            gridName={gridName}
            exportTo={tbTableInstance.api.exportTo}
            filteredRecordCount={tbTableInstance.state.filteredRecordCount}
            data-testid="export-button-csv"
          />
          : ''
        }
        {(toolbarOptions.printButton) ?
          <ExportButton_1.ExportButton
            type="print"
            gridName={gridName}
            exportTo={tbTableInstance.api.exportTo}
            filteredRecordCount={tbTableInstance.state.filteredRecordCount}
            data-testid="export-button-print"
          />
          : ''
        }
        {(toolbarOptions.searchText) ?
          <CustomSearchBar
            searchText={tbTableInstance.state.searchText}
            updateSearchText={tbTableInstance.api.updateSearchText}
            data-testid="search-text-input"
          />
          : ''
        }
        <Tooltip title="Grid features">
          <IconButton aria-label="Grid features" onClick={togglePanel} >
            <TuneIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      {(enableFeaturesDrawer && isPanelOpen) ?
        <FeaturesDrawer_1.FeaturesDrawer
          togglePanel={togglePanel}
          columns={tbTableInstance.state.columns}
          onApplyFeatures={onApplyFeatures}
        />
        : ''
      }
    </>
  );
};

export default CustomGridToolbar;
