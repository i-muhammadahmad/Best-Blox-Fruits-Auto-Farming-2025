import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("action", {
    dataType: ColumnDataType.Count,
    label: "Action",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("table_name", {
    dataType: ColumnDataType.String,
    label: "Table Name",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("record_id_accessed", {
    dataType: ColumnDataType.String,
    label: "Record Accessed",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("viewed_url", {
    dataType: ColumnDataType.String,
    label: "Viewed Visted",
    sortable: true,
    filterable: true,
    searchable: true,
  }),
  createColumn("performed_at", {
    dataType: ColumnDataType.DateTime,
    sortable: true,
    filterable: true,
    searchable: true,
    label: "Performed At",
    sortDirection: ColumnSortDirection.Descending,
    sortOrder: 1,
  })
];
export default Columns;
