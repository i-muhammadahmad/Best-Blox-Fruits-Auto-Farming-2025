import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("mis_client_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "MIS Client Name",
  }),
  createColumn("ftp_server", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "FTP Server",
  }),
  createColumn("ftp_port", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "FTP Port",
  }),
  createColumn("ftp_username", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "FTP Username",
  }),
  createColumn("is_dialing_client", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Dailing Client",
  }),
  createColumn("folder_url", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Folder Url",
  }),
  createColumn("limit_file_size", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Limit File Size",
  }),
  createColumn("transcript_min_size_limit", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Min Size Limit",
  }),
  createColumn("transcript_max_size_limit", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Max Size Limit",
  }),
  createColumn("transcript_percentage", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Percentage",
  }),
  createColumn("is_enabled", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Is Enabled",
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
