import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("title", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Meeting Title",
  }),
  createColumn("meeting_type", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Meeting Type",
  }),
  createColumn("meeting_date", {
    dataType: ColumnDataType.DateTime,
    sortable: true,
    filterable: true,
    label: "Meeting Date",
  }),
  createColumn("meeting_time", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Meeting Time",
  }),
  createColumn("notes_html", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Notes",
  }),
  createColumn("date_last_modified", {
    dataType: ColumnDataType.DateTime,
    filterable: true,
    sortable: true,
    label: "Last Modified At",
    sortDirection: ColumnSortDirection.Descending,
    sortOrder: 1,
  }),
  createColumn("Actions"),
];
export default Columns;
