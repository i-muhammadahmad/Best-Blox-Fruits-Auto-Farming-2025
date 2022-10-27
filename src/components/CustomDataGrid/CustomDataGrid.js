import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ToolbarOptions } from "tubular-react";
import { CustomDataGridComponent } from './components';

const useStyles = makeStyles(() => ({

}));

const CustomDataGrid = props => {
  const { columns, dataSource, gridName, toolbarOptions, ...rest } = props;
  const classes = useStyles();

  const cusToolbarOptions = new ToolbarOptions({
    itemsPerPage: 20,
  });

  return (
    <CustomDataGridComponent
      columns={columns}
      dataSource={dataSource}
      gridName={gridName}
      toolbarOptions={cusToolbarOptions}
      {...rest}
    />
  );
};

CustomDataGrid.propTypes = {
  columns: PropTypes.any.isRequired,
  dataSource: PropTypes.any.isRequired,
  gridName: PropTypes.string.isRequired,
  toolbarOptions: PropTypes.any
};

CustomDataGrid.defaultProps = {
  toolbarOptions: void 0,
};

export default CustomDataGrid;
