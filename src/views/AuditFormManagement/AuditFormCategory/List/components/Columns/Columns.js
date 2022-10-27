import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("parent_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Parent",
  }),
  createColumn("category_name", {
    dataType: ColumnDataType.Count,
    label: "Name",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("audit_form_setup_name", {
    dataType: ColumnDataType.Count,
    label: "Audit Form Setup",
    sortable: true,
    filterable: true,
    searchable: true,
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
