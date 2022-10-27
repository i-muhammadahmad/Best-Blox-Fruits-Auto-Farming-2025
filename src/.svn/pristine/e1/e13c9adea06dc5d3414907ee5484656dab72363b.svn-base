import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("image_icon", {
    dataType: ColumnDataType.String,
    sortable: false,
    filterable: false,
    searchable: false,
    label: "Image",
  }),
  createColumn("name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Name",
  }),
  createColumn("location", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Office",
  }),
  createColumn("deleted_status", {
    dataType: ColumnDataType.String,
    label: "Status",
    sortable: false,
    filterable: false,
    searchable: false,
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
