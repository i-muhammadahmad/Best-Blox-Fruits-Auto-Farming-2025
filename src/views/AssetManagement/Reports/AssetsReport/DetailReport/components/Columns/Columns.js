import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("asset_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Name",
  }),
  createColumn("asset_type_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Asset Type",
  }),
  createColumn("client_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Client Name",
  }),
  createColumn("binder_with", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Binded With",
  }),
  createColumn("allocated_to", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Allocated To",
  }),
  createColumn("asset_assigned_from", {
    dataType: ColumnDataType.Date,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Assigned From",
  }),
  createColumn("asset_assigned_to", {
    dataType: ColumnDataType.Date,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Assigned To",
  }),
  createColumn("assets_status", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Status",
  }),
  createColumn("date_last_modified", {
    dataType: ColumnDataType.DateTime,
    filterable: true,
    sortable: true,
    searchable: true,
    label: "Last Modified At",
    sortDirection: ColumnSortDirection.Descending,
    sortOrder: 1,
  }),
  createColumn("Actions"),
];
export default Columns;
