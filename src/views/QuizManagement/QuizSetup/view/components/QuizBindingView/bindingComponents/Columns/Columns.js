import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("binded_with", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Binded With",
  }),
  createColumn("assign_to", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Assigned To",
  }),
  createColumn("assigned_from", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Assigned Date",
  }),
  createColumn("due_date", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Due Date",
  }),
  createColumn("description_html", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Description",
  }),
  createColumn("date_last_modified", {
    dataType: ColumnDataType.DateTime,
    filterable: true,
    sortable: true,
    label: "Last Modified At",
    sortDirection: ColumnSortDirection.Descending,
    sortOrder: 1,
  }),
  createColumn("updated_by_user_name", {
    dataType: ColumnDataType.String,
    filterable: true,
    sortable: true,
    label: "Modified By",
  }),
  createColumn("Actions"),
];
export default Columns;
