import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  LinearProgress,
  Paper,
  Table,
  TableHead,
  TableRow
} from '@material-ui/core';
import { Paginator, ToolbarOptions, MobileDataGridTable, DataGridTable } from "tubular-react";
import { useTbTable } from 'tubular-react-common';
import { CompareOperators } from 'tubular-common';
//import ChipBar from 'tubular-react/dist/Filtering/ChipBar';
//import useTbSelection from 'tubular-react/dist/hooks/useTbSelection';
//import SelectionToolbar from 'tubular-react/dist/Toolbar/SelectionToolbar';
import { useResolutionSwitch } from 'uno-react';
import CustomGridToolbar from '../CustomGridToolbar';
var useTbSelection_1 = require("tubular-react/dist/hooks/useTbSelection");
var ChipBar_1 = require("tubular-react/dist/Filtering/ChipBar");
var SelectionToolbar_1 = require("tubular-react/dist/Toolbar/SelectionToolbar");


const useStyles = makeStyles(theme => ({
  linearProgress: {
    marginTop: '-10px',
    height: '20px',
  },
  root: {
    overflowX: 'auto',
    width: '100%',
  },
}));

const CustomDataGridComponent = props => {
  const {
    columns,
    dataSource,
    deps,
    footerComponent,
    gridName,
    onError,
    onRowClick,
    rowComponent,
    rowMobileComponent,
    storage,
    detailComponent,
    rowSelectionEnabled,
    ...rest
  } = props;

  const timeout = 400;
  const toolbarOptions = (rest.toolbarOptions === void 0) ? rest.toolbarOptions || new ToolbarOptions() : rest.toolbarOptions;
  const mobileBreakpointWidth = (rest.mobileBreakpointWidth === void 0) ? rest.mobileBreakpointWidth || 800 : rest.mobileBreakpointWidth;

  const classes = useStyles();

  const tbTableInstance = useTbTable(columns, dataSource, {
    callbacks: { onError: onError },
    componentName: gridName,
    deps: deps,
    pagination: {
      itemsPerPage: toolbarOptions.itemsPerPage,
    },
    storage: storage,
  });

  const isMobileResolution = useResolutionSwitch(mobileBreakpointWidth, timeout)[0];
  const selection = useTbSelection_1.useTbSelection(tbTableInstance, rowSelectionEnabled);
  const showSelectionToolbar = rowSelectionEnabled && selection.getSelectedCount() > 0;

  const applyOrResetFilter = (columnName, value) => {
    var newColumns = tbTableInstance.state.columns.map((column) => {
      if (column.name === columnName) {
        return __assign(__assign({}, column), { filterText: value, filterOperator: !!value ? CompareOperators.Equals : CompareOperators.None, filterArgument: !!value ? [] : null });
      }
      return column;
    });
    tbTableInstance.api.setColumns(newColumns);
  };

  var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };

  if (isMobileResolution) {
    toolbarOptions.SetMobileMode();
    return (
      <Paper className={classes.root}>
        {(!showSelectionToolbar) ?
          <CustomGridToolbar
            toolbarOptions={toolbarOptions}
            tbTableInstance={tbTableInstance}
            gridName={gridName}
          />
          : ''}
        {(showSelectionToolbar) ?
          <SelectionToolbar_1.SelectionToolbar
            selection={selection}
          />
          : ''}
        <div
          className={classes.linearProgress}
          data-testid="linear-progress"
        >
          {(tbTableInstance.state.isLoading) ?
            <LinearProgress />
            : ''}
        </div>
        <MobileDataGridTable
          tbTableInstance={tbTableInstance}
          onRowClick={onRowClick}
          rowComponent={rowMobileComponent}
        />
        <Paginator
          advancePagination={toolbarOptions.advancePagination}
          rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
          tbTableInstance={tbTableInstance}
        />
      </Paper>
    );
  }

  return (
    <Paper className={classes.root} >
      {(!showSelectionToolbar) ?
        <CustomGridToolbar
          toolbarOptions={toolbarOptions}
          tbTableInstance={tbTableInstance}
          gridName={gridName}
        />
        : ''}
      {(showSelectionToolbar) ?
        <SelectionToolbar_1.SelectionToolbar
          selection={selection}
          actionsArea={toolbarOptions.actionsArea}
        />
        : ''}
      <div
        className={classes.linearProgress}
        data-testid="linear-progress"
      >
        {(tbTableInstance.state.isLoading) ?
          <LinearProgress />
          : ''}
      </div>
      <ChipBar_1.ChipBar
        columns={tbTableInstance.state.columns}
        onClearFilter={applyOrResetFilter}
      />
      <DataGridTable
        tbTableInstance={tbTableInstance}
        rowComponent={rowComponent}
        footerComponent={footerComponent}
        detailComponent={detailComponent || null}
        onRowClick={onRowClick}
        rowSelectionEnabled={rowSelectionEnabled}
        selection={selection}
      />
      {(toolbarOptions.enablePagination) ?
        <Table data-testid={"paginator"} >
          <TableHead>
            <TableRow>
              <Paginator
                advancePagination={toolbarOptions.advancePagination}
                rowsPerPageOptions={toolbarOptions.rowsPerPageOptions}
                tbTableInstance={tbTableInstance}
              />
            </TableRow>
          </TableHead>
        </Table>
        : ''}
    </Paper>
  );
};

export default CustomDataGridComponent;
