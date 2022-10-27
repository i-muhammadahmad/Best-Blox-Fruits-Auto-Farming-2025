import {
  AggregateFunctions,
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("client_image_icon",{
    dataType: ColumnDataType.String,
    sortable: false,
    filterable: false,
    searchable: false,
    label: "Logo",
  }),
  createColumn("client_name", {
    dataType: ColumnDataType.String,
    label: "Name",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("client_manager_name", {
    dataType: ColumnDataType.String,
    label: "Manager",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("camp_offices", {
    dataType: ColumnDataType.String,
    label: "Offices",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("company_name", {
    dataType: ColumnDataType.Count,
    label: "Company",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("invoices_per_month", {
    dataType: ColumnDataType.Count,
    label: "Invoices Per Month",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("start_date", {
    dataType: ColumnDataType.DateTime,
    filterable: true,
    sortable: true,
    searchable: true,
    label: "Start Date",
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
