import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("category_name", {
    dataType: ColumnDataType.String,
    label: "Category",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("activity_name", {
    dataType: ColumnDataType.String,
    label: "Activity",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("name", {
    dataType: ColumnDataType.String,
    label: "Log Name",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("activity_units_logged", {
    dataType: ColumnDataType.Numeric,
    label: "Units Processed",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("production", {
    dataType: ColumnDataType.String,
    label: "Production Time",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("deleted_status", {
    dataType: ColumnDataType.String,
    label: "Staus",
    sortable: true,
    filterable: true,
    searchable: true,
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
