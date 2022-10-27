import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("reference", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Reference",
  }),
  createColumn("category", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Category",
  }),
  createColumn("setup_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Audit Form",
  }),
  createColumn("client_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Client",
  }),
  createColumn("employee_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Employee",
  }),
  createColumn("date_processed", {
    dataType: ColumnDataType.DateTime,
    filterable: true,
    sortable: true,
    searchable: true,
    label: "Date Processed",
  }),
  createColumn("obtained_score", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Score",
  }),
  createColumn("audit_result", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Status",
  }),
  createColumn("deleted_status", {
    dataType: ColumnDataType.String,
    label: "Status",
    sortable: false,
    filterable: false,
    searchable: false,
  }),
  createColumn("description_html", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Description",
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
