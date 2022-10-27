import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("user_name", {
    dataType: ColumnDataType.Count,
    label: "User",
    sortable: true,
    filterable: true,
  }),
  createColumn("image_name", {
    dataType: ColumnDataType.String,
    label: "Image",
    sortable: true,
    filterable: true,
  }),
  createColumn("date_created", {
    dataType: ColumnDataType.DateTime,
    filterable: true,
    sortable: true,
    label: "Date Created",
    sortDirection: ColumnSortDirection.Descending,
    sortOrder: 1,
  }),
  createColumn("Actions", {
    label: "Actions",
    sortable: false,
    filterable: false,
  }),
];
export default Columns;
