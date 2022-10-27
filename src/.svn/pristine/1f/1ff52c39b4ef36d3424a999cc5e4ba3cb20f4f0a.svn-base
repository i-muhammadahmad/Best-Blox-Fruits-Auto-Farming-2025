import {
  ColumnDataType,
  ColumnSortDirection,
  createColumn
} from "tubular-common";

const Columns = [
  createColumn("shift_name", {
    dataType: ColumnDataType.String,
    sortable: true,
    filterable: true,
    label: "Shift Name",
  }),
  createColumn("effective_from_date", {
    dataType: ColumnDataType.DateTime,
    sortable: true,
    filterable: true,
    label: "Effective From",
  }),
  createColumn("effective_to_date", {
    dataType: ColumnDataType.DateTime,
    sortable: true,
    filterable: true,
    label: "Effective To",
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
