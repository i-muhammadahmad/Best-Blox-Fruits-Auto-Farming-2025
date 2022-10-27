import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("invoice_no", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Invoice No",
  }),
  createColumn("invoice_date", {
    dataType: ColumnDataType.DateTime,
    sortable: true,
    filterable: true,
    label: "Invoice Date",
  }),
  createColumn("invoice_status", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Status",
  }),
  createColumn("invoice_period_start", {
    dataType: ColumnDataType.DateTime,
    sortable: true,
    filterable: true,
    label: "Period Start",
  }),
  createColumn("invoice_period_end", {
    dataType: ColumnDataType.DateTime,
    sortable: true,
    filterable: true,
    label: "Period End",
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
  createColumn("Actions"),
];
export default Columns;
